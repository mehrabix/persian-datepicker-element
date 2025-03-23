(function webpackUniversalModuleDefinition(root, factory) {

      if(typeof exports === 'object' && typeof module === 'object') {
          module.exports = factory();
      }else if(typeof define === 'function' && define.amd) {
          
          define([], factory);

          } else if(typeof exports === 'object'){

          
      exports["PersianDatePickerElement"] = factory();

      } else {

          
      root["PersianDatePickerElement"] = factory();
      }

      })(this, () => {
          return (() => { // webpackBootstrap
"use strict";
// The require scope
var __webpack_require__ = {};

/************************************************************************/
// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = (exports, definition) => {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();
/************************************************************************/
var __webpack_exports__ = {};

/*!**********************************!*\
  !*** ./src/index.ts + 5 modules ***!
  \**********************************/

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ src)
});

// UNUSED EXPORTS: PersianDatePickerElement, PersianDate

;// CONCATENATED MODULE: ./src/persian-date.ts
/**
 * Jalali (Shamsi) Calendar utilities
 */
const PersianDate = {
    g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
    jalaliToGregorian: function (j_y, j_m, j_d) {
        j_y = parseInt(j_y.toString());
        j_m = parseInt(j_m.toString());
        j_d = parseInt(j_d.toString());
        const jy = j_y - 979;
        const jm = j_m - 1;
        const jd = j_d - 1;
        let j_day_no = 365 * jy + Math.floor(jy / 33) * 8 + Math.floor((jy % 33 + 3) / 4);
        for (let i = 0; i < jm; ++i)
            j_day_no += this.j_days_in_month[i];
        j_day_no += jd;
        let g_day_no = j_day_no + 79;
        let gy = 1600 + 400 * Math.floor(g_day_no / 146097);
        g_day_no = g_day_no % 146097;
        let leap = true;
        if (g_day_no >= 36525) {
            g_day_no--;
            gy += 100 * Math.floor(g_day_no / 36524);
            g_day_no = g_day_no % 36524;
            if (g_day_no >= 365)
                g_day_no++;
            else
                leap = false;
        }
        gy += 4 * Math.floor(g_day_no / 1461);
        g_day_no %= 1461;
        if (g_day_no >= 366) {
            leap = false;
            g_day_no--;
            gy += Math.floor(g_day_no / 365);
            g_day_no = g_day_no % 365;
        }
        let i = 0;
        for (; g_day_no >= this.g_days_in_month[i] + (i === 1 && leap ? 1 : 0); i++) {
            g_day_no -= this.g_days_in_month[i] + (i === 1 && leap ? 1 : 0);
        }
        const gm = i + 1;
        const gd = g_day_no + 1;
        return [gy, gm, gd];
    },
    gregorianToJalali: function (g_y, g_m, g_d) {
        g_y = parseInt(g_y.toString());
        g_m = parseInt(g_m.toString());
        g_d = parseInt(g_d.toString());
        const gy = g_y - 1600;
        const gm = g_m - 1;
        const gd = g_d - 1;
        let g_day_no = 365 * gy + Math.floor((gy + 3) / 4) - Math.floor((gy + 99) / 100) + Math.floor((gy + 399) / 400);
        for (let i = 0; i < gm; ++i)
            g_day_no += this.g_days_in_month[i];
        if (gm > 1 && ((gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0)))
            g_day_no++;
        g_day_no += gd;
        let j_day_no = g_day_no - 79;
        const j_np = Math.floor(j_day_no / 12053);
        j_day_no = j_day_no % 12053;
        let jy = 979 + 33 * j_np + 4 * Math.floor(j_day_no / 1461);
        j_day_no %= 1461;
        if (j_day_no >= 366) {
            jy += Math.floor((j_day_no - 1) / 365);
            j_day_no = (j_day_no - 1) % 365;
        }
        let i = 0;
        for (; i < 11 && j_day_no >= this.j_days_in_month[i]; ++i) {
            j_day_no -= this.j_days_in_month[i];
        }
        const jm = i + 1;
        const jd = j_day_no + 1;
        return [jy, jm, jd];
    },
    isLeapJalaliYear: function (year) {
        const breaks = [1, 5, 9, 13, 17, 22, 26, 30];
        return breaks.includes(year % 33);
    },
    getDaysInMonth: function (year, month) {
        if (month < 1 || month > 12)
            return 0;
        if (month <= 6)
            return 31;
        if (month <= 11)
            return 30;
        // Month 12 (Esfand)
        return this.isLeapJalaliYear(year) ? 30 : 29;
    },
    getMonthName: function (month) {
        const monthNames = [
            "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
            "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
        ];
        return monthNames[month - 1];
    },
    getDayOfWeek: function (jYear, jMonth, jDay) {
        const gdate = this.jalaliToGregorian(jYear, jMonth, jDay);
        const date = new Date(gdate[0], gdate[1] - 1, gdate[2]);
        return date.getDay();
    },
    /**
     * Returns the number of days in a Jalali year
     */
    getDaysInYear: function (year) {
        return this.isLeapJalaliYear(year) ? 366 : 365;
    },
    /**
     * Validates a Jalali date
     */
    isValidDate: function (year, month, day) {
        if (year < 0 || month < 1 || month > 12 || day < 1)
            return false;
        return day <= this.getDaysInMonth(year, month);
    }
};

;// CONCATENATED MODULE: ./src/data/persian-calendar-repo/PersianCalendar/data/events.json
var events_namespaceObject = JSON.parse('{"Source":{"Afghanistan":"https://w.mudl.gov.af/sites/default/files/2020-03/Calendar%202020%20Website.pdf","Iran":"https://calendar.ut.ac.ir/documents/2139738/7092644/Calendar-1404.pdf","AncientIran":"~https://raw.githubusercontent.com/ilius/starcal/master/plugins/iran-ancient-data.txt","International":"~https://www.un.org/en/sections/observances/international-days/","Nepal":""},"#meta":["https://github.com/persian-calendar","فهرست مناسبت‌های ایران و افغانستان که در پروژهٔ تقویم فارسی، توسط توسعه‌دهندگان آن و به کمک منابع زیر","تهیه و نگه‌داری می‌شود. با توجه به زحمتی که برای گردآوردی آن کشیده شده است","پیشنهاد می‌شود آن را فقط در پروژه‌های متن‌باز و یا با ارجاع مناسب به منبع استفادهٔ مجدد کنید","و اگر اشکالی در یکی از مناسبت‌ها، عنوان یا تاریخ یا عدم وجود مناسبتی دیدید سریعاً پروژه را مطلع کنید، با تشکر","توجه:","به مناسبت‌هایی که در انتهای صفحه قرار دارند و الگوی تکرارشان متفاوت است توجه ویژه کنید","این داده‌ها از منابع رسمی زیر گردآوری شده‌اند، خود این گردآوردی رسمی و دارای تضمین بی‌نقص بودن نیست ولی محتویات آن به منابع زیر بر می‌گردد","https://w.mudl.gov.af/sites/default/files/2020-03/Calendar%202020%20Website.pdf","افغانستان","https://calendar.ut.ac.ir/documents/2139738/7092644/Calendar-1404.pdf","مرکز تقویم دانشگاه تهران","https://github.com/ilius/starcal/tree/main/plugins","مطابق با استخراج و تنظیم شورای مرکز تقویم مؤسسهٔ ژئوفیزیک دانشگاه تهران (مناسبت‌ها از شورای فرهنگ عمومی)","گردآوری، فرمت‌بندی و به روزآوری: سعید رسولی <saeed.gnu@gmail.com>، مولا پهنادایان <mola.mp@gmail.com>","https://raw.githubusercontent.com/ilius/starcal/master/plugins/iran-ancient-data.txt","جشن‌های باستانی ایران","Ardalan Razavi","رضا مرادی غیاث‌آبادی (www.ghiasabadi.com)","سعید رسولی <saeed.gnu@gmail.com>","https://www.un.org/en/sections/observances/international-days/"],"Persian Calendar":[{"holiday":true,"month":1,"day":1,"type":"Afghanistan","title":"جشن نوروز"},{"holiday":true,"month":1,"day":2,"type":"Afghanistan","title":"جشن دهقان"},{"holiday":false,"month":1,"day":3,"type":"Afghanistan","title":"روز زنگ مکتب"},{"holiday":false,"month":2,"day":5,"type":"Afghanistan","title":"روز مطبوعات"},{"holiday":false,"month":2,"day":7,"type":"Afghanistan","title":"کودتای حزب دموکراتیک خلق افغانستان (سال ۱۳۵۷)"},{"holiday":true,"month":2,"day":8,"type":"Afghanistan","title":"پیروزی جهاد مقدس افغانستان (سال ۱۳۷۱)"},{"holiday":false,"month":3,"day":24,"type":"Afghanistan","title":"روز مادر"},{"holiday":true,"month":5,"day":28,"type":"Afghanistan","title":"روز استرداد استقلال کشور (سال ۱۲۹۸ مصادف با ۱۹۱۹ میلادی)"},{"holiday":false,"month":6,"day":9,"type":"Afghanistan","title":"روز همبستگی با برادران پشتون و بلوچ"},{"holiday":true,"month":6,"day":18,"type":"Afghanistan","title":"روز شهادت قهرمان ملی افغانستان (آغاز هفتهٔ شهید)"},{"holiday":false,"month":7,"day":16,"type":"Afghanistan","title":"روز هنر"},{"holiday":false,"month":7,"day":21,"type":"Afghanistan","title":"روز جیودیزیست‌های کشور"},{"holiday":false,"month":7,"day":24,"type":"Afghanistan","title":"آغاز هفتهٔ مخصوص سره میاشت"},{"holiday":false,"month":7,"day":29,"type":"Afghanistan","title":"روز ملی زبان اوزبیکی"},{"holiday":false,"month":8,"day":15,"type":"Afghanistan","title":"روز وحدت ملی و شهادت شش عضو ولسی جرگه شورای ملی در بغلان (سال ۱۳۸۶)"},{"holiday":false,"month":9,"day":13,"type":"Afghanistan","title":"روز تحقیق و پژوهش"},{"holiday":false,"month":10,"day":6,"type":"Afghanistan","title":"روز تجاوز ارتش اتحاد شوروی سابق بر حریم کشور (سال ۱۳۵۸)"},{"holiday":false,"month":10,"day":14,"type":"Afghanistan","title":"هفتهٔ قانون اساسی افغانستان (۱۴-۲۰ جدی)"},{"holiday":false,"month":11,"day":10,"type":"Afghanistan","title":"روز متعاقدین"},{"holiday":true,"month":11,"day":26,"type":"Afghanistan","title":"روز شکست و خروج ارتش اتحاد شوروی سابق از افغانستان"},{"holiday":false,"month":12,"day":3,"type":"Afghanistan","title":"روز تکبیر و قیام مردم کابل در برابر تجاوز ارتش اتحاد شوروی سابق"},{"holiday":false,"month":12,"day":9,"type":"Afghanistan","title":"روز ملی حمایت از نیروهای دفاعی و امنیتی کشور"},{"holiday":false,"month":12,"day":20,"type":"Afghanistan","title":"روز حفاظت از میراث‌های فرهنگی کشور"},{"holiday":false,"month":12,"day":22,"type":"Afghanistan","title":"روز شهید وحدت ملی استاد عبدالعلی مزاری (۱۳۷۳)"},{"holiday":false,"month":12,"day":24,"type":"Afghanistan","title":"روز قیام مردم هرات بر علیه جمهوری دموکراتیک خلق افغانستان"},{"holiday":false,"month":12,"day":27,"type":"Afghanistan","title":"روز ملی خبرنگار"},{"holiday":true,"month":1,"day":1,"type":"Iran","title":"آغاز نوروز"},{"holiday":true,"month":1,"day":2,"type":"Iran","title":"عید نوروز"},{"holiday":false,"month":1,"day":2,"type":"Iran","title":"هجوم مأموران ستم‌شاهی پهلوی به مدرسهٔ فیضیهٔ قم (۱۳۴۲ ه‍.ش)"},{"holiday":false,"month":1,"day":2,"type":"Iran","title":"آغاز عملیات فتح‌المبین (۱۳۶۱ ه‍.ش)"},{"holiday":true,"month":1,"day":3,"type":"Iran","title":"عید نوروز"},{"holiday":true,"month":1,"day":4,"type":"Iran","title":"عید نوروز"},{"holiday":false,"month":1,"day":6,"type":"Iran","title":"زادروز زرتشت پیامبر"},{"holiday":false,"month":1,"day":7,"type":"Iran","title":"روز هنرهای نمایشی"},{"holiday":true,"month":1,"day":12,"type":"Iran","title":"روز جمهوری اسلامی ایران"},{"holiday":true,"month":1,"day":13,"type":"Iran","title":"روز طبیعت"},{"holiday":false,"month":1,"day":15,"type":"Iran","title":"روز ذخایر ژنتیکی و زیستی"},{"holiday":false,"month":1,"day":18,"type":"Iran","title":"روز سلامتی"},{"holiday":false,"month":1,"day":19,"type":"Iran","title":"شهادت آیت‌اللّه سیدمحمدباقر صدر و خواهر ایشان بنت‌الهدی به دست حکومت بعث عراق (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":1,"day":20,"type":"Iran","title":"روز ملی فناوری هسته‌ای"},{"holiday":false,"month":1,"day":20,"type":"Iran","title":"شهادت سید مرتضی آوینی"},{"holiday":false,"month":1,"day":20,"type":"Iran","title":"روز هنر انقلاب اسلامی"},{"holiday":false,"month":1,"day":21,"type":"Iran","title":"شهادت امیر سپهبد علی صیاد شیرازی (۱۳۷۸ ه‍.ش)"},{"holiday":false,"month":1,"day":21,"type":"Iran","title":"سالروز افتتاح حساب شمارهٔ ۱۰۰ به فرمان حضرت امام خمینی (ره) و تأسیس بنیاد مسکن انقلاب اسلامی (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":1,"day":25,"type":"Iran","title":"روز بزرگداشت عطار نیشابوری"},{"holiday":false,"month":1,"day":29,"type":"Iran","title":"روز ارتش جمهوری اسلامی و نیروی زمینی"},{"holiday":false,"month":1,"day":31,"type":"Iran","title":"روز گندم و نان"},{"holiday":false,"month":2,"day":1,"type":"Iran","title":"روز بزرگداشت سعدی"},{"holiday":false,"month":2,"day":1,"type":"Iran","title":"روز نثر فارسی"},{"holiday":false,"month":2,"day":1,"type":"Iran","title":"روز شهدای ورزشکار"},{"holiday":false,"month":2,"day":2,"type":"Iran","title":"تأسیس سپاه پاسداران انقلاب اسلامی (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":2,"day":2,"type":"Iran","title":"سالروز اعلام انقلاب فرهنگی (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":2,"day":2,"type":"Iran","title":"روز زمین پاک"},{"holiday":false,"month":2,"day":3,"type":"Iran","title":"روز بزرگداشت شیخ بهایی"},{"holiday":false,"month":2,"day":3,"type":"Iran","title":"روز معماری"},{"holiday":false,"month":2,"day":3,"type":"Iran","title":"سالروز شهادت امیر سپهبد قرنی (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":2,"day":5,"type":"Iran","title":"شکست حملهٔ نظامی آمریکا به ایران در طبس (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":2,"day":7,"type":"Iran","title":"روز ایمنی حمل و نقل"},{"holiday":false,"month":2,"day":9,"type":"Iran","title":"روز شوراها"},{"holiday":false,"month":2,"day":10,"type":"Iran","title":"روز ملی خلیج فارس"},{"holiday":false,"month":2,"day":10,"type":"Iran","title":"آغاز عملیات بیت‌المقدس (۱۳۶۱ ه‍.ش)"},{"holiday":false,"month":2,"day":12,"type":"Iran","title":"شهادت استاد مرتضی مطهری (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":2,"day":12,"type":"Iran","title":"روز معلم"},{"holiday":false,"month":2,"day":15,"type":"Iran","title":"روز بزرگداشت شیخ صدوق"},{"holiday":false,"month":2,"day":18,"type":"Iran","title":"روز بیماری‌های خاص و صعب‌العلاج"},{"holiday":false,"month":2,"day":19,"type":"Iran","title":"روز بزرگداشت شیخ کلینی"},{"holiday":false,"month":2,"day":19,"type":"Iran","title":"روز اسناد ملی و میراث مکتوب"},{"holiday":false,"month":2,"day":20,"type":"Iran","title":"روز گل محمدی و گلاب"},{"holiday":false,"month":2,"day":24,"type":"Iran","title":"لغو امتیاز تنباکو به فتوای آیت‌الله میرزا حسن شیرازی (۱۲۷۰ ه‍.ش)"},{"holiday":false,"month":2,"day":25,"type":"Iran","title":"روز پاسداشت زبان فارسی و بزرگداشت حکیم ابوالقاسم فردوسی"},{"holiday":false,"month":2,"day":27,"type":"Iran","title":"روز ارتباطات و روابط عمومی"},{"holiday":false,"month":2,"day":28,"type":"Iran","title":"روز بزرگداشت حکیم عمر خیام"},{"holiday":false,"month":2,"day":30,"type":"Iran","title":"روز ملی جمعیت"},{"holiday":false,"month":2,"day":31,"type":"Iran","title":"روز اهدای عضو، اهدای زندگی"},{"holiday":false,"month":3,"day":1,"type":"Iran","title":"روز بهره‌وری و بهینه‌سازی مصرف"},{"holiday":false,"month":3,"day":1,"type":"Iran","title":"روز بزرگداشت ملاصدرا (صدرالمتألهین)"},{"holiday":false,"month":3,"day":3,"type":"Iran","title":"فتح خرمشهر در عملیات بیت‌المقدس (۱۳۶۱ ه‍.ش) و روز مقاومت، ایثار و پیروزی"},{"holiday":false,"month":3,"day":4,"type":"Iran","title":"روز مقاومت و پایداری"},{"holiday":false,"month":3,"day":4,"type":"Iran","title":"روز دزفول"},{"holiday":false,"month":3,"day":5,"type":"Iran","title":"روز نسیم مهر (روز حمایت از خانواده زندانیان)"},{"holiday":false,"month":3,"day":7,"type":"Iran","title":"افتتاح اولین دورهٔ مجلس شورای اسلامی (۱۳۵۹ ه‍.ش)"},{"holiday":true,"month":3,"day":14,"type":"Iran","title":"رحلت حضرت امام خمینی (ره) رهبر کبیر انقلاب و بنیان‌گذار جمهوری اسلامی ایران (۱۳۶۸ ه‍.ش)"},{"holiday":false,"month":3,"day":14,"type":"Iran","title":"انتخاب حضرت آیت‌الله امام خامنه‌ای به رهبری (۱۳۶۸ ه‍.ش)"},{"holiday":true,"month":3,"day":15,"type":"Iran","title":"قیام خونین ۱۵ خرداد (۱۳۴۲ ه‍.ش)"},{"holiday":false,"month":3,"day":15,"type":"Iran","title":"زندانی شدن حضرت امام خمینی (ره) به دست مأموران ستم شاهی پهلوی (۱۳۴۲ ه‍.ش)"},{"holiday":false,"month":3,"day":20,"type":"Iran","title":"روز صنایع دستی"},{"holiday":false,"month":3,"day":20,"type":"Iran","title":"روز ملی فرش"},{"holiday":false,"month":3,"day":20,"type":"Iran","title":"شهادت آیت‌الله سعیدی به دست مأموران ستم‌شاهی پهلوی (۱۳۴۹ ه‍.ش)"},{"holiday":false,"month":3,"day":26,"type":"Iran","title":"شهادت سربازان دلیر اسلام: بخارایی، امانی، صفار هرندی و نیک‌نژاد (۱۳۴۴ ه‍.ش)"},{"holiday":false,"month":3,"day":27,"type":"Iran","title":"روز جهاد کشاورزی (تشکیل جهاد سازندگی به فرمان حضرت امام خمینی (ره)) (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":3,"day":29,"type":"Iran","title":"درگذشت دکتر علی شریعتی (۱۳۵۶ ه‍.ش)"},{"holiday":false,"month":3,"day":30,"type":"Iran","title":"شهادت زائران حرم رضوی (ع) به دست ایادی آمریکا (عاشورای ۱۳۷۳ ه‍.ش)"},{"holiday":false,"month":3,"day":31,"type":"Iran","title":"شهادت دکتر مصطفی چمران (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":3,"day":31,"type":"Iran","title":"روز بسیج استادان"},{"holiday":false,"month":4,"day":1,"type":"Iran","title":"سالروز صدور فرمان حضرت امام خمینی رحمة‌الله علیه مبنی بر تأسیس سازمان تبلیغات اسلامی (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":4,"day":1,"type":"Iran","title":"روز تبلیغ و اطلاع‌رسانی دینی"},{"holiday":false,"month":4,"day":1,"type":"Iran","title":"روز اصناف"},{"holiday":false,"month":4,"day":7,"type":"Iran","title":"شهادت مظلومانهٔ آیت‌الله دکتر بهشتی و ۷۲ تن از یاران حضرت امام خمینی (ره) با انفجار بمب به دست منافقان در دفتر مرکزی حزب جمهوری اسلامی (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":4,"day":7,"type":"Iran","title":"روز قوهٔ قضائیه"},{"holiday":false,"month":4,"day":7,"type":"Iran","title":"بمباران شیمیایی شهر سردشت (۱۳۶۶ ه‍.ش)"},{"holiday":false,"month":4,"day":8,"type":"Iran","title":"روز مبارزه با سلاح‌های شیمیایی و میکروبی"},{"holiday":false,"month":4,"day":10,"type":"Iran","title":"روز صنعت و معدن"},{"holiday":false,"month":4,"day":10,"type":"Iran","title":"روز دیپلماسی فرهنگی و تعامل با جهان"},{"holiday":false,"month":4,"day":10,"type":"Iran","title":"روز آزادسازی شهر مهران"},{"holiday":false,"month":4,"day":10,"type":"Iran","title":"روز بزرگداشت صائب تبریزی"},{"holiday":false,"month":4,"day":10,"type":"Iran","title":"یاد روز ورود حضرت امام رضا (ع) به نیشابور و نقل حدیث سلسلةالذهب"},{"holiday":false,"month":4,"day":11,"type":"Iran","title":"شهادت چهارمین شهید محراب، آیت‌الله صدوقی به دست منافقان (۱۳۶۱ ه‍.ش)"},{"holiday":false,"month":4,"day":12,"type":"Iran","title":"حملهٔ ددمنشانهٔ ناوگان آمریکای جنایتکار به هواپیمای مسافربری جمهوری اسلامی ایران (۱۳۶۷ ه‍.ش)"},{"holiday":false,"month":4,"day":12,"type":"Iran","title":"روز افشای حقوق بشر آمریکایی"},{"holiday":false,"month":4,"day":12,"type":"Iran","title":"روز بزرگداشت علامه امینی (۱۳۴۹ ه‍.ش)"},{"holiday":false,"month":4,"day":14,"type":"Iran","title":"روز قلم"},{"holiday":false,"month":4,"day":14,"type":"Iran","title":"روز شهرداری و دهیاری"},{"holiday":false,"month":4,"day":16,"type":"Iran","title":"روز مالیات"},{"holiday":false,"month":4,"day":18,"type":"Iran","title":"روز ادبیات کودکان و نوجوانان"},{"holiday":false,"month":4,"day":18,"type":"Iran","title":"کشف توطئهٔ آمریکایی در پایگاه هوایی شهید نوژه (کودتای نافرجام نقاب) (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":4,"day":21,"type":"Iran","title":"روز عفاف و حجاب"},{"holiday":false,"month":4,"day":21,"type":"Iran","title":"حمله به مسجد گوهرشاد و کشتار مردم به دست رضاخان (۱۳۱۴ ه‍.ش)"},{"holiday":false,"month":4,"day":22,"type":"Iran","title":"روز بزرگداشت خوارزمی"},{"holiday":false,"month":4,"day":22,"type":"Iran","title":"روز فناوری اطلاعات"},{"holiday":false,"month":4,"day":23,"type":"Iran","title":"روز گفت‌وگو و تعامل سازنده با جهان"},{"holiday":false,"month":4,"day":23,"type":"Iran","title":"گشایش نخستین مجلس خبرگان رهبری (۱۳۶۲ ه‍.ش)"},{"holiday":false,"month":4,"day":25,"type":"Iran","title":"روز بهزیستی و تأمین اجتماعی"},{"holiday":false,"month":4,"day":26,"type":"Iran","title":"سالروز تأسیس نهاد شورای نگهبان (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":4,"day":27,"type":"Iran","title":"اعلام پذیرش قطعنامهٔ ۵۹۸ شورای امنیت از سوی ایران (۱۳۶۷ ه‍.ش)"},{"holiday":false,"month":4,"day":30,"type":"Iran","title":"روز بزرگداشت آیت‌الله سید ابوالقاسم کاشانی"},{"holiday":false,"month":5,"day":4,"type":"Iran","title":"روز بزرگداشت شیخ صفی‌الدین اردبیلی"},{"holiday":false,"month":5,"day":5,"type":"Iran","title":"سالروز عملیات افتخار‌آفرین مرصاد (۱۳۶۷ ه‍.ش)"},{"holiday":false,"month":5,"day":5,"type":"Iran","title":"روز اقامهٔ اولین نماز جمعه با حکم حضرت امام خمینی (ره) در سال ۱۳۵۸"},{"holiday":false,"month":5,"day":6,"type":"Iran","title":"روز کارآفرینی و آموزش‌های فنی‌و‌حرفه‌ای"},{"holiday":false,"month":5,"day":8,"type":"Iran","title":"روز شعر و ادبیات آیینی"},{"holiday":false,"month":5,"day":8,"type":"Iran","title":"روز بزرگداشت محتشم کاشانی"},{"holiday":false,"month":5,"day":8,"type":"Iran","title":"روز بزرگداشت شیخ شهاب‌الدین سهروردی (شیخ اشراق)"},{"holiday":false,"month":5,"day":8,"type":"Iran","title":"روز زنجان"},{"holiday":false,"month":5,"day":9,"type":"Iran","title":"روز اهدای خون"},{"holiday":false,"month":5,"day":11,"type":"Iran","title":"شهادت آیت‌الله شیخ فضل‌الله نوری (۱۲۸۸ ه‍.ش)"},{"holiday":false,"month":5,"day":14,"type":"Iran","title":"صدور فرمان مشروطیت (۱۲۸۵ ه‍.ش)"},{"holiday":false,"month":5,"day":14,"type":"Iran","title":"روز حقوق بشر اسلامی و کرامت انسانی"},{"holiday":false,"month":5,"day":15,"type":"Iran","title":"سالروز شهادت امیر سرلشکر خلبان عباس بابایی (۱۳۶۶ ه‍.ش)"},{"holiday":false,"month":5,"day":16,"type":"Iran","title":"تشکیل جهاد دانشگاهی (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":5,"day":17,"type":"Iran","title":"سالروز شهادت محمد صارمی"},{"holiday":false,"month":5,"day":17,"type":"Iran","title":"روز خبرنگار"},{"holiday":false,"month":5,"day":18,"type":"Iran","title":"روز بزرگداشت شهدای مدافع حرم"},{"holiday":false,"month":5,"day":21,"type":"Iran","title":"روز حمایت از صنایع کوچک"},{"holiday":false,"month":5,"day":22,"type":"Iran","title":"روز تشکل‌ها و مشارکت‌های اجتماعی"},{"holiday":false,"month":5,"day":23,"type":"Iran","title":"روز مقاومت اسلامی"},{"holiday":false,"month":5,"day":26,"type":"Iran","title":"آغاز بازگشت آزادگان به میهن اسلامی (۱۳۶۹ ه‍.ش)"},{"holiday":false,"month":5,"day":28,"type":"Iran","title":"کودتای آمریکا برای بازگرداندن شاه (۱۳۳۲ ه‍.ش)"},{"holiday":false,"month":5,"day":28,"type":"Iran","title":"گشایش مجلس خبرگان برای بررسی نهایی قانون اساسی جمهوری اسلامی ایران (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":5,"day":30,"type":"Iran","title":"روز بزرگداشت علامهٔ مجلسی"},{"holiday":false,"month":5,"day":31,"type":"Iran","title":"روز صنعت دفاعی"},{"holiday":false,"month":5,"day":31,"type":"Iran","title":"روز عسل"},{"holiday":false,"month":6,"day":1,"type":"Iran","title":"روز بزرگداشت ابوعلی سینا"},{"holiday":false,"month":6,"day":1,"type":"Iran","title":"روز پزشک"},{"holiday":false,"month":6,"day":1,"type":"Iran","title":"روز همدان"},{"holiday":false,"month":6,"day":2,"type":"Iran","title":"آغاز هفتهٔ دولت"},{"holiday":false,"month":6,"day":2,"type":"Iran","title":"شهادت سید ‌علی اندرزگو (در روز ۱۹ ماه مبارک رمضان) (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":6,"day":3,"type":"Iran","title":"اِشغال ایران توسط متفقین و فرار رضاخان (۱۳۲۰ ه‍.ش)"},{"holiday":false,"month":6,"day":4,"type":"Iran","title":"روز کارمند"},{"holiday":false,"month":6,"day":5,"type":"Iran","title":"روز بزرگداشت محمدبن زکریای رازی"},{"holiday":false,"month":6,"day":5,"type":"Iran","title":"روز داروسازی"},{"holiday":false,"month":6,"day":5,"type":"Iran","title":"روز کُشتی"},{"holiday":false,"month":6,"day":8,"type":"Iran","title":"انفجار دفتر نخست‌وزیری به دست منافقان و شهادت مظلومانهٔ شهیدان رجایی و باهنر (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":6,"day":8,"type":"Iran","title":"روز مبارزه با تروریسم"},{"holiday":false,"month":6,"day":10,"type":"Iran","title":"سالروز تصویب قانون عملیات بانکی بدون ربا (۱۳۶۲ ه‍.ش)"},{"holiday":false,"month":6,"day":10,"type":"Iran","title":"روز بانکداری اسلامی"},{"holiday":false,"month":6,"day":10,"type":"Iran","title":"روز تشکیل قرارگاه پدافند هوایی حضرت خاتم‌الانبیا (ص) (۱۳۷۱ ه‍.ش)"},{"holiday":false,"month":6,"day":11,"type":"Iran","title":"روز صنعت چاپ"},{"holiday":false,"month":6,"day":12,"type":"Iran","title":"سالروز شهادت رئیسعلی دلواری (۱۲۹۴ ه‍.ش)"},{"holiday":false,"month":6,"day":12,"type":"Iran","title":"روز مبارزه با استعمار انگلیس"},{"holiday":false,"month":6,"day":12,"type":"Iran","title":"روز بهوَرز"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"روز تعاون"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"روز بزرگداشت ابوریحان بیرونی"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"روز علوم پایه"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"روز مردم‌شناسی"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"سالروز زلزله فردوس در سال ۱۳۴۷"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"روز حرکت‌های جهادی و امداد مردمی"},{"holiday":false,"month":6,"day":14,"type":"Iran","title":"شهادت آیت‌الله قدوسی و سرتیپ وحید دستجردی (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":6,"day":17,"type":"Iran","title":"قیام ۱۷ شهریور و کشتار جمعی از مردم به‌دست مأموران ستم‌شاهی پهلوی (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":6,"day":19,"type":"Iran","title":"وفات آیت‌الله سید محمود طالقانی اولین حضرت امام جمعهٔ تهران (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":6,"day":20,"type":"Iran","title":"شهادت دومین شهید محراب، آیت‌الله مدنی به دست منافقان (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":6,"day":21,"type":"Iran","title":"روز سینما"},{"holiday":false,"month":6,"day":25,"type":"Iran","title":"روز خرما"},{"holiday":false,"month":6,"day":27,"type":"Iran","title":"روز شعر و ادب فارسی"},{"holiday":false,"month":6,"day":27,"type":"Iran","title":"روز بزرگداشت استاد سید‌ محمد‌حسین شهریار"},{"holiday":false,"month":6,"day":31,"type":"Iran","title":"آغاز جنگ تحمیلی (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":6,"day":31,"type":"Iran","title":"آغاز هفتهٔ دفاع مقدس"},{"holiday":false,"month":7,"day":2,"type":"Iran","title":"روز بزرگداشت شهدای منا"},{"holiday":false,"month":7,"day":4,"type":"Iran","title":"روز سرباز"},{"holiday":false,"month":7,"day":5,"type":"Iran","title":"شکست حصر آبادان در عملیات ثامن‌الائمه (ع) (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":7,"day":5,"type":"Iran","title":"روز گردشگری"},{"holiday":false,"month":7,"day":7,"type":"Iran","title":"شهادت سرداران اسلام: فلاحی، فکوری، نامجو، کلاهدوز و جهان‌آرا (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":7,"day":7,"type":"Iran","title":"روز بزرگداشت فرماندهان شهید دفاع مقدس"},{"holiday":false,"month":7,"day":7,"type":"Iran","title":"روز آتش‌نشانی و ایمنی"},{"holiday":false,"month":7,"day":7,"type":"Iran","title":"روز بزرگداشت شمس"},{"holiday":false,"month":7,"day":8,"type":"Iran","title":"روز بزرگداشت مولوی"},{"holiday":false,"month":7,"day":10,"type":"Iran","title":"روز نخبگان"},{"holiday":false,"month":7,"day":13,"type":"Iran","title":"هجرت حضرت امام خمینی (ره) از عراق به پاریس (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":7,"day":13,"type":"Iran","title":"روز نیروی انتظامی"},{"holiday":false,"month":7,"day":14,"type":"Iran","title":"روز دامپزشکی"},{"holiday":false,"month":7,"day":15,"type":"Iran","title":"روز روستا و عشایر"},{"holiday":false,"month":10,"day":7,"type":"Iran","title":"روز جهانی حماسهٔ فلسطین"},{"holiday":false,"month":10,"day":7,"type":"Iran","title":"طوفان الاقصی"},{"holiday":false,"month":7,"day":20,"type":"Iran","title":"روز بزرگداشت حافظ"},{"holiday":false,"month":7,"day":23,"type":"Iran","title":"شهادت پنجمین شهید محراب، آیت‌الله اشرفی اصفهانی به دست منافقان (۱۳۶۱ ه‍.ش)"},{"holiday":false,"month":7,"day":24,"type":"Iran","title":"روز ملی پارالمپیک"},{"holiday":false,"month":7,"day":24,"type":"Iran","title":"روز پیوند اولیا و مربیان"},{"holiday":false,"month":7,"day":24,"type":"Iran","title":"سالروز واقعهٔ به آتش کشیدن مسجد جامع شهر کرمان به دست دژخیمان حکومت پهلوی (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":7,"day":25,"type":"Iran","title":"روز نسل‌کشی کودکان و زنان فلسطینی"},{"holiday":false,"month":7,"day":26,"type":"Iran","title":"روز تربیت‌بدنی و ورزش"},{"holiday":false,"month":7,"day":29,"type":"Iran","title":"روز صادرات"},{"holiday":false,"month":8,"day":1,"type":"Iran","title":"شهادت مظلومانهٔ آیت‌الله حاج سید مصطفی خمینی (۱۳۵۶ ه‍.ش)"},{"holiday":false,"month":8,"day":1,"type":"Iran","title":"روز آمار و برنامه‌ریزی"},{"holiday":false,"month":8,"day":1,"type":"Iran","title":"روز بزرگداشت ابوالفضل بیهقی"},{"holiday":false,"month":8,"day":4,"type":"Iran","title":"اعتراض و افشاگری حضرت امام خمینی (ره) علیه پذیرش کاپیتولاسیون (۱۳۴۳ ه‍.ش)"},{"holiday":false,"month":8,"day":5,"type":"Iran","title":"روز زعفران"},{"holiday":false,"month":8,"day":7,"type":"Iran","title":"روز انار"},{"holiday":false,"month":8,"day":8,"type":"Iran","title":"شهادت محمدحسین فهمیده (بسیجی ۱۳ ساله) (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":8,"day":8,"type":"Iran","title":"روز نوجوان و بسیج دانش‌آموزی"},{"holiday":false,"month":8,"day":8,"type":"Iran","title":"روز پدافند غیرعامل"},{"holiday":false,"month":8,"day":10,"type":"Iran","title":"شهادت اولین شهید محراب، آیت‌الله قاضی طباطبایی به دست منافقان (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":8,"day":13,"type":"Iran","title":"تسخیر لانهٔ جاسوسی آمریکا به دست دانشجویان پیرو خط حضرت امام (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":8,"day":13,"type":"Iran","title":"روز ملی مبارزه با استکبار جهانی"},{"holiday":false,"month":8,"day":13,"type":"Iran","title":"روز دانش‌آموز"},{"holiday":false,"month":8,"day":13,"type":"Iran","title":"تبعید حضرت امام خمینی (ره) از ایران به ترکیه (۱۳۴۳ ه‍.ش)"},{"holiday":false,"month":8,"day":14,"type":"Iran","title":"روز فرهنگ عمومی"},{"holiday":false,"month":8,"day":14,"type":"Iran","title":"روز مازندران"},{"holiday":false,"month":8,"day":18,"type":"Iran","title":"روز کیفیت"},{"holiday":false,"month":8,"day":24,"type":"Iran","title":"روز کتاب، کتاب‌خوانی و کتابدار"},{"holiday":false,"month":8,"day":24,"type":"Iran","title":"روز بزرگداشت آیت‌الله علامه سید محمّدحسین طباطبایی (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":8,"day":25,"type":"Iran","title":"روز اصفهان"},{"holiday":false,"month":8,"day":26,"type":"Iran","title":"سالروز آزادسازی سوسنگرد"},{"holiday":false,"month":8,"day":30,"type":"Iran","title":"روز قهرمان ملی"},{"holiday":false,"month":8,"day":30,"type":"Iran","title":"روز بزرگداشت ابونصر فارابی"},{"holiday":false,"month":8,"day":30,"type":"Iran","title":"روز حکمت و فلسفه"},{"holiday":false,"month":9,"day":4,"type":"Iran","title":"روز زیتون"},{"holiday":false,"month":9,"day":5,"type":"Iran","title":"تشکیل بسیج مستضعفان به فرمان حضرت امام خمینی (ره) (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":9,"day":5,"type":"Iran","title":"روز بسیج مستضعفان"},{"holiday":false,"month":9,"day":5,"type":"Iran","title":"سالروز قیام مردم گرگان (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":9,"day":7,"type":"Iran","title":"روز نیروی دریایی"},{"holiday":false,"month":9,"day":7,"type":"Iran","title":"روز نوآوری و فناوری ساخت ایران"},{"holiday":false,"month":9,"day":9,"type":"Iran","title":"روز بزرگداشت شیخ مفید"},{"holiday":false,"month":9,"day":10,"type":"Iran","title":"شهادت آیت‌الله سید حسن مدرس (۱۳۱۶ ه‍.ش) و روز مجلس"},{"holiday":false,"month":9,"day":11,"type":"Iran","title":"شهادت میرزا‌ کوچک‌خان جنگلی (۱۳۰۰ ه‍.ش)"},{"holiday":false,"month":9,"day":12,"type":"Iran","title":"تصویب قانون اساسی جمهوری اسلامی ایران (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":9,"day":12,"type":"Iran","title":"روز قانون اساسی جمهوری اسلامی ایران"},{"holiday":false,"month":9,"day":13,"type":"Iran","title":"روز بیمه"},{"holiday":false,"month":9,"day":16,"type":"Iran","title":"روز دانشجو"},{"holiday":false,"month":9,"day":18,"type":"Iran","title":"معرفی عراق به عنوان مسئول و آغازگر جنگ از سوی سازمان ملل (۱۳۷۰ ه‍.ش)"},{"holiday":false,"month":9,"day":19,"type":"Iran","title":"تشکیل شورای عالی انقلاب فرهنگی به فرمان حضرت امام خمینی (ره) (۱۳۶۳ ه‍.ش)"},{"holiday":false,"month":9,"day":20,"type":"Iran","title":"شهادت سومین شهید محراب، آیت‌الله دستغیب به دست منافقان (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":9,"day":25,"type":"Iran","title":"روز پژوهش"},{"holiday":false,"month":9,"day":26,"type":"Iran","title":"روز حمل‌و‌نقل و رانندگان"},{"holiday":false,"month":9,"day":27,"type":"Iran","title":"شهادت آیت‌الله دکتر محمد مفتح (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":9,"day":27,"type":"Iran","title":"روز وحدت حوزه و دانشگاه"},{"holiday":false,"month":9,"day":27,"type":"Iran","title":"روز جهان عاری از خشونت و افراطی‌گری"},{"holiday":false,"month":9,"day":29,"type":"Iran","title":"روز تجلیل از شهید تندگویان"},{"holiday":false,"month":9,"day":30,"type":"Iran","title":"شب یلدا (چله)"},{"holiday":false,"month":9,"day":30,"type":"Iran","title":"ترویج فرهنگ میهمانی و پیوند با خویشان"},{"holiday":false,"month":10,"day":3,"type":"Iran","title":"روز ثبت احوال"},{"holiday":false,"month":10,"day":4,"type":"Iran","title":"روز بزرگداشت رودکی"},{"holiday":false,"month":10,"day":5,"type":"Iran","title":"روز ایمنی در برابر زلزله و کاهش اثرات بلایای طبیعی"},{"holiday":false,"month":10,"day":7,"type":"Iran","title":"سالروز تشکیل نهضت سوادآموزی به فرمان حضرت امام خمینی (ره) (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":10,"day":7,"type":"Iran","title":"شهادت آیت‌الله حسین غفاری به دست مأموران ستم‌شاهی پهلوی (۱۳۵۳ ه‍.ش)"},{"holiday":false,"month":10,"day":8,"type":"Iran","title":"روز صنعت پتروشیمی"},{"holiday":false,"month":10,"day":9,"type":"Iran","title":"روز بصیرت و میثاق امت با ولایت"},{"holiday":false,"month":10,"day":12,"type":"Iran","title":"روز بزرگداشت علامه مصباح یزدی"},{"holiday":false,"month":10,"day":12,"type":"Iran","title":"روز علوم انسانی اسلامی"},{"holiday":false,"month":10,"day":13,"type":"Iran","title":"روز جهانی مقاومت"},{"holiday":false,"month":10,"day":13,"type":"Iran","title":"شهادت الگوی اخلاص و عمل سردار سپهبد قاسم سلیمانی به دست استکبار جهانی"},{"holiday":false,"month":10,"day":13,"type":"Iran","title":"ابلاغ پیام تاریخی حضرت امام خمینی (ره) به گورباچف رهبر شوروی سابق (۱۳۶۷ ه‍.ش)"},{"holiday":false,"month":10,"day":16,"type":"Iran","title":"شهادت سیدحسین علم‌الهدی و همرزمان وی در هویزه"},{"holiday":false,"month":10,"day":16,"type":"Iran","title":"روز شهدای دانشجو"},{"holiday":false,"month":10,"day":17,"type":"Iran","title":"اجرای طرح استعماری حذف حجاب (کشف حجاب) به دست رضاخان (۱۳۱۴ ه‍.ش)"},{"holiday":false,"month":10,"day":17,"type":"Iran","title":"روز بزرگداشت خواجوی کرمانی"},{"holiday":false,"month":10,"day":17,"type":"Iran","title":"روز کرمان"},{"holiday":false,"month":10,"day":19,"type":"Iran","title":"قیام خونین مردم قم (۱۳۵۶ ه‍.ش)"},{"holiday":false,"month":10,"day":20,"type":"Iran","title":"شهادت میرزا تقی‌خان امیرکبیر (۱۲۳۰ ه‍.ش)"},{"holiday":false,"month":10,"day":22,"type":"Iran","title":"تشکیل شورای انقلاب به فرمان حضرت امام خمینی (ره) (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":10,"day":25,"type":"Iran","title":"روز تاریخ‌نگاری انقلاب اسلامی"},{"holiday":false,"month":10,"day":26,"type":"Iran","title":"فرار شاه معدوم (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":10,"day":27,"type":"Iran","title":"شهادت نواب صفوی، طهماسبی، برادران واحدی و ذوالقدر از فدائیان اسلام (۱۳۳۴ ه‍.ش)"},{"holiday":false,"month":11,"day":1,"type":"Iran","title":"روز بزرگداشت خاقانی شروانی"},{"holiday":false,"month":11,"day":6,"type":"Iran","title":"سالروز حماسهٔ مردم آمل"},{"holiday":false,"month":11,"day":6,"type":"Iran","title":"روز بزرگداشت صفی‌الدین اُرمَوی"},{"holiday":false,"month":11,"day":6,"type":"Iran","title":"روز آواها و نواهای ایرانی"},{"holiday":false,"month":11,"day":12,"type":"Iran","title":"سالروز بازگشت حضرت امام خمینی (ره) به ایران و آغاز دههٔ مبارک فجر انقلاب اسلامی"},{"holiday":false,"month":11,"day":14,"type":"Iran","title":"روز فناوری فضایی"},{"holiday":false,"month":11,"day":19,"type":"Iran","title":"روز نیروی هوایی"},{"holiday":false,"month":11,"day":1,"type":"Iran","title":"روز چهارمحال و بختیاری"},{"holiday":false,"month":11,"day":21,"type":"Iran","title":"شکسته شدن حکومت‌نظامی به فرمان حضرت امام خمینی (ره) (۱۳۵۷ ه‍.ش)"},{"holiday":true,"month":11,"day":22,"type":"Iran","title":"پیروزی انقلاب اسلامی ایران و سقوط نظام شاهنشاهی (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":11,"day":25,"type":"Iran","title":"صدور حکم تاریخی حضرت امام خمینی (ره) مبنی بر ارتداد سلمان‌رشدی نویسندهٔ خائن کتاب آیات شیطانی (۱۳۶۷ ه‍.ش)"},{"holiday":false,"month":11,"day":29,"type":"Iran","title":"قیام مردم تبریز به مناسبت چهلمین روز شهادت شهدای قم (۱۳۵۶ ه‍.ش)"},{"holiday":false,"month":11,"day":29,"type":"Iran","title":"روز اقتصاد مقاومتی و کارآفرینی"},{"holiday":false,"month":12,"day":3,"type":"Iran","title":"کودتای انگلیسی رضاخان (۱۲۹۹ ه‍.ش)"},{"holiday":false,"month":12,"day":5,"type":"Iran","title":"روز بزرگداشت خواجه‌نصیرالدین طوسی"},{"holiday":false,"month":12,"day":5,"type":"Iran","title":"روز مهندسی"},{"holiday":false,"month":12,"day":8,"type":"Iran","title":"روز امور تربیتی و تربیت اسلامی"},{"holiday":false,"month":12,"day":8,"type":"Iran","title":"روز بزرگداشت حکیم حاج ملاهادی سبزواری"},{"holiday":false,"month":12,"day":8,"type":"Iran","title":"روز حمایت از بیماران نادر"},{"holiday":false,"month":12,"day":9,"type":"Iran","title":"روز حمایت از حقوق مصرف‌کنندگان"},{"holiday":false,"month":12,"day":14,"type":"Iran","title":"روز احسان و نیکوکاری"},{"holiday":false,"month":12,"day":14,"type":"Iran","title":"روز ترویج فرهنگ قرض‌الحسنه"},{"holiday":false,"month":12,"day":15,"type":"Iran","title":"روز درختکاری"},{"holiday":false,"month":12,"day":15,"type":"Iran","title":"روز آموزش همگانی حفظ محیط زیست"},{"holiday":false,"month":12,"day":18,"type":"Iran","title":"روز بزرگداشت سید ‌جمال‌الدین اسدآبادی"},{"holiday":false,"month":12,"day":18,"type":"Iran","title":"سالروز تأسیس کانون‌های فرهنگی‌و‌هنری مساجد کشور"},{"holiday":false,"month":12,"day":18,"type":"Iran","title":"روز بوشهر"},{"holiday":false,"month":12,"day":20,"type":"Iran","title":"روز راهیان نور"},{"holiday":false,"month":12,"day":21,"type":"Iran","title":"روز بزرگداشت نظامی گنجوی"},{"holiday":false,"month":12,"day":22,"type":"Iran","title":"سالروز صدور فرمان حضرت امام خمینی (ره)، مبنی بر تأسیس بنیاد شهید انقلاب اسلامی (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":12,"day":22,"type":"Iran","title":"روز بزرگداشت شهدا"},{"holiday":false,"month":12,"day":25,"type":"Iran","title":"روز بزرگداشت پروین اعتصامی"},{"holiday":false,"month":12,"day":25,"type":"Iran","title":"بمباران شیمیایی حلبچه به دست ارتش بعث عراق (۱۳۶۶ ه‍.ش)"},{"holiday":true,"month":12,"day":29,"type":"Iran","title":"روز ملی شدن صنعت نفت ایران (۱۳۲۹ ه‍.ش)"},{"holiday":false,"month":1,"day":30,"type":"Iran","title":"روز آزمایشگاهیان"},{"holiday":false,"month":2,"day":9,"type":"Iran","title":"روز روان‌شناس و مشاور"},{"holiday":false,"month":2,"day":15,"type":"Iran","title":"روز صنعت بتن آماده"},{"holiday":false,"month":2,"day":15,"type":"Iran","title":"روز صنعت تهویه مطبوع"},{"holiday":false,"month":2,"day":22,"type":"Iran","title":"روز مشاغل خانگی و تولید خانواده‌محور"},{"holiday":false,"month":2,"day":31,"type":"Iran","title":"روز بوم‌گردی"},{"holiday":false,"month":3,"day":7,"type":"Iran","title":"روز نقشه‌برداری"},{"holiday":false,"month":3,"day":8,"type":"Iran","title":"روز مشاور املاک"},{"holiday":false,"month":3,"day":30,"type":"Iran","title":"روز صنعت موتورسیکلت"},{"holiday":false,"month":4,"day":5,"type":"Iran","title":"روز صنعت ابزارآلات"},{"holiday":false,"month":4,"day":6,"type":"Iran","title":"روز عینک‌سازی و بینایی‌سنجی"},{"holiday":false,"month":4,"day":12,"type":"Iran","title":"روز حمایت از تولید ملی و مبارزه با قاچاق کالا"},{"holiday":false,"month":4,"day":12,"type":"Iran","title":"روز خیاط، صنعت نساجی و پوشاک"},{"holiday":false,"month":4,"day":18,"type":"Iran","title":"روز صنعت قیر و آسفالت"},{"holiday":false,"month":4,"day":30,"type":"Iran","title":"روز خلبان"},{"holiday":false,"month":6,"day":25,"type":"Iran","title":"روز کفاش، صنعت کفش و چرم"},{"holiday":false,"month":7,"day":24,"type":"Iran","title":"روز صنعت آسانسور و پله‌برقی"},{"holiday":false,"month":8,"day":8,"type":"Iran","title":"روز محیط‌بان"},{"holiday":false,"month":8,"day":25,"type":"Iran","title":"روز صنعت نوشت‌افزار"},{"holiday":false,"month":9,"day":1,"type":"Iran","title":"روز صنعت سرب و روی"},{"holiday":false,"month":9,"day":15,"type":"Iran","title":"روز حسابدار"},{"holiday":false,"month":9,"day":18,"type":"Iran","title":"روز سد و نیروگاه برق‌آبی"},{"holiday":false,"month":9,"day":22,"type":"Iran","title":"روز صنعت مس"},{"holiday":false,"month":10,"day":1,"type":"Iran","title":"روز آرایشگر"},{"holiday":false,"month":10,"day":6,"type":"Iran","title":"روز دفاتر اسناد رسمی"},{"holiday":false,"month":10,"day":8,"type":"Iran","title":"روز صنعت سیمان"},{"holiday":false,"month":10,"day":20,"type":"Iran","title":"روز قناد، صنعت شیرینی و شکلات"},{"holiday":false,"month":10,"day":29,"type":"Iran","title":"روز معاینه فنی خودرو"},{"holiday":false,"month":11,"day":11,"type":"Iran","title":"روز ویراستار"},{"holiday":false,"month":12,"day":10,"type":"Iran","title":"روز بازاریاب و مدیر فروش"},{"holiday":false,"month":12,"day":16,"type":"Iran","title":"روز کارشناس و متخصص تغذیه"},{"holiday":false,"month":12,"day":21,"type":"Iran","title":"روز خادمان آرامستان"},{"holiday":false,"month":12,"day":23,"type":"Iran","title":"روز صنعت طلا، جواهر، نقره و گوهرسنگ‌ها"},{"holiday":false,"month":1,"day":1,"type":"AncientIran","title":"جشن نوروز، نوروز جمشیدی (جمشید پیشدادی) - ابتدای بهار"},{"holiday":false,"month":1,"day":6,"type":"AncientIran","title":"نوروز بزرگ (هودرو)، زادروز آشو زرتشت - روییدن مشی و مشیانه"},{"holiday":false,"month":1,"day":7,"type":"AncientIran","title":"آیین نیایش پیر هریشت از ۷ تا ۱۱ فروردین"},{"holiday":false,"month":1,"day":13,"type":"AncientIran","title":"سیزده نوروز، سیزده‌بدر"},{"holiday":false,"month":1,"day":19,"type":"AncientIran","title":"جشن فرودینگان"},{"holiday":false,"month":2,"day":2,"type":"AncientIran","title":"جشن اردیبهشتگان، پوشیدن لباس سپید به نشانه پاکی"},{"holiday":false,"month":2,"day":10,"type":"AncientIran","title":"جشن چلمو (چله بهار) - گاهان بار میدیوزرم‌گاه از ۱۰ تا ۱۴ اردیبهشت"},{"holiday":false,"month":2,"day":18,"type":"AncientIran","title":"جشن پنجاه بدر"},{"holiday":false,"month":2,"day":25,"type":"AncientIran","title":"بزرگداشت استاد توس فردوسی بزرگ"},{"holiday":false,"month":3,"day":4,"type":"AncientIran","title":"جشن خوردادگان، امشاسپند خورداد نگاهبان آبها"},{"holiday":false,"month":3,"day":24,"type":"AncientIran","title":"آیین نیایش ستی پیر و پیر سبز (چک چک)"},{"holiday":false,"month":3,"day":29,"type":"AncientIran","title":"جشن ابتدای تیر ماه، آب پاشونک"},{"holiday":false,"month":4,"day":2,"type":"AncientIran","title":"آیین نیایش پیر نارستانه"},{"holiday":false,"month":4,"day":8,"type":"AncientIran","title":"گاهان بار میدیوشهیم‌گاه از ۸ تا ۱۲ تیر"},{"holiday":false,"month":4,"day":10,"type":"AncientIran","title":"جشن تیرگان، آب پاشونک"},{"holiday":false,"month":4,"day":13,"type":"AncientIran","title":"آیین نیایش پارس بانو از ۱۳ تا ۱۷ تیر"},{"holiday":false,"month":5,"day":3,"type":"AncientIran","title":"جشن امردادگان، امشاسپند امرداد نگاهبان رستنی‌ها"},{"holiday":false,"month":5,"day":6,"type":"AncientIran","title":"جشن چلهٔ تابستان"},{"holiday":false,"month":5,"day":12,"type":"AncientIran","title":"آیین نیایش پیر نارکی از ۱۲ تا ۱۶ مرداد"},{"holiday":false,"month":5,"day":30,"type":"AncientIran","title":"جشن شهریورگان، امشاسپند شهریور نگاهبان فلزات"},{"holiday":false,"month":6,"day":3,"type":"AncientIran","title":"جشن خزان"},{"holiday":false,"month":6,"day":21,"type":"AncientIran","title":"گاهان‌بار پتیه‌شهیم‌گاه از ۲۱ تا ۲۵ شهریور"},{"holiday":false,"month":7,"day":10,"type":"AncientIran","title":"جشن مهرگان"},{"holiday":false,"month":8,"day":4,"type":"AncientIran","title":"جشن آبانگان"},{"holiday":false,"month":8,"day":7,"type":"AncientIran","title":"روز کوروش بزرگ"},{"holiday":false,"month":8,"day":9,"type":"AncientIran","title":"جشن پاییزانه"},{"holiday":false,"month":8,"day":21,"type":"AncientIran","title":"جشن گالشی"},{"holiday":false,"month":9,"day":3,"type":"AncientIran","title":"جشن آذرگان"},{"holiday":false,"month":9,"day":25,"type":"AncientIran","title":"اولین جشن دی‌گان"},{"holiday":false,"month":9,"day":30,"type":"AncientIran","title":"جشن شب یلدا"},{"holiday":false,"month":10,"day":2,"type":"AncientIran","title":"دومین جشن دی‌گان"},{"holiday":false,"month":10,"day":8,"type":"AncientIran","title":"جشن سیر و سور"},{"holiday":false,"month":10,"day":9,"type":"AncientIran","title":"سومین جشن دی‌گان"},{"holiday":false,"month":10,"day":17,"type":"AncientIran","title":"چهارمین جشن دی‌گان"},{"holiday":false,"month":10,"day":26,"type":"AncientIran","title":"جشن بهمنگان، روز پدر، بهمن (منش نیک) امشاسپند"},{"holiday":false,"month":10,"day":29,"type":"AncientIran","title":"جشن نوسده"},{"holiday":false,"month":11,"day":9,"type":"AncientIran","title":"جشن میانهٔ زمستان"},{"holiday":false,"month":11,"day":10,"type":"AncientIran","title":"جشن سده، آتش افروزی به هنگام غروب آفتاب"},{"holiday":false,"month":11,"day":29,"type":"AncientIran","title":"جشن اسفندگان، روز مادر و روز عشق پاک"},{"holiday":false,"month":12,"day":14,"type":"AncientIran","title":"جشن گلدان (اینجه، رسیدگی به امور نباتات)"}],"Hijri Calendar":[{"holiday":true,"month":1,"day":10,"type":"Afghanistan","title":"روز عاشورا"},{"holiday":true,"month":3,"day":12,"type":"Afghanistan","title":"روز میلاد نبی (ص)"},{"holiday":true,"month":9,"day":1,"type":"Afghanistan","title":"اول ماه مبارک رمضان"},{"holiday":false,"month":9,"day":15,"type":"Afghanistan","title":"روز حمایت از اطفال آسیب‌پذیر، یتیم و بی‌سرپرست"},{"holiday":false,"month":9,"day":27,"type":"Afghanistan","title":"روز گرامیداشت از نزول قرآن عظیم‌الشان"},{"holiday":true,"month":10,"day":1,"type":"Afghanistan","title":"عید سعید فطر"},{"holiday":true,"month":10,"day":2,"type":"Afghanistan","title":"عید سعید فطر، روز دوم"},{"holiday":true,"month":10,"day":3,"type":"Afghanistan","title":"عید سعید فطر، روز سوم"},{"holiday":true,"month":12,"day":9,"type":"Afghanistan","title":"روز عرفه و عید سعید اضحی"},{"holiday":true,"month":12,"day":10,"type":"Afghanistan","title":"روز عرفه و عید سعید اضحی"},{"holiday":true,"month":12,"day":11,"type":"Afghanistan","title":"روز عرفه و عید سعید اضحی"},{"holiday":true,"month":12,"day":12,"type":"Afghanistan","title":"روز عرفه و عید سعید اضحی"},{"holiday":false,"month":1,"day":1,"type":"Iran","title":"آغاز سال هجری قمری"},{"holiday":false,"month":1,"day":2,"type":"Iran","title":"روز امر به معروف و نهی از منکر"},{"holiday":true,"month":1,"day":9,"type":"Iran","title":"تاسوعای حسینی"},{"holiday":true,"month":1,"day":10,"type":"Iran","title":"عاشورای حسینی"},{"holiday":false,"month":1,"day":11,"type":"Iran","title":"روز تجلیل از اسرا و مفقودان"},{"holiday":false,"month":1,"day":12,"type":"Iran","title":"شهادت حضرت امام زین‌العابدین (ع) (۹۵ ه‍.ق)"},{"holiday":false,"month":1,"day":25,"type":"Iran","title":"شهادت حضرت امام زین‌العابدین (ع) (۹۵ ه‍.ق) به روایتی"},{"holiday":false,"month":1,"day":25,"type":"Iran","title":"یاد روز قیام مردم سیستان به خون‌خواهی شهدای کربلا (سال ۶۲ ه‍.ق)"},{"holiday":false,"month":2,"day":3,"type":"Iran","title":"ولادت حضرت امام محمد باقر (ع) (۵۷ ﻫ.ق) به روایتی"},{"holiday":false,"month":2,"day":7,"type":"Iran","title":"شهادت حضرت امام حسن مجتبی (ع) (۵۰ ه‍.ق) به روایتی"},{"holiday":false,"month":2,"day":7,"type":"Iran","title":"روز بزرگداشت سلمان فارسی"},{"holiday":true,"month":2,"day":20,"type":"Iran","title":"اربعین حسینی"},{"holiday":true,"month":2,"day":28,"type":"Iran","title":"رحلت حضرت رسول اکرم (ص) (۱۱ ه‍.ق) – شهادت حضرت امام حسن مجتبی (ع) (۵۰ ه‍.ق)"},{"holiday":false,"month":3,"day":1,"type":"Iran","title":"هجرت رسول اکرم (ص) از مکه به مدینه"},{"holiday":true,"month":3,"day":8,"type":"Iran","title":"شهادت حضرت امام حسن عسکری (ع) (۲۶۰ ه‍.ق) و آغاز امامت حضرت ولی عصر (عج)"},{"holiday":false,"month":3,"day":12,"type":"Iran","title":"ولادت حضرت رسول اکرم (ص) به روایت اهل سنت (۵۳ سال قبل از هجرت)"},{"holiday":false,"month":3,"day":12,"type":"Iran","title":"آغاز هفتهٔ وحدت"},{"holiday":false,"month":3,"day":14,"type":"Iran","title":"روز سیستان و بلوچستان"},{"holiday":false,"month":3,"day":16,"type":"Iran","title":"روز وقف"},{"holiday":true,"month":3,"day":17,"type":"Iran","title":"ولادت حضرت رسول اکرم (ص) (۵۳ سال قبل از هجرت) و روز اخلاق و مهرورزی"},{"holiday":true,"month":3,"day":17,"type":"Iran","title":"ولادت حضرت امام جعفر صادق (ع) مؤسس مذهب جعفری (۸۳ ه‍.ق)"},{"holiday":false,"month":4,"day":4,"type":"Iran","title":"ولادت حضرت عبدالعظیم حسنی (ع)"},{"holiday":false,"month":4,"day":8,"type":"Iran","title":"ولادت حضرت امام حسن عسکری (ع) (۲۳۲ ه‍.ق)"},{"holiday":false,"month":4,"day":10,"type":"Iran","title":"وفات حضرت معصومه (س) (۲۰۱ ه‍.ق)"},{"holiday":false,"month":5,"day":5,"type":"Iran","title":"ولادت حضرت زینب (س) (۵ ه‍.ق) و روز پرستار"},{"holiday":false,"month":5,"day":13,"type":"Iran","title":"شهادت حضرت فاطمهٔ زهرا (س) (۱۱ ه‍.ق) به روایتی"},{"holiday":true,"month":6,"day":3,"type":"Iran","title":"شهادت حضرت فاطمهٔ زهرا (س) (۱۱ ه‍.ق)"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"سالروز وفات حضرت ام‌البنین (س)"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"روز تکریم مادران و همسران شهدا"},{"holiday":false,"month":6,"day":20,"type":"Iran","title":"روز زن و مادر و ولادت حضرت فاطمهٔ زهرا (س) (سال هشتم قبل از هجرت)"},{"holiday":false,"month":6,"day":20,"type":"Iran","title":"تولد حضرت امام خمینی (ره) رهبر کبیر انقلاب اسلامی (۱۳۲۰ ه‍.ق)"},{"holiday":false,"month":7,"day":1,"type":"Iran","title":"ولادت حضرت امام محمد باقر (ع) (۵۷ ه‍.ق)"},{"holiday":false,"month":7,"day":3,"type":"Iran","title":"شهادت حضرت امام علی النقی الهادی (ع) (۲۵۴ ه‍.ق)"},{"holiday":false,"month":7,"day":10,"type":"Iran","title":"ولادت حضرت امام محمد تقی (ع) «جوادالائمه» (۱۹۵ ه‍.ق)"},{"holiday":true,"month":7,"day":13,"type":"Iran","title":"ولادت حضرت امام علی (ع) (۲۳ سال قبل از هجرت)"},{"holiday":false,"month":7,"day":13,"type":"Iran","title":"روز پدر"},{"holiday":false,"month":7,"day":13,"type":"Iran","title":"آغاز ایام‌البیض (اعتکاف)"},{"holiday":false,"month":7,"day":15,"type":"Iran","title":"ارتحال حضرت زینب (س) (۶۲ ه‍.ق)"},{"holiday":false,"month":7,"day":15,"type":"Iran","title":"تغییر قبلهٔ مسلمین از بیت‌المقدس به مکهٔ معظمه (۲ ه‍.ق)"},{"holiday":false,"month":7,"day":25,"type":"Iran","title":"شهادت حضرت امام موسی کاظم (ع) (۱۸۳ ه‍.ق)"},{"holiday":true,"month":7,"day":27,"type":"Iran","title":"مبعث حضرت رسول اکرم (ص) (۱۳ سال قبل از هجرت)"},{"holiday":false,"month":8,"day":3,"type":"Iran","title":"ولادت حضرت امام حسین (ع) (۴ ه‍.ق) و روز پاسدار"},{"holiday":false,"month":8,"day":4,"type":"Iran","title":"ولادت حضرت ابوالفضل العباس (ع) (۲۶ ه‍.ق) و روز جانباز"},{"holiday":false,"month":8,"day":5,"type":"Iran","title":"ولادت حضرت امام زین‌العابدین (ع) (۳۸ ه‍.ق)"},{"holiday":false,"month":8,"day":5,"type":"Iran","title":"روز صحیفهٔ سجادیه"},{"holiday":false,"month":8,"day":11,"type":"Iran","title":"ولادت حضرت علی اکبر (ع) (۳۳ ه‍.ق) و روز جوان"},{"holiday":true,"month":8,"day":15,"type":"Iran","title":"ولادت حضرت قائم (عج) (۲۵۵ ه‍.ق) و روز جهانی مستضعفان"},{"holiday":false,"month":8,"day":15,"type":"Iran","title":"روز سربازان گمنام حضرت امام زمان (عج)"},{"holiday":false,"month":9,"day":10,"type":"Iran","title":"وفات حضرت خدیجه (س) (۳ سال قبل از هجرت)"},{"holiday":false,"month":9,"day":15,"type":"Iran","title":"ولادت حضرت امام حسن مجتبی (ع) (۳ ه‍.ق) و روز اکرام و تکریم خیرین"},{"holiday":false,"month":9,"day":18,"type":"Iran","title":"شب قدر"},{"holiday":false,"month":9,"day":19,"type":"Iran","title":"ضربت خوردن حضرت امام علی (ع) (۴۰ ه‍.ق)"},{"holiday":false,"month":9,"day":19,"type":"Iran","title":"روز نهج‌البلاغه"},{"holiday":false,"month":9,"day":20,"type":"Iran","title":"شب قدر"},{"holiday":true,"month":9,"day":21,"type":"Iran","title":"شهادت حضرت امام علی (ع) (۴۰ ه‍.ق)"},{"holiday":false,"month":9,"day":22,"type":"Iran","title":"شب قدر"},{"holiday":true,"month":10,"day":1,"type":"Iran","title":"عید سعید فطر"},{"holiday":true,"month":10,"day":2,"type":"Iran","title":"تعطیل به مناسبت عید سعید فطر"},{"holiday":false,"month":10,"day":17,"type":"Iran","title":"روز فرهنگ پهلوانی و ورزش زورخانه‌ای"},{"holiday":false,"month":10,"day":21,"type":"Iran","title":"فتح اندلس به دست مسلمانان (۹۲ ه‍.ق)"},{"holiday":true,"month":10,"day":25,"type":"Iran","title":"شهادت حضرت امام جعفر صادق (ع) (۱۴۸ ه‍.ق)"},{"holiday":false,"month":11,"day":1,"type":"Iran","title":"ولادت حضرت معصومه (س) (۱۷۳ ه‍.ق) و روز دختران"},{"holiday":false,"month":11,"day":1,"type":"Iran","title":"آغاز دههٔ کرامت"},{"holiday":false,"month":11,"day":5,"type":"Iran","title":"روز تجلیل از امامزادگان و بقاع متبرکه"},{"holiday":false,"month":11,"day":5,"type":"Iran","title":"روز بزرگداشت حضرت صالح بن موسی کاظم (ع)"},{"holiday":false,"month":11,"day":6,"type":"Iran","title":"روز بزرگداشت حضرت احمدبن‌موسی شاهچراغ (ع)"},{"holiday":false,"month":11,"day":11,"type":"Iran","title":"ولادت حضرت امام رضا (ع) (۱۴۸ ه‍.ق)"},{"holiday":false,"month":12,"day":1,"type":"Iran","title":"سالروز ازدواج حضرت امام علی (ع) و حضرت فاطمه (س) (۲ ه‍.ق)"},{"holiday":false,"month":12,"day":1,"type":"Iran","title":"روز ازدواج"},{"holiday":false,"month":12,"day":6,"type":"Iran","title":"شهادت مظلومانهٔ زائران خانهٔ خدا به دست مأموران آل سعود (۱۳۶۶ ه‍.ش برابر با ۶ ذی‌الحجه ۱۴۰۷ ه‍.ق)"},{"holiday":false,"month":12,"day":7,"type":"Iran","title":"شهادت حضرت امام محمد باقر (ع) (۱۱۴ ه‍.ق)"},{"holiday":false,"month":12,"day":9,"type":"Iran","title":"روز عرفه (روز نیایش)"},{"holiday":true,"month":12,"day":10,"type":"Iran","title":"عید سعید قربان"},{"holiday":false,"month":12,"day":10,"type":"Iran","title":"آغاز دههٔ امامت و ولایت"},{"holiday":false,"month":12,"day":15,"type":"Iran","title":"ولادت حضرت امام علی النقی الهادی (ع) (۲۱۲ ه‍.ق)"},{"holiday":true,"month":12,"day":18,"type":"Iran","title":"عید سعید غدیر خم (۱۰ ه‍.ق)"},{"holiday":false,"month":12,"day":20,"type":"Iran","title":"ولادت حضرت امام موسی کاظم (ع) (۱۲۸ ه‍.ق)"},{"holiday":false,"month":12,"day":24,"type":"Iran","title":"روز مباهلهٔ پیامبر اسلام (ص) (۱۰ ه‍.ق)"},{"holiday":false,"month":12,"day":25,"type":"Iran","title":"روز خانواده و تکریم بازنشستگان"}],"Gregorian Calendar":[{"holiday":false,"month":1,"day":21,"title":"روز ملی مبارزه علیه مواد انفجاری تعبیه شده","type":"Afghanistan"},{"holiday":false,"month":3,"day":8,"title":"روز جهانی زن","type":"Afghanistan"},{"holiday":false,"month":3,"day":15,"title":"روز جهانی حقوق مستهلک","type":"Afghanistan"},{"holiday":false,"month":3,"day":22,"title":"روز جهانی آب","type":"Afghanistan"},{"holiday":false,"month":3,"day":23,"title":"روز جهانی هواشناسی","type":"Afghanistan"},{"holiday":false,"month":5,"day":1,"title":"روز بین‌المللی کارگر","type":"Afghanistan"},{"holiday":false,"month":5,"day":6,"title":"روز قلم","type":"Afghanistan"},{"holiday":false,"month":5,"day":17,"title":"روز جهانی تیلی‌کمیونیکیشن","type":"Afghanistan"},{"holiday":false,"month":5,"day":18,"title":"روز بین‌المللی موزیم‌ها","type":"Afghanistan"},{"holiday":false,"month":6,"day":1,"title":"روز بین‌المللی طفل","type":"Afghanistan"},{"holiday":false,"month":6,"day":5,"title":"هفتهٔ محیط زیست (۵-۱۱ جون)","type":"Afghanistan"},{"holiday":false,"month":6,"day":20,"title":"روز بین‌المللی پناهنده‌گان","type":"Afghanistan"},{"holiday":false,"month":6,"day":23,"title":"روز جهانی المپیک","type":"Afghanistan"},{"holiday":false,"month":6,"day":26,"title":"هفتهٔ مبارزه علیه مواد مخدر، روز جهانی مبارزه علیه مواد مخدر","type":"Afghanistan"},{"holiday":false,"month":7,"day":11,"title":"روز جهانی نفوس","type":"Afghanistan"},{"holiday":false,"month":8,"day":1,"title":"هفتهٔ تغذیه از شیر مادر (۱-۷ آگست)","type":"Afghanistan"},{"holiday":false,"month":8,"day":21,"title":"روز بین المللی یادبود و گرامیداشت از قربانیان تروریزم","type":"Afghanistan"},{"holiday":false,"month":9,"day":8,"title":"روز بین‌المللی سواد","type":"Afghanistan"},{"holiday":false,"month":9,"day":21,"title":"روز جهانی صلح","type":"Afghanistan"},{"holiday":false,"month":9,"day":27,"title":"روز جهانی توریزم","type":"Afghanistan"},{"holiday":false,"month":10,"day":5,"title":"روز جهانی معلم","type":"Afghanistan"},{"holiday":false,"month":10,"day":9,"title":"روز جهانی پست","type":"Afghanistan"},{"holiday":false,"month":10,"day":12,"title":"روز جهانی کاهش خطرپذیری","type":"Afghanistan"},{"holiday":false,"month":10,"day":16,"title":"روز جهانی غذا","type":"Afghanistan"},{"holiday":false,"month":10,"day":24,"title":"روز جهانی ملل متحد","type":"Afghanistan"},{"holiday":false,"month":11,"day":17,"title":"روز جهانی محصلان","type":"Afghanistan"},{"holiday":false,"month":12,"day":7,"title":"روز جهانی هوانوردی","type":"Afghanistan"},{"holiday":false,"month":12,"day":18,"title":"روز جهانی مهاجرت","type":"Afghanistan"},{"holiday":false,"month":12,"day":28,"title":"روز جهانی سینما","type":"Afghanistan"},{"holiday":false,"month":1,"day":1,"title":"آغاز سال میلادی","type":"Iran"},{"holiday":false,"month":1,"day":26,"title":"روز جهانی گمرک","type":"Iran"},{"holiday":false,"month":3,"day":22,"title":"روز جهانی آب","type":"Iran"},{"holiday":false,"month":3,"day":23,"title":"روز جهانی هواشناسی","type":"Iran"},{"holiday":false,"month":4,"day":5,"title":"روز جهانی کودک فلسطینی","type":"Iran"},{"holiday":false,"month":5,"day":1,"title":"روز جهانی کار و کارگر","type":"Iran"},{"holiday":false,"month":5,"day":5,"title":"روز جهانی ماما","type":"Iran"},{"holiday":false,"month":5,"day":8,"title":"روز جهانی صلیب سرخ و هلال احمر","type":"Iran"},{"holiday":false,"month":5,"day":18,"title":"روز جهانی موزه و میراث فرهنگی","type":"Iran"},{"holiday":false,"month":5,"day":31,"title":"روز جهانی بدون دخانیات","type":"Iran"},{"holiday":false,"month":6,"day":1,"title":"روز جهانی والدین","type":"Iran"},{"holiday":false,"month":6,"day":5,"title":"روز جهانی محیط زیست","type":"Iran"},{"holiday":false,"month":6,"day":17,"title":"روز جهانی بیابان‌زدایی","type":"Iran"},{"holiday":false,"month":6,"day":26,"title":"روز جهانی مبارزه با مواد مخدر","type":"Iran"},{"holiday":false,"month":8,"day":1,"title":"روز جهانی شیر مادر","type":"Iran"},{"holiday":false,"month":8,"day":6,"title":"انفجار بمب اتمی آمریکا در هیروشیما با بیش از ۱۶۰هزار کشته و مجروح (۱۹۴۵ میلادی)","type":"Iran"},{"holiday":false,"month":8,"day":21,"title":"روز جهانی مسجد","type":"Iran"},{"holiday":false,"month":9,"day":27,"title":"روز جهانی جهانگردی","type":"Iran"},{"holiday":false,"month":9,"day":30,"title":"روز جهانی دریانوردی","type":"Iran"},{"holiday":false,"month":9,"day":30,"title":"روز جهانی ناشنوایان","type":"Iran"},{"holiday":false,"month":10,"day":1,"title":"روز جهانی سالمندان","type":"Iran"},{"holiday":false,"month":10,"day":8,"title":"روز جهانی کودک","type":"Iran"},{"holiday":false,"month":10,"day":9,"title":"روز جهانی پست","type":"Iran"},{"holiday":false,"month":10,"day":14,"title":"روز جهانی استاندارد","type":"Iran"},{"holiday":false,"month":10,"day":15,"title":"روز جهانی نابینایان (عصای سفید)","type":"Iran"},{"holiday":false,"month":10,"day":16,"title":"روز جهانی غذا","type":"Iran"},{"holiday":false,"month":11,"day":10,"title":"روز جهانی علم در خدمت صلح و توسعه","type":"Iran"},{"holiday":false,"month":12,"day":1,"title":"روز جهانی مبارزه با ایدز","type":"Iran"},{"holiday":false,"month":12,"day":3,"title":"روز جهانی معلولان","type":"Iran"},{"holiday":false,"month":12,"day":7,"title":"روز جهانی هواپیمایی","type":"Iran"},{"holiday":false,"month":12,"day":25,"title":"ولادت حضرت عیسی مسیح (ع)","type":"Iran"},{"holiday":false,"month":1,"day":4,"title":"روز جهانی بریل","type":"International"},{"holiday":false,"month":1,"day":24,"title":"روز جهانی آموزش","type":"International"},{"holiday":false,"month":2,"day":2,"title":"روز جهانی تالاب‌ها","type":"International"},{"holiday":false,"month":2,"day":4,"title":"روز جهانی سرطان","type":"International"},{"holiday":false,"month":2,"day":6,"title":"روز جهانی مبارزه با ناقص‌سازی زنان","type":"International"},{"holiday":false,"month":2,"day":10,"title":"روز جهانی حبوبات","type":"International"},{"holiday":false,"month":2,"day":11,"title":"روز جهانی زن و دختر در علم","type":"International"},{"holiday":false,"month":2,"day":13,"title":"روز جهانی رادیو","type":"International"},{"holiday":false,"month":2,"day":20,"title":"روز جهانی عدالت اجتماعی","type":"International"},{"holiday":false,"month":2,"day":21,"title":"روز جهانی زبان مادری","type":"International"},{"holiday":false,"month":3,"day":1,"title":"روز جهانی بدون تبعیض","type":"International"},{"holiday":false,"month":3,"day":3,"title":"روز جهانی حیات وحش","type":"International"},{"holiday":false,"month":3,"day":8,"title":"روز جهانی زن","type":"International"},{"holiday":false,"month":3,"day":20,"title":"روز جهانی شادی","type":"International"},{"holiday":false,"month":3,"day":21,"title":"روز جهانی شعر","type":"International"},{"holiday":false,"month":3,"day":21,"title":"روز جهانی سندروم داون","type":"International"},{"holiday":false,"month":3,"day":21,"title":"روز بین‌المللی جنگل‌ها","type":"International"},{"holiday":false,"month":3,"day":24,"title":"روز جهانی سل","type":"International"},{"holiday":false,"month":3,"day":24,"title":"روز بین‌المللی حق بر صحت و درستی دربارهٔ نقض فاحش حقوق بشر و منزلت قربانیان","type":"International"},{"holiday":false,"month":3,"day":25,"title":"روز بین‌المللی یادبود قربانیان بردگی و تجارت برده از آن سوی اقیانوس اطلس","type":"International"},{"holiday":false,"month":3,"day":27,"title":"روز جهانی تئاتر","type":"International"},{"holiday":false,"month":4,"day":2,"title":"روز جهانی کتاب کودک","type":"International"},{"holiday":false,"month":4,"day":7,"title":"روز جهانی کارتونیست‌ها","type":"International"},{"holiday":false,"month":4,"day":7,"title":"روز جهانی سلامت","type":"International"},{"holiday":false,"month":4,"day":15,"title":"روز جهانی هنر (سالروز تولد داوینچی)","type":"International"},{"holiday":false,"month":4,"day":19,"title":"روز جهانی کبد","type":"International"},{"holiday":false,"month":4,"day":22,"title":"روز جهانی زمین پاک","type":"International"},{"holiday":false,"month":4,"day":23,"title":"روز جهانی کتاب و حق مؤلف","type":"International"},{"holiday":false,"month":4,"day":25,"title":"روز جهانی مالاریا","type":"International"},{"holiday":false,"month":4,"day":27,"title":"روز جهانی گرافیک","type":"International"},{"holiday":false,"month":4,"day":28,"title":"روز جهانی ایمنی و بهداشت حرفه‌ای","type":"International"},{"holiday":false,"month":5,"day":3,"title":"روز جهانی آزادی مطبوعات","type":"International"},{"holiday":false,"month":5,"day":12,"title":"روز جهانی پرستار","type":"International"},{"holiday":false,"month":5,"day":12,"title":"روز جهانی زنان در ریاضیات","type":"International"},{"holiday":false,"month":5,"day":15,"title":"روز جهانی خانواده","type":"International"},{"holiday":false,"month":5,"day":16,"title":"روز جهانی پسران","type":"International"},{"holiday":false,"month":5,"day":20,"title":"روز جهانی زنبور","type":"International"},{"holiday":false,"month":5,"day":29,"title":"روز جهانی حافظان صلح ملل متحد","type":"International"},{"holiday":false,"month":6,"day":4,"title":"روز جهانی حمایت از کودکان قربانی خشونت","type":"International"},{"holiday":false,"month":6,"day":10,"title":"روز جهانی صنایع دستی","type":"International"},{"holiday":false,"month":6,"day":12,"title":"روز جهانی منع کار کودکان","type":"International"},{"holiday":false,"month":6,"day":14,"title":"روز جهانی اهدای خون","type":"International"},{"holiday":false,"month":6,"day":20,"title":"روز جهانی پناهندگان","type":"International"},{"holiday":false,"month":6,"day":21,"title":"روز جهانی موسیقی","type":"International"},{"holiday":false,"month":6,"day":26,"title":"روز جهانی قربانیان خشونت","type":"International"},{"holiday":false,"month":7,"day":11,"title":"روز جهانی جمعیت","type":"International"},{"holiday":false,"month":8,"day":12,"title":"روز جهانی جوانان","type":"International"},{"holiday":false,"month":8,"day":13,"title":"روز جهانی چپ‌دستان","type":"International"},{"holiday":false,"month":8,"day":19,"title":"روز جهانی انسان دوستی","type":"International"},{"holiday":false,"month":8,"day":19,"title":"روز جهانی عکاسی","type":"International"},{"holiday":false,"month":8,"day":29,"title":"روز جهانی مبارزه با آزمایش‌های هسته‌ای","type":"International"},{"holiday":false,"month":9,"day":8,"title":"روز جهانی باسوادی","type":"International"},{"holiday":false,"month":9,"day":10,"title":"روز جهانی جلوگیری از خودکشی","type":"International"},{"holiday":false,"month":9,"day":15,"title":"روز جهانی مردم‌سالاری","type":"International"},{"holiday":false,"month":9,"day":16,"title":"روز جهانی حفاظت از لایهٔ اُزن","type":"International"},{"holiday":false,"month":9,"day":21,"title":"روز جهانی آلزایمر","type":"International"},{"holiday":false,"month":9,"day":21,"title":"روز جهانی صلح","type":"International"},{"holiday":false,"month":9,"day":30,"title":"روز جهانی ترجمه","type":"International"},{"holiday":false,"month":10,"day":1,"title":"روز بین‌المللی قهوه","type":"International"},{"holiday":false,"month":10,"day":5,"title":"روز جهانی معلم","type":"International"},{"holiday":false,"month":10,"day":10,"title":"روز جهانی بهداشت روان","type":"International"},{"holiday":false,"month":10,"day":11,"title":"روز جهانی دختران","type":"International"},{"holiday":false,"month":10,"day":24,"title":"روز ملل متحد و روز جهانی توسعه اطلاعات","type":"International"},{"holiday":false,"month":10,"day":25,"title":"روز جهانی هنرمند","type":"International"},{"holiday":false,"month":10,"day":27,"title":"روز جهانی میراث سمعی و بصری","type":"International"},{"holiday":false,"month":10,"day":27,"title":"روز جهانی کاردرمانی","type":"International"},{"holiday":false,"month":10,"day":31,"title":"روز جهانی شهرها","type":"International"},{"holiday":false,"month":10,"day":31,"title":"جشن هالووین","type":"International"},{"holiday":false,"month":11,"day":6,"title":"روز بین‌المللی پیشگیری از سوء استفاده از محیط زیست در جنگ و مناقشات مسلحانه","type":"International"},{"holiday":false,"month":11,"day":10,"title":"روز جهانی حسابداری","type":"International"},{"holiday":false,"month":11,"day":14,"title":"روز جهانی دیابت","type":"International"},{"holiday":false,"month":11,"day":19,"title":"روز جهانی مرد","type":"International"},{"holiday":false,"month":11,"day":21,"title":"روز جهانی تلویزیون","type":"International"},{"holiday":false,"month":11,"day":25,"title":"روز جهانی مبارزه با خشونت علیه زنان","type":"International"},{"holiday":false,"month":11,"day":29,"title":"روز جهانی همبستگی با مردم فلسطین","type":"International"},{"holiday":false,"month":12,"day":2,"title":"روز جهانی لغو برده‌داری","type":"International"},{"holiday":false,"month":12,"day":5,"title":"روز جهانی داوطلبان پیشرفت اجتماعی","type":"International"},{"holiday":false,"month":12,"day":9,"title":"روز جهانی مبارزه با فساد","type":"International"},{"holiday":false,"month":12,"day":10,"title":"روز جهانی حقوق بشر","type":"International"},{"holiday":false,"month":12,"day":11,"title":"روز جهانی کوهستان","type":"International"}],"Nepali Calendar":[],"Irregular Recurring":[{"calendar":"Persian","rule":"nth weekday of month","nth":2,"weekday":7,"month":1,"type":"Afghanistan","title":"هفتهٔ جیولوجست‌های افغانستان (هفتهٔ دوم حمل)","holiday":false},{"calendar":"Persian","rule":"last weekday of month","weekday":7,"month":2,"type":"Afghanistan","title":"هفتهٔ کتاب‌خوانی (هفتهٔ اخیر ثور)","holiday":false},{"calendar":"Persian","rule":"nth weekday of month","nth":2,"weekday":6,"month":7,"type":"Iran","title":"آیین مذهبی قالیشویان اردهال - بزرگداشت امامزاده علی بن محمدباقر (ع) (دومین جمعهٔ مهر)","holiday":false},{"calendar":"Persian","rule":"single event","year":1401,"month":8,"day":3,"type":"Iran","title":"خورشیدگرفتگی جزئی قابل مشاهده در ایران","holiday":false},{"calendar":"Hijri","rule":"end of month","month":2,"type":"Iran","title":"شهادت حضرت امام رضا (ع) (۲۰۳ ه‍.ق) (۳۰ صَفَر یا انتهای ماه)","holiday":true},{"calendar":"Hijri","rule":"end of month","month":11,"type":"Iran","title":"شهادت حضرت امام محمد تقی (ع) (۲۲۰ ه‍.ق) (۳۰ ذی‌القعده یا انتهای ماه)","holiday":false},{"calendar":"Hijri","rule":"last weekday of month","weekday":6,"month":9,"type":"Iran","title":"روز جهانی قدس (آخرین جمعهٔ رمضان)","holiday":false},{"calendar":"Persian","rule":"last weekday of month","weekday":4,"offset":-1,"month":12,"type":"Iran","title":"روز تکریم همسایگان (شب آخرین چهارشنبهٔ سال)","holiday":false},{"calendar":"Persian","rule":"last weekday of month","weekday":3,"month":12,"type":"AncientIran","title":"چهارشنبه‌سوری (آخرین سه‌شنبهٔ سال)","holiday":false},{"calendar":"Gregorian","rule":"nth weekday of month","nth":3,"weekday":5,"month":11,"type":"International","title":"روز جهانی فلسفه (سومین پنجشنبهٔ نوامبر)","holiday":false},{"calendar":"Gregorian","rule":"last weekday of month","weekday":1,"month":1,"type":"International","title":"روز جهانی کمک به جذامیان (آخرین یکشنبهٔ ژانویه)","holiday":false},{"calendar":"Gregorian","rule":"last weekday of month","weekday":6,"month":11,"type":"International","title":"جمعهٔ سیاه یا بلک فرایدی (آخرین جمعهٔ نوامبر)","holiday":false},{"calendar":"Gregorian","rule":"nth day from","nth":256,"month":1,"day":1,"type":"International","title":"روز جهانی برنامه‌نویس (روز ۲۵۶م سال میلادی)","holiday":false}]}')
;// CONCATENATED MODULE: ./src/utils/hijri-utils.ts
/**
 * Utilities for converting between Hijri (Islamic) and Jalali (Persian) calendars
 *
 * This implementation uses the Umm al-Qura calendar system which is used in many
 * Islamic countries and is accurate for contemporary dates
 */
/**
 * Converts Hijri date to Gregorian date
 *
 * @param hy Hijri year
 * @param hm Hijri month (1-12)
 * @param hd Hijri day (1-30)
 * @returns Array [year, month, day] with Gregorian date
 */
function hijriToGregorian(hy, hm, hd) {
    // Ensure valid input
    if (hm < 1 || hm > 12 || hd < 1 || hd > 30) {
        throw new Error('Invalid Hijri date');
    }
    // Days since Hijri epoch (approximately July 19, 622 CE)
    // Algorithm based on Umm al-Qura calendar used in Saudi Arabia
    // Convert Hijri to days since Hijri epoch
    const epochDays = Math.floor((hy - 1) * 354.367) + // Average Hijri year is 354.367 days
        Math.floor((hm - 1) * 29.5) + // Average Hijri month is 29.5 days
        (hd - 1);
    // Convert to Gregorian date (Julian days + days since Hijri epoch + Gregorian epoch adjustment)
    const julianDays = epochDays + 1948439.5; // Adjustment for Hijri epoch in Julian days
    // Convert Julian days to Gregorian date
    return julianDaysToGregorian(julianDays);
}
/**
 * Converts Julian days to Gregorian date
 *
 * @param julianDays Julian day count
 * @returns Array [year, month, day] with Gregorian date
 */
function julianDaysToGregorian(julianDays) {
    const z = Math.floor(julianDays + 0.5);
    const a = Math.floor((z - 1867216.25) / 36524.25);
    const b = z + 1 + a - Math.floor(a / 4);
    const c = b + 1524;
    const d = Math.floor((c - 122.1) / 365.25);
    const e = Math.floor(365.25 * d);
    const f = Math.floor((c - e) / 30.6001);
    // Calculate day, month, and year
    const day = Math.floor(c - e - Math.floor(30.6001 * f));
    let month = f - 1 - 12 * Math.floor(f / 14);
    let year = d - 4715 - Math.floor((7 + month) / 10);
    // Convert to 1-based month
    if (month < 1) {
        month += 12;
        year -= 1;
    }
    return [year, month, day];
}
/**
 * Converts Gregorian date to Jalali (Persian) date
 *
 * @param gy Gregorian year
 * @param gm Gregorian month (1-12)
 * @param gd Gregorian day (1-31)
 * @returns Array [year, month, day] with Jalali date
 */
function gregorianToJalali(gy, gm, gd) {
    // Implementation based on jalali.js algorithm
    const g_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const j_days_in_month = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
    gy = parseInt(gy.toString());
    gm = parseInt(gm.toString());
    gd = parseInt(gd.toString());
    // Check if year is leap year and adjust February days
    const isLeapYear = (gy % 4 === 0 && gy % 100 !== 0) || (gy % 400 === 0);
    g_days_in_month[1] = isLeapYear ? 29 : 28;
    // Convert to days since Gregorian epoch
    let dayOfYear = gd;
    for (let i = 0; i < gm - 1; i++) {
        dayOfYear += g_days_in_month[i];
    }
    // Calculate Julian day number
    const jdn = Math.floor((gy + Math.floor((gm - 8) / 6) + 100100) * 1461 / 4)
        + Math.floor(((gm + 9) % 12 + 1) * 153 / 5)
        + gd - 34840408;
    const d = jdn % 1461;
    const jy = Math.floor(jdn / 1461) - 2820 + 474;
    // Calculate Jalali year
    const jYear = jy;
    // Calculate Jalali month and day
    let dayOfYearJalali = d;
    if (dayOfYearJalali >= 366) {
        dayOfYearJalali -= 366;
        const yearsToAdd = Math.floor(dayOfYearJalali / 365);
        dayOfYearJalali %= 365;
    }
    let jMonth = 0;
    let jDay = dayOfYearJalali;
    // Find month and day
    while (jDay >= j_days_in_month[jMonth]) {
        jDay -= j_days_in_month[jMonth];
        jMonth++;
    }
    return [jYear, jMonth + 1, jDay + 1];
}
/**
 * Converts Hijri date to Jalali date
 *
 * @param hy Hijri year
 * @param hm Hijri month (1-12)
 * @param hd Hijri day (1-30)
 * @returns Array [year, month, day] with Jalali date
 */
function hijriToJalali(hy, hm, hd) {
    // First convert to Gregorian
    const [gy, gm, gd] = hijriToGregorian(hy, hm, hd);
    // Then convert to Jalali
    return gregorianToJalali(gy, gm, gd);
}
/**
 * Calculates Jalali date for a Hijri event in the current Persian year
 *
 * @param currentPersianYear Current Jalali/Persian year
 * @param hijriMonth Hijri month (1-12)
 * @param hijriDay Hijri day (1-30)
 * @returns Array [month, day] with Jalali date or null if the event doesn't occur in the current year
 */
function getHijriEventDateInJalaliYear(currentPersianYear, hijriMonth, hijriDay) {
    // Get current date
    const today = new Date();
    // Approximate current Hijri year (this is rough approximation, might be off by 1 year)
    const currentHijriYear = Math.floor(currentPersianYear - 621.5 + 0.74 * (currentPersianYear - 621.5)) - 202;
    // Try current and next Hijri year (sometimes events span across Persian years)
    for (let yearOffset = 0; yearOffset <= 1; yearOffset++) {
        try {
            const hijriYear = currentHijriYear + yearOffset;
            // Get Jalali date for this Hijri event
            const [jYear, jMonth, jDay] = hijriToJalali(hijriYear, hijriMonth, hijriDay);
            // Check if the event falls in the requested Persian year
            if (jYear === currentPersianYear) {
                return [jMonth, jDay];
            }
        }
        catch (error) {
            // Skip any conversion errors and continue
            console.warn(`Error converting Hijri date (${currentHijriYear}, ${hijriMonth}, ${hijriDay})`, error);
        }
    }
    // Event doesn't occur in the current Persian year
    return null;
}
/**
 * Gets the estimated Hijri date (Islamic date) for today
 *
 * @returns An array of [year, month, day] for today's Hijri date
 */
function getCurrentHijriDate() {
    // Get today's Gregorian date
    const today = new Date();
    const gyear = today.getFullYear();
    const gmonth = today.getMonth() + 1;
    const gday = today.getDate();
    // Use approximate calculation based on mathematical estimation
    // (This isn't perfectly accurate but works for most contemporary dates)
    // Julian date calculation
    const jd = (1461 * (gyear + 4800 + (gmonth - 14) / 12)) / 4 +
        (367 * (gmonth - 2 - 12 * ((gmonth - 14) / 12))) / 12 -
        (3 * ((gyear + 4900 + (gmonth - 14) / 12) / 100)) / 4 +
        gday - 32075;
    // Hijri date calculation
    const l = Math.floor(jd) - 1948440 + 10632;
    const n = Math.floor((l - 1) / 10631);
    const l1 = l - 10631 * n + 354;
    const j = (Math.floor((10985 - l1) / 5316)) * (Math.floor((50 * l1) / 17719)) +
        (Math.floor(l1 / 5670)) * (Math.floor((43 * l1) / 15238));
    const l2 = l1 - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) -
        (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
    const hmonth = Math.floor((24 * l2) / 709);
    const hday = l2 - Math.floor((709 * hmonth) / 24);
    const hyear = 30 * n + j - 30;
    return [hyear, hmonth, hday];
}
/* ESM default export */ const hijri_utils = ({
    hijriToGregorian,
    gregorianToJalali,
    hijriToJalali,
    getHijriEventDateInJalaliYear,
    getCurrentHijriDate
});

;// CONCATENATED MODULE: ./src/utils/event-utils.ts
// Import the original JSON file from the Persian Calendar repo

// Import the Hijri utilities for date conversion


// Fallback events in case JSON loading fails
const fallbackEvents = [
    { title: 'عید نوروز', month: 1, day: 1, type: 'Iran', holiday: true },
    { title: 'روز طبیعت', month: 1, day: 13, type: 'Iran', holiday: true },
    { title: 'عید فطر', month: 4, day: 5, type: 'Religious', holiday: true },
    { title: 'عید قربان', month: 6, day: 10, type: 'Religious', holiday: true },
    { title: 'تاسوعا', month: 7, day: 9, type: 'Religious', holiday: true },
    { title: 'عاشورا', month: 7, day: 10, type: 'Religious', holiday: true },
];
/**
 * Maps events from the Persian Calendar repo format to our PersianEvent format
 */
function mapPersianCalendarEvents() {
    try {
        let allEvents = [];
        // Process Persian Calendar events
        if (events_namespaceObject && Array.isArray(events_namespaceObject["Persian Calendar"])) {
            const persianEvents = events_namespaceObject["Persian Calendar"].map((event) => ({
                title: event.title,
                month: event.month,
                day: event.day,
                type: event.type,
                holiday: event.holiday
            }));
            allEvents = [...persianEvents];
        }
        // Process Hijri Calendar events - Convert them to current Jalali year
        if (events_namespaceObject && Array.isArray(events_namespaceObject["Hijri Calendar"])) {
            // Get current Jalali year
            const today = new Date();
            const jalaliToday = PersianDate.gregorianToJalali(today.getFullYear(), today.getMonth() + 1, today.getDate());
            const currentJalaliYear = jalaliToday[0];
            // Process each Hijri event
            const hijriEvents = [];
            events_namespaceObject["Hijri Calendar"].forEach((event) => {
                // Convert Hijri date to Jalali for current year
                const jalaliDate = hijri_utils.getHijriEventDateInJalaliYear(currentJalaliYear, event.month, event.day);
                // Only add the event if it occurs in the current Jalali year
                if (jalaliDate) {
                    const [jMonth, jDay] = jalaliDate;
                    hijriEvents.push({
                        title: event.title,
                        month: jMonth,
                        day: jDay,
                        type: event.type,
                        holiday: event.holiday,
                        // Add original Hijri date for reference
                        originalHijriMonth: event.month,
                        originalHijriDay: event.day
                    });
                }
            });
            // Add converted Hijri events to all events
            allEvents = [...allEvents, ...hijriEvents];
        }
        if (allEvents.length === 0) {
            console.warn('Persian Calendar data not found in expected format, using fallback events');
            return fallbackEvents;
        }
        return allEvents;
    }
    catch (error) {
        console.error('Error mapping Persian Calendar events:', error);
        return fallbackEvents;
    }
}
// Cache the mapped events to avoid reprocessing on every call
const mappedEvents = mapPersianCalendarEvents();
/**
 * Event utilities for working with Persian calendar events
 */
const EventUtils = {
    /**
     * Returns all Persian calendar events mapped from the original JSON data
     * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Religious'])
     * @param includeAllTypes If true, includes all event types regardless of filtering
     */
    getAllEvents(eventTypes, includeAllTypes = false) {
        let filteredEvents = [...mappedEvents];
        // If specific event types are provided and we're not including all types, filter by those types
        if (eventTypes && eventTypes.length > 0 && !includeAllTypes) {
            filteredEvents = filteredEvents.filter(event => eventTypes.includes(event.type));
        }
        return filteredEvents;
    },
    /**
     * Returns all events for a given month and day
     * @param month The month number (1-12)
     * @param day The day number (1-31)
     * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Religious'])
     * @param includeAllTypes If true, includes all event types regardless of filtering
     */
    getEvents(month, day, eventTypes, includeAllTypes = false) {
        const events = this.getAllEvents(eventTypes, includeAllTypes);
        return events.filter(event => event.month === month &&
            event.day === day);
    },
    /**
     * Checks if the specified date is a holiday
     * @param month The month number (1-12)
     * @param day The day number (1-31)
     * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Religious'])
     * @param includeAllTypes If true, includes all event types regardless of filtering
     */
    isHoliday(month, day, eventTypes, includeAllTypes = false) {
        const events = this.getEvents(month, day, eventTypes, includeAllTypes);
        return events.some(event => event.holiday === true);
    },
    /**
     * Gets holiday event titles for a specific date
     * @param month The month number (1-12)
     * @param day The day number (1-31)
     * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Religious'])
     * @param includeAllTypes If true, includes all event types regardless of filtering
     */
    getHolidayTitles(month, day, eventTypes, includeAllTypes = false) {
        const events = this.getEvents(month, day, eventTypes, includeAllTypes);
        return events
            .filter(event => event.holiday === true)
            .map(event => event.title);
    },
    /**
     * Gets all event titles for a specific date
     * @param month The month number (1-12)
     * @param day The day number (1-31)
     * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Religious'])
     * @param includeAllTypes If true, includes all event types regardless of filtering
     */
    getAllEventTitles(month, day, eventTypes, includeAllTypes = false) {
        const events = this.getEvents(month, day, eventTypes, includeAllTypes);
        return events.map(event => event.title);
    },
    /**
     * Gets events of a specific type
     * @param type The event type (e.g., 'Iran', 'Religious')
     * @param includeAllTypes If true, includes all event types
     * @param holidaysOnly If true, only returns holiday events
     */
    getEventsByType(type, includeAllTypes = false, holidaysOnly = false) {
        const events = includeAllTypes
            ? mappedEvents
            : mappedEvents.filter(event => event.type === type);
        return holidaysOnly
            ? events.filter(event => event.holiday === true)
            : events;
    },
    /**
     * Get all holidays
     * @param eventTypes Optional array of event types to filter by (e.g., ['Iran', 'Religious'])
     * @param includeAllTypes If true, includes all event types regardless of filtering
     */
    getAllHolidays(eventTypes, includeAllTypes = false) {
        const events = this.getAllEvents(eventTypes, includeAllTypes);
        return events.filter(event => event.holiday === true);
    },
    /**
     * Get available event types
     */
    getEventTypes() {
        const types = new Set();
        mappedEvents.forEach(event => types.add(event.type));
        return Array.from(types);
    },
    /**
     * Get the source data metadata
     */
    getSourceMetadata() {
        return events_namespaceObject.Source || {};
    },
    /**
     * Refresh the events data to update Hijri calendar events for the current year
     * This should be called when the component is initialized or the year changes
     */
    refreshEvents() {
        // Recalculate all events (especially Hijri events for current year)
        const refreshedEvents = mapPersianCalendarEvents();
        // Replace the cached events with the new ones
        while (mappedEvents.length > 0) {
            mappedEvents.pop();
        }
        refreshedEvents.forEach(event => mappedEvents.push(event));
        return [...mappedEvents];
    }
};
/* ESM default export */ const event_utils = (EventUtils);

;// CONCATENATED MODULE: ./src/persian-datepicker-element.ts


// Import the CSS as a string
const styles = `:host {
  /* Color scheme */
  --jdp-primary: #0891b2;
  --jdp-primary-hover: #0e7490;
  --jdp-primary-foreground: #ffffff;
  
  /* Neutral colors */
  --jdp-background: #ffffff;
  --jdp-foreground: #1e293b;
  --jdp-muted: #f1f5f9;
  --jdp-muted-foreground: #64748b;
  --jdp-border: #e2e8f0;
  --jdp-ring: #0284c7;
  
  /* Holiday colors */
  --jdp-holiday-color: #ef4444;
  --jdp-holiday-bg: #fee2e2;
  --jdp-holiday-hover-bg: #fecaca;
  
  /* Typography */
  --jdp-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --jdp-font-size: 14px;
  --jdp-line-height: 1.5;
  --jdp-font-weight: 400;
  --jdp-font-weight-medium: 500;
  
  /* Day name typography */
  --jdp-day-name-font-size: 12px;
  --jdp-day-name-font-weight: 400;
  
  /* Day cell typography */
  --jdp-day-font-size: 13px;
  --jdp-day-font-weight: 400;
  
  /* Month year typography */
  --jdp-month-year-font-size: 14px;
  --jdp-month-year-font-weight: 500;
  
  /* Spacing */
  --jdp-spacing-xs: 4px;
  --jdp-spacing-sm: 8px;
  --jdp-spacing-md: 16px;
  --jdp-spacing-lg: 24px;
  
  /* Input field */
  --jdp-input-padding-x: 14px;
  --jdp-input-padding-y: 10px;
  --jdp-input-border-width: 1px;
  --jdp-input-border-color: var(--jdp-border);
  --jdp-input-border-radius: var(--jdp-border-radius);
  --jdp-input-focus-ring-width: 2px;
  --jdp-input-focus-ring-color: rgba(2, 132, 199, 0.25);
  
  /* Calendar popup */
  --jdp-calendar-width: 280px;
  --jdp-calendar-padding: var(--jdp-spacing-md);
  --jdp-calendar-border-width: 1px;
  --jdp-calendar-border-color: var(--jdp-border);
  --jdp-calendar-border-radius: var(--jdp-border-radius);
  --jdp-calendar-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  --jdp-calendar-z-index: 10;
  
  /* Navigation buttons */
  --jdp-nav-button-size: 30px;
  --jdp-nav-button-bg: var(--jdp-muted);
  --jdp-nav-button-bg-hover: var(--jdp-border);
  --jdp-nav-button-border-radius: var(--jdp-border-radius);
  --jdp-nav-arrow-size: 8px;
  --jdp-nav-arrow-thickness: 2px;
  --jdp-nav-arrow-color: var(--jdp-foreground);
  
  /* Day grid */
  --jdp-day-cell-size: 32px;
  --jdp-day-cell-margin: 1px;
  --jdp-day-cell-border-radius: var(--jdp-border-radius);
  
  /* States */
  --jdp-day-hover-bg: var(--jdp-muted);
  --jdp-day-selected-bg: var(--jdp-primary);
  --jdp-day-selected-color: var(--jdp-primary-foreground);
  --jdp-day-today-border-color: var(--jdp-primary);
  --jdp-day-today-border-width: 1px;
  --jdp-day-disabled-opacity: 0.4;
  
  /* Animations */
  --jdp-transition-duration: 0.2s;
  --jdp-fade-from-y: -4px;
  --jdp-fade-from-y-reverse: 4px;
  --jdp-month-transition-duration: 0.3s;
  
  /* Layout */
  --jdp-border-radius: 0.5rem;
  --jdp-direction: rtl;
}

* {
  box-sizing: border-box;
  direction: var(--jdp-direction);
}

.picker-container {
  position: relative;
  display: inline-block;
  width: 100%;
  font-family: var(--jdp-font-family);
  font-size: var(--jdp-font-size);
  line-height: var(--jdp-line-height);
  font-weight: var(--jdp-font-weight);
}

input {
  width: 100%;
  padding: var(--jdp-input-padding-y) var(--jdp-input-padding-x);
  border-radius: var(--jdp-input-border-radius);
  border: var(--jdp-input-border-width) solid var(--jdp-input-border-color);
  font-size: var(--jdp-font-size);
  line-height: var(--jdp-line-height);
  font-family: inherit;
  background-color: var(--jdp-background);
  color: var(--jdp-foreground);
  cursor: pointer;
  outline: none;
  transition: all var(--jdp-transition-duration) ease;
  text-align: right;
}

input:focus {
  border-color: var(--jdp-ring);
  box-shadow: 0 0 0 var(--jdp-input-focus-ring-width) var(--jdp-input-focus-ring-color);
}

.calendar {
  display: none;
  position: absolute;
  right: 0;
  width: var(--jdp-calendar-width);
  background: var(--jdp-background);
  border: var(--jdp-calendar-border-width) solid var(--jdp-calendar-border-color);
  border-radius: var(--jdp-calendar-border-radius);
  box-shadow: var(--jdp-calendar-shadow);
  padding: var(--jdp-calendar-padding);
  text-align: center;
  z-index: var(--jdp-calendar-z-index);
  touch-action: manipulation; /* Allow pan-y but prevent browser handling of horizontal swipes */
  -webkit-overflow-scrolling: none; /* Prevent iOS scrolling */
  -webkit-user-select: none; /* Prevent text selection during swipe */
  user-select: none;
  transform: translateZ(0); /* Hardware acceleration */
  will-change: transform; /* Hint to browser */
  backface-visibility: hidden; /* Prevent flickering */
  contain: layout style; /* Improve performance by isolating the container */
}

.calendar.position-bottom {
  top: calc(100% + 5px);
  animation: fadeInFromTop var(--jdp-transition-duration) ease;
}

.calendar.position-top {
  bottom: calc(100% + 5px);
  animation: fadeInFromBottom var(--jdp-transition-duration) ease;
}

.calendar.visible {
  display: block;
}

@keyframes fadeInFromTop {
  from { opacity: 0; transform: translateY(var(--jdp-fade-from-y)); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInFromBottom {
  from { opacity: 0; transform: translateY(var(--jdp-fade-from-y-reverse)); }
  to { opacity: 1; transform: translateY(0); }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--jdp-spacing-md);
}

.month-year {
  font-weight: var(--jdp-month-year-font-weight);
  font-size: var(--jdp-month-year-font-size);
  color: var(--jdp-foreground);
  transition: opacity var(--jdp-transition-duration) ease;
}

.month-year.fade {
  opacity: 0;
}

.days-wrapper {
  position: relative;
  touch-action: pan-y; /* Allow vertical scrolling but handle horizontal ourselves */
  overflow: visible; /* Allow event tooltips to be visible outside the container */
  z-index: 1; /* Ensure tooltips are visible above other elements */
  contain: layout; /* Improve performance */
  isolation: isolate; /* Create new stacking context */
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  transition: transform var(--jdp-month-transition-duration) ease, opacity var(--jdp-month-transition-duration) ease;
  will-change: transform, opacity; /* Hint to browser */
  transform: translateZ(0); /* Hardware acceleration */
  backface-visibility: hidden; /* Prevent flickering */
  position: relative; /* Position for correct animation */
  contain: layout; /* Improve performance */
}

.days.slide-left, .days.slide-right {
  /* Keep animation isolated within container without cutting off tooltips */
  isolation: isolate;
}

.days.slide-left {
  animation: slideInLeft var(--jdp-month-transition-duration) ease;
}

.days.slide-right {
  animation: slideInRight var(--jdp-month-transition-duration) ease;
}

@keyframes slideInLeft {
  from { 
    opacity: 0; 
    transform: translateX(-10%) translateZ(0);
    pointer-events: none; /* Don't capture events during animation */ 
  }
  to { 
    opacity: 1; 
    transform: translateX(0) translateZ(0);
    pointer-events: auto; /* Restore events after animation */  
  }
}

@keyframes slideInRight {
  from { 
    opacity: 0; 
    transform: translateX(10%) translateZ(0); 
    pointer-events: none; /* Don't capture events during animation */
  }
  to { 
    opacity: 1; 
    transform: translateX(0) translateZ(0);
    pointer-events: auto; /* Restore events after animation */ 
  }
}

/* Ensure tooltips stay visible even during animations */
.day {
  position: relative; /* Required for tooltip positioning */
  z-index: 1; /* Base z-index */
  touch-action: manipulation; /* Improve touch behavior */
  isolation: isolate; /* Create new stacking context for each day */
}

.day:hover {
  z-index: 2; /* Raise z-index on hover to keep tooltip on top */
}

.nav-button {
  background: var(--jdp-nav-button-bg);
  border: none;
  border-radius: var(--jdp-nav-button-border-radius);
  width: var(--jdp-nav-button-size);
  height: var(--jdp-nav-button-size);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--jdp-transition-duration) ease;
  position: relative;
  touch-action: manipulation; /* Improve touch behavior */
  will-change: transform, background-color; /* Optimize navigation button animations */
}

.nav-button:hover {
  background: var(--jdp-nav-button-bg-hover);
}

.nav-button:active {
  transform: translateY(1px);
}

.nav-button::before {
  content: '';
  display: block;
  width: var(--jdp-nav-arrow-size);
  height: var(--jdp-nav-arrow-size);
  border-top: var(--jdp-nav-arrow-thickness) solid var(--jdp-nav-arrow-color);
  border-right: var(--jdp-nav-arrow-thickness) solid var(--jdp-nav-arrow-color);
  position: absolute;
}

.nav-button.prev::before {
  transform: rotate(45deg);
  right: 11px;
  left: auto;
}

.nav-button.next::before {
  transform: rotate(225deg);
  left: 11px;
  right: auto;
}

.day-names {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: var(--jdp-spacing-sm);
}

.day-name {
  font-size: var(--jdp-day-name-font-size);
  font-weight: var(--jdp-day-name-font-weight);
  color: var(--jdp-muted-foreground);
  padding: var(--jdp-spacing-xs) 0;
  text-align: center;
}

.day {
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--jdp-day-cell-border-radius);
  font-size: var(--jdp-day-font-size);
  font-weight: var(--jdp-day-font-weight);
  cursor: pointer;
  transition: var(--jdp-transition-duration) ease;
  margin: var(--jdp-day-cell-margin);
  position: relative;
  touch-action: manipulation; /* Add touch action manipulation */
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight color on mobile */
  -webkit-user-select: none; /* Prevent text selection */
  user-select: none;
}

.day:hover:not(.empty):not(.disabled) {
  background: var(--jdp-day-hover-bg);
}

.day.selected {
  background: var(--jdp-day-selected-bg);
  color: var(--jdp-day-selected-color);
}

.day.today:not(.selected) {
  border: var(--jdp-day-today-border-width) solid var(--jdp-day-today-border-color);
}

.day.empty {
  cursor: default;
}

.day.disabled {
  opacity: var(--jdp-day-disabled-opacity);
  cursor: not-allowed;
}

/* Holiday styles */
.day.holiday:not(.selected) {
  color: var(--jdp-holiday-color);
  background-color: var(--jdp-holiday-bg);
  font-weight: var(--jdp-font-weight-medium);
}

.day.holiday:hover:not(.selected):not(.disabled) {
  background-color: var(--jdp-holiday-hover-bg);
}

.day.friday {
  color: var(--jdp-holiday-color);
}

.event-tooltip {
  position: absolute;
  background: var(--jdp-background);
  border: 1px solid var(--jdp-border);
  border-radius: var(--jdp-border-radius);
  padding: var(--jdp-spacing-sm);
  width: 200px;
  box-shadow: var(--jdp-calendar-shadow);
  text-align: right;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--jdp-transition-duration) ease, visibility var(--jdp-transition-duration) ease;
  pointer-events: none;
  bottom: 120%;
  right: 0;
  transform: translateY(-5px);
  z-index: 9999; /* Increased z-index to ensure it's always on top */
}

.event-tooltip.tooltip-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  background: var(--jdp-background);
}

/* Mobile-specific tooltip positioning */
@media (max-width: 768px) {
  .event-tooltip {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 300px;
    max-height: 80vh;
    overflow-y: auto;
    bottom: auto;
    right: auto;
    background: var(--jdp-background);
    z-index: 9999; /* Ensure high z-index on mobile too */
  }

  /* Add a semi-transparent overlay behind the tooltip */
  .event-tooltip::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }

  /* Style the close button */
  .tooltip-close-button {
    margin-top: 8px;
    padding: 6px 12px;
    background: var(--jdp-muted);
    border: 1px solid var(--jdp-border);
    border-radius: var(--jdp-border-radius);
    font-size: 12px;
    width: 100%;
    text-align: center;
    cursor: pointer;
    color: var(--jdp-foreground);
    transition: all var(--jdp-transition-duration) ease;
  }

  .tooltip-close-button:hover {
    background: var(--jdp-nav-button-bg-hover);
  }

  .tooltip-close-button:active {
    transform: translateY(1px);
  }
}

.event-item {
  margin-bottom: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--jdp-border);
  color: var(--jdp-foreground);
  background: var(--jdp-background); /* Ensure event items have white background */
}

.event-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.event-item.holiday {
  color: var(--jdp-holiday-color);
}

.event-type-label {
  display: inline-block;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 3px;
  margin-right: 4px;
  background-color: var(--jdp-muted);
  color: var(--jdp-muted-foreground);
}

/* Today button styling */
.footer {
  margin-top: var(--jdp-spacing-md);
  display: flex;
  justify-content: space-between;
}

.date-nav-button {
  background: var(--jdp-muted);
  border: none;
  border-radius: var(--jdp-border-radius);
  padding: var(--jdp-spacing-xs) var(--jdp-spacing-md);
  font-family: inherit;
  font-size: var(--jdp-font-size);
  color: var(--jdp-foreground);
  cursor: pointer;
  transition: all var(--jdp-transition-duration) ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.date-nav-button:hover {
  background: var(--jdp-nav-button-bg-hover);
}

.date-nav-button:active {
  transform: translateY(1px);
}

.today-button {
  /* Inherits from date-nav-button */
}

.tomorrow-button {
  /* Inherits from date-nav-button */
}

/* Month/Year selectors */
.selectors-container {
  display: flex;
  gap: var(--jdp-spacing-xs);
}

.date-select {
  background-color: var(--jdp-muted);
  border: none;
  border-radius: var(--jdp-border-radius);
  color: var(--jdp-foreground);
  font-family: inherit;
  font-size: var(--jdp-font-size);
  padding: var(--jdp-spacing-xs) var(--jdp-spacing-sm);
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='6' fill='none'%3E%3Cpath fill='%2364748b' d='M0 0h12L6 6z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left 8px center;
  padding-left: 24px;
  text-align: center;
  transition: background-color var(--jdp-transition-duration) ease;
}

.date-select:hover {
  background-color: var(--jdp-nav-button-bg-hover);
}

.month-select {
  width: 100px;
}

.year-select {
  width: 70px;
}

/* RTL specific styles for selectors */
:host([rtl="true"]) .date-select,
:host([dir="rtl"]) .date-select {
  background-position: right 8px center;
  padding-right: 24px;
  padding-left: var(--jdp-spacing-sm);
}
`;
/**
 * Default holiday types to show in the datepicker
 */
const DEFAULT_HOLIDAY_TYPES = ['Iran', 'Religious'];
/**
 * Jalali Date Picker Web Component
 *
 * A customizable date picker that follows the Jalali (Persian) calendar.
 * Features include:
 * - Month and year dropdown navigation with 150-year range
 * - Quick today and tomorrow navigation buttons
 * - Touch gesture support for swiping between months
 * - Holiday highlighting with customizable types
 * - Full RTL support
 * - Customizable styling
 *
 * Usage:
 * ```html
 * <!-- Basic usage -->
 * <persian-datepicker-element></persian-datepicker-element>
 *
 * <!-- With attributes -->
 * <persian-datepicker-element placeholder="انتخاب تاریخ" format="YYYY/MM/DD"></persian-datepicker-element>
 *
 * <!-- With holiday types -->
 * <persian-datepicker-element holiday-types="Iran,Religious"></persian-datepicker-element>
 *
 * <!-- With all holiday types -->
 * <persian-datepicker-element holiday-types="all"></persian-datepicker-element>
 *
 * <!-- With custom Today button text -->
 * <persian-datepicker-element today-button-text="Go to Today"></persian-datepicker-element>
 *
 * <!-- With custom Tomorrow button text -->
 * <persian-datepicker-element tomorrow-button-text="Next Day"></persian-datepicker-element>
 *
 * <!-- With custom button styling -->
 * <persian-datepicker-element today-button-class="primary rounded" tomorrow-button-class="secondary rounded"></persian-datepicker-element>
 *
 * <!-- With styling customization -->
 * <persian-datepicker-element style="--jdp-primary: #3b82f6; --jdp-font-family: 'Vazir', sans-serif;"></persian-datepicker-element>
 * ```
 *
 * @element persian-datepicker-element
 *
 * @attr {string} placeholder - Placeholder text for the input field
 * @attr {string} format - Date format (e.g., "YYYY/MM/DD")
 * @attr {boolean} rtl - Whether to use RTL direction
 * @attr {boolean} show-holidays - Whether to highlight holidays
 * @attr {string} holiday-types - Comma-separated list of holiday types to display
 * @attr {string} today-button-text - Custom text for the Today button (default: "امروز")
 * @attr {string} today-button-class - Additional CSS classes for the Today button
 * @attr {string} tomorrow-button-text - Custom text for the Tomorrow button (default: "فردا")
 * @attr {string} tomorrow-button-class - Additional CSS classes for the Tomorrow button
 * @attr {string} primary-color - Primary color for selected dates
 * @attr {string} primary-hover - Hover color for interactive elements
 * @attr {string} background-color - Background color for the calendar
 * @attr {string} foreground-color - Text color
 * @attr {string} border-color - Border color
 * @attr {string} border-radius - Border radius for rounded corners
 * @attr {string} font-family - Font family
 * @attr {string} holiday-color - Text color for holidays
 * @attr {string} holiday-bg - Background color for holidays
 */
class PersianDatePickerElement extends HTMLElement {
    static get observedAttributes() {
        return [
            'placeholder',
            'rtl',
            'format',
            'show-holidays',
            'holiday-types',
            'today-button-text',
            'today-button-class',
            'tomorrow-button-text',
            'tomorrow-button-class',
            // CSS variable attributes
            'primary-color',
            'primary-hover',
            'background-color',
            'foreground-color',
            'border-color',
            'border-radius',
            'font-family',
            'holiday-color',
            'holiday-bg'
        ];
    }
    constructor(options = {}) {
        super();
        this.showHolidays = true;
        this.holidayTypes = [...DEFAULT_HOLIDAY_TYPES];
        this.includeAllTypes = false;
        this.isTransitioning = false;
        this.cachedEvents = new Map(); // Cache for event data
        this.options = options;
        const shadow = this.attachShadow({ mode: "open" });
        // Create the component's HTML structure
        this.render(shadow);
        // Apply any custom CSS variables provided in options
        if (options.cssVariables) {
            this.applyCustomCssVariables(options.cssVariables);
        }
        // Set holiday types if provided in options
        if (options.holidayTypes) {
            this.setHolidayTypes(options.holidayTypes);
        }
        // Get DOM references
        this.input = shadow.getElementById("date-input");
        this.calendar = shadow.getElementById("calendar");
        this.monthYearLabel = shadow.getElementById("month-select");
        this.daysContainer = shadow.getElementById("days-container");
        this.dayNamesContainer = shadow.getElementById("day-names");
        // Setup month and year selectors
        this.setupMonthYearSelectors();
        // Initialize the day names (Saturday to Friday in Persian)
        const dayNames = ["ش", "ی", "د", "س", "چ", "پ", "ج"];
        dayNames.forEach(name => {
            const dayNameEl = document.createElement("div");
            dayNameEl.classList.add("day-name");
            dayNameEl.textContent = name;
            this.dayNamesContainer.appendChild(dayNameEl);
        });
        // Get today's Jalali date
        const today = new Date();
        const jalaliToday = PersianDate.gregorianToJalali(today.getFullYear(), today.getMonth() + 1, today.getDate());
        this.jalaliYear = jalaliToday[0];
        this.jalaliMonth = jalaliToday[1];
        this.jalaliDay = jalaliToday[2];
        this.selectedDate = null;
        // Refresh events to ensure Hijri events are mapped to correct Jalali dates
        EventUtils.refreshEvents();
        // Set placeholder if provided in options
        if (this.options.placeholder) {
            this.input.placeholder = this.options.placeholder;
        }
        // Event listeners
        this.input.addEventListener("click", () => this.toggleCalendar());
        shadow.getElementById("prev-month").addEventListener("click", () => this.changeMonth(-1));
        shadow.getElementById("next-month").addEventListener("click", () => this.changeMonth(1));
        shadow.getElementById("today-button").addEventListener("click", () => this.goToToday());
        shadow.getElementById("tomorrow-button").addEventListener("click", () => this.goToTomorrow());
        // Add event listeners for month and year select dropdowns
        const monthSelect = shadow.getElementById("month-select");
        const yearSelect = shadow.getElementById("year-select");
        monthSelect.addEventListener("change", () => {
            this.jalaliMonth = parseInt(monthSelect.value);
            this.renderCalendar();
        });
        yearSelect.addEventListener("change", () => {
            const previousYear = this.jalaliYear;
            this.jalaliYear = parseInt(yearSelect.value);
            // If the year has changed, refresh the Hijri events
            if (previousYear !== this.jalaliYear) {
                EventUtils.refreshEvents();
            }
            this.renderCalendar();
        });
        // Close calendar when clicking outside
        document.addEventListener("click", (e) => {
            if (!e.composedPath().includes(this) && this.calendar.classList.contains("visible")) {
                this.toggleCalendar();
            }
        });
        // Touch swipe gestures for calendar navigation
        this.initTouchGestures();
        this.renderCalendar();
    }
    /**
     * Apply custom CSS variables to the component
     */
    applyCustomCssVariables(variables) {
        if (!variables)
            return;
        Object.entries(variables).forEach(([key, value]) => {
            this.style.setProperty(key, String(value));
        });
    }
    /**
     * Sets the holiday types to be displayed
     * @param types Holiday types as a string (comma-separated) or an array of strings
     */
    setHolidayTypes(types) {
        if (typeof types === 'string') {
            // Special case for "all" which includes all types
            if (types.toLowerCase() === 'all') {
                this.includeAllTypes = true;
                this.holidayTypes = [...EventUtils.getEventTypes()]; // Get all available types
                return;
            }
            // Parse comma-separated values
            this.holidayTypes = types.split(',').map(t => t.trim()).filter(Boolean);
        }
        else if (Array.isArray(types)) {
            this.holidayTypes = [...types];
        }
        else {
            this.holidayTypes = [...DEFAULT_HOLIDAY_TYPES];
        }
        // Set includeAllTypes to false by default
        this.includeAllTypes = false;
        // If the calendar is already rendered, update it
        if (this.calendar) {
            this.renderCalendar();
        }
    }
    /**
     * Gets the current holiday types being displayed
     */
    getHolidayTypes() {
        return [...this.holidayTypes];
    }
    /**
     * Checks if all types (including excluded ones) are being shown
     */
    isShowingAllTypes() {
        return this.includeAllTypes;
    }
    // Handle attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue)
            return;
        // Map of attribute names to CSS variable names
        const cssVarMap = {
            'primary-color': '--jdp-primary',
            'primary-hover': '--jdp-primary-hover',
            'background-color': '--jdp-background',
            'foreground-color': '--jdp-foreground',
            'border-color': '--jdp-border',
            'border-radius': '--jdp-border-radius',
            'font-family': '--jdp-font-family',
            'holiday-color': '--jdp-holiday-color',
            'holiday-bg': '--jdp-holiday-bg'
        };
        switch (name) {
            case 'placeholder':
                if (this.input)
                    this.input.placeholder = newValue;
                break;
            case 'rtl':
                if (this.shadowRoot) {
                    const rtl = newValue !== null && newValue !== 'false';
                    // Type cast 'this' to HTMLElement to access style property
                    this.style.setProperty('--jdp-direction', rtl ? 'rtl' : 'ltr');
                }
                break;
            case 'show-holidays':
                this.showHolidays = newValue !== null && newValue !== 'false';
                if (this.calendar) {
                    this.renderCalendar();
                }
                break;
            case 'holiday-types':
                if (newValue) {
                    this.setHolidayTypes(newValue);
                }
                else {
                    this.holidayTypes = [...DEFAULT_HOLIDAY_TYPES];
                    this.includeAllTypes = false;
                }
                if (this.calendar) {
                    this.renderCalendar();
                }
                break;
            case 'today-button-text':
                // Update Today button text if it exists
                if (this.shadowRoot) {
                    const todayButton = this.shadowRoot.getElementById('today-button');
                    if (todayButton) {
                        todayButton.textContent = newValue || 'امروز';
                    }
                }
                break;
            case 'today-button-class':
                // Update Today button class if it exists
                if (this.shadowRoot) {
                    const todayButton = this.shadowRoot.getElementById('today-button');
                    if (todayButton) {
                        // Remove all classes except the base today-button class
                        todayButton.className = 'today-button';
                        // Add new classes if provided
                        if (newValue) {
                            newValue.split(' ').forEach(className => {
                                if (className.trim()) {
                                    todayButton.classList.add(className.trim());
                                }
                            });
                        }
                    }
                }
                break;
            case 'tomorrow-button-text':
                // Update Tomorrow button text if it exists
                if (this.shadowRoot) {
                    const tomorrowButton = this.shadowRoot.getElementById('tomorrow-button');
                    if (tomorrowButton) {
                        tomorrowButton.textContent = newValue || 'فردا';
                    }
                }
                break;
            case 'tomorrow-button-class':
                // Update Tomorrow button class if it exists
                if (this.shadowRoot) {
                    const tomorrowButton = this.shadowRoot.getElementById('tomorrow-button');
                    if (tomorrowButton) {
                        // Remove all classes except the base tomorrow-button class
                        tomorrowButton.className = 'tomorrow-button';
                        // Add new classes if provided
                        if (newValue) {
                            newValue.split(' ').forEach(className => {
                                if (className.trim()) {
                                    tomorrowButton.classList.add(className.trim());
                                }
                            });
                        }
                    }
                }
                break;
            default:
                // Handle CSS variable attributes
                if (cssVarMap[name] && this.shadowRoot) {
                    // Type cast 'this' to HTMLElement to access style property
                    this.style.setProperty(cssVarMap[name], newValue);
                }
                break;
        }
    }
    render(shadow) {
        // Get today button text from attribute or use default "امروز"
        const todayButtonText = this.getAttribute('today-button-text') || 'امروز';
        // Get any additional classes for the today button
        const todayButtonClass = this.getAttribute('today-button-class') || '';
        // Get tomorrow button text from attribute or use default "فردا"
        const tomorrowButtonText = this.getAttribute('tomorrow-button-text') || 'فردا';
        // Get any additional classes for the tomorrow button
        const tomorrowButtonClass = this.getAttribute('tomorrow-button-class') || '';
        shadow.innerHTML = `
      <style>${styles}</style>
      <div class="picker-container">
        <input type="text" id="date-input" readonly placeholder="انتخاب تاریخ">
        <div class="calendar" id="calendar">
          <div class="header">
            <button id="prev-month" type="button" class="nav-button prev"></button>
            <div class="selectors-container">
              <select id="month-select" class="date-select month-select"></select>
              <select id="year-select" class="date-select year-select"></select>
            </div>
            <button id="next-month" type="button" class="nav-button next"></button>
          </div>
          <div class="day-names" id="day-names"></div>
          <div class="days-wrapper">
          <div class="days" id="days-container"></div>
          </div>
          <div class="footer">
            <button id="today-button" type="button" class="date-nav-button today-button ${todayButtonClass}">${todayButtonText}</button>
            <button id="tomorrow-button" type="button" class="date-nav-button tomorrow-button ${tomorrowButtonClass}">${tomorrowButtonText}</button>
          </div>
        </div>
      </div>
    `;
    }
    toggleCalendar() {
        if (this.calendar.classList.contains("visible")) {
            // Hide calendar
            this.calendar.classList.remove("visible", "position-bottom", "position-top");
        }
        else {
            // Show calendar with position calculation
            this.positionCalendar();
            this.calendar.classList.add("visible");
        }
    }
    /**
     * Calculate and set the optimal position for the calendar
     */
    positionCalendar() {
        // Reset position classes
        this.calendar.classList.remove("position-bottom", "position-top");
        // Get measurements without causing reflow
        const inputRect = this.input.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        // Default to position-bottom (most common)
        this.calendar.classList.add("position-bottom");
        // Set display block but with visibility hidden to measure without showing
        const originalVisibility = this.calendar.style.visibility;
        const originalDisplay = this.calendar.style.display;
        this.calendar.style.visibility = 'hidden';
        this.calendar.style.display = 'block';
        // Now we can measure once display is set
        const calendarHeight = this.calendar.offsetHeight;
        // Check if there's enough space below
        const spaceBelow = windowHeight - inputRect.bottom;
        if (spaceBelow < calendarHeight) {
            // Not enough space below, check if there's more space above
            const spaceAbove = inputRect.top;
            if (spaceAbove > spaceBelow || spaceAbove >= calendarHeight) {
                // Switch to position-top
                this.calendar.classList.remove("position-bottom");
                this.calendar.classList.add("position-top");
            }
        }
        // Restore original styles
        this.calendar.style.visibility = originalVisibility;
        this.calendar.style.display = originalDisplay;
    }
    changeMonth(direction) {
        // Prevent multiple transitions at once
        if (this.isTransitioning)
            return;
        this.isTransitioning = true;
        // Cache reference to calendar elements
        const daysContainer = this.daysContainer;
        // Use requestAnimationFrame for smoother animations
        requestAnimationFrame(() => {
            // Add transition class based on direction
            const slideClass = direction > 0 ? 'slide-left' : 'slide-right';
            daysContainer.classList.add(slideClass);
            // Update month and year values
            this.jalaliMonth = Number(this.jalaliMonth) + direction;
            if (this.jalaliMonth < 1) {
                this.jalaliMonth = 12;
                this.jalaliYear--;
            }
            else if (this.jalaliMonth > 12) {
                this.jalaliMonth = 1;
                this.jalaliYear++;
            }
            // Use requestAnimationFrame for better timing
            requestAnimationFrame(() => {
                // Set a timeout to actually update the calendar
                setTimeout(() => {
                    // Update month and year selects
                    if (this.shadowRoot) {
                        const monthSelect = this.shadowRoot.getElementById("month-select");
                        const yearSelect = this.shadowRoot.getElementById("year-select");
                        if (monthSelect)
                            monthSelect.value = this.jalaliMonth.toString();
                        if (yearSelect)
                            yearSelect.value = this.jalaliYear.toString();
                    }
                    // Clear days container and render new content
                    daysContainer.innerHTML = "";
                    this.renderCalendarContent();
                    // Remove slide class after the animation duration
                    requestAnimationFrame(() => {
                        daysContainer.classList.remove(slideClass);
                        // Set a brief timeout to ensure animation is truly done
                        setTimeout(() => {
                            this.isTransitioning = false;
                        }, 50);
                    });
                }, 200); // Shorter than the CSS animation duration for better feel
            });
        });
    }
    renderCalendar() {
        const shadow = this.shadowRoot;
        // Update month and year select values
        const monthSelect = shadow.getElementById("month-select");
        const yearSelect = shadow.getElementById("year-select");
        monthSelect.value = this.jalaliMonth.toString();
        yearSelect.value = this.jalaliYear.toString();
        // Clear previous days
        this.daysContainer.innerHTML = "";
        // Render the calendar content
        this.renderCalendarContent();
    }
    /**
     * Renders the calendar content for the current month
     */
    renderCalendarContent() {
        // Get first day of month and number of days
        const firstDayOfMonth = PersianDate.getDayOfWeek(this.jalaliYear, this.jalaliMonth, 1);
        const daysInMonth = PersianDate.getDaysInMonth(this.jalaliYear, this.jalaliMonth);
        // Get today's date for highlighting
        const today = new Date();
        const jalaliToday = PersianDate.gregorianToJalali(today.getFullYear(), today.getMonth() + 1, today.getDate());
        // Adjust first day of month for Persian calendar (Saturday is first day of week)
        const adjustedFirstDay = (firstDayOfMonth + 1) % 7;
        // Add empty cells for days before the first day of month
        for (let i = 0; i < adjustedFirstDay; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.classList.add("day", "empty");
            this.daysContainer.appendChild(emptyDay);
        }
        // Generate days of month
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement("div");
            dayElement.classList.add("day");
            dayElement.textContent = i.toString();
            // Improve touch behavior on day elements
            dayElement.addEventListener("touchstart", (e) => {
                // Just let it propagate to handle in the calendar's touch handlers
            }, { passive: true });
            // Add hover handler for desktop tooltips
            dayElement.addEventListener("mouseenter", () => {
                const tooltip = dayElement.querySelector('.event-tooltip');
                if (tooltip) {
                    tooltip.classList.add("tooltip-visible");
                }
            });
            dayElement.addEventListener("mouseleave", () => {
                const tooltip = dayElement.querySelector('.event-tooltip');
                if (tooltip) {
                    tooltip.classList.remove("tooltip-visible");
                }
            });
            // Add click listener with proper event handling
            let lastTapTime = 0;
            dayElement.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                const currentTime = new Date().getTime();
                const tapLength = currentTime - lastTapTime;
                if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                    if (tapLength < 500 && tapLength > 0) {
                        // Double tap detected - show tooltip
                        const tooltip = dayElement.querySelector('.event-tooltip');
                        if (tooltip) {
                            const tooltips = this.shadowRoot?.querySelectorAll('.event-tooltip.tooltip-visible');
                            tooltips?.forEach(t => t.classList.remove("tooltip-visible"));
                            tooltip.classList.add("tooltip-visible");
                        }
                    }
                    else {
                        // Single tap - select the date
                        this.selectDate(i);
                    }
                }
                else {
                    // For non-mobile, just select the date
                    this.selectDate(i);
                }
                lastTapTime = currentTime;
            });
            // Highlight today
            if (this.jalaliYear === jalaliToday[0] && this.jalaliMonth === jalaliToday[1] && i === jalaliToday[2]) {
                dayElement.classList.add("today");
            }
            // Highlight selected date
            if (this.selectedDate &&
                this.jalaliYear === this.selectedDate[0] &&
                this.jalaliMonth === this.selectedDate[1] &&
                i === this.selectedDate[2]) {
                dayElement.classList.add("selected");
            }
            // Check if the day is a holiday
            if (this.showHolidays) {
                // Check if it's Friday (6th day in JavaScript's getDay, where 0 is Sunday)
                const dayOfWeek = PersianDate.getDayOfWeek(this.jalaliYear, this.jalaliMonth, i);
                if (dayOfWeek === 5) { // Friday
                    dayElement.classList.add("friday");
                }
                // Check if it's a holiday from events.json based on holiday types
                if (EventUtils.isHoliday(this.jalaliMonth, i, this.holidayTypes, this.includeAllTypes)) {
                    dayElement.classList.add("holiday");
                    // Add tooltip with event titles
                    const events = EventUtils.getEvents(this.jalaliMonth, i, this.holidayTypes, this.includeAllTypes);
                    if (events.length > 0) {
                        const tooltip = document.createElement("div");
                        tooltip.classList.add("event-tooltip");
                        events.forEach(event => {
                            const eventItem = document.createElement("div");
                            eventItem.classList.add("event-item");
                            // Add 'holiday' class to highlight holiday events
                            if (event.holiday) {
                                eventItem.classList.add("holiday");
                            }
                            // Add type label
                            const typeLabel = document.createElement("span");
                            typeLabel.classList.add("event-type-label");
                            typeLabel.textContent = event.type;
                            eventItem.appendChild(typeLabel);
                            // Add event title
                            const titleSpan = document.createElement("span");
                            titleSpan.textContent = event.title;
                            eventItem.appendChild(titleSpan);
                            tooltip.appendChild(eventItem);
                        });
                        // For mobile, add a close button to the tooltip
                        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                            const closeButton = document.createElement("button");
                            closeButton.textContent = "بستن";
                            closeButton.classList.add("tooltip-close-button");
                            // Add event listeners that properly stop propagation
                            closeButton.addEventListener("click", (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                tooltip.classList.remove("tooltip-visible");
                                // Remove the tooltip after animation
                                setTimeout(() => {
                                    tooltip.remove();
                                }, 200);
                            });
                            closeButton.addEventListener("touchend", (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                tooltip.classList.remove("tooltip-visible");
                                // Remove the tooltip after animation
                                setTimeout(() => {
                                    tooltip.remove();
                                }, 200);
                            }, { passive: false });
                            tooltip.appendChild(closeButton);
                        }
                        // Add focus handling to maintain tooltip styling
                        tooltip.addEventListener("focusin", () => {
                            tooltip.style.background = "var(--jdp-background)";
                        });
                        tooltip.addEventListener("focusout", () => {
                            tooltip.style.background = "var(--jdp-background)";
                        });
                        dayElement.appendChild(tooltip);
                    }
                }
            }
            this.daysContainer.appendChild(dayElement);
        }
    }
    selectDate(day) {
        this.jalaliDay = day;
        this.selectedDate = [this.jalaliYear, this.jalaliMonth, this.jalaliDay];
        // Format date as YYYY/MM/DD or custom format
        this.formatAndSetValue();
        // Get all events for the selected date
        const events = EventUtils.getEvents(this.jalaliMonth, day, this.holidayTypes, this.includeAllTypes);
        // Dispatch change event
        this.dispatchEvent(new CustomEvent("change", {
            detail: {
                jalali: this.selectedDate,
                gregorian: PersianDate.jalaliToGregorian(this.jalaliYear, this.jalaliMonth, this.jalaliDay),
                isHoliday: EventUtils.isHoliday(this.jalaliMonth, day, this.holidayTypes, this.includeAllTypes),
                events: events
            },
            bubbles: true
        }));
        this.toggleCalendar();
        this.renderCalendar();
    }
    formatAndSetValue() {
        if (!this.selectedDate)
            return;
        const format = this.getAttribute('format') || this.options.format || 'YYYY/MM/DD';
        let formattedDate = format
            .replace('YYYY', this.selectedDate[0].toString())
            .replace('MM', this.selectedDate[1].toString().padStart(2, '0'))
            .replace('DD', this.selectedDate[2].toString().padStart(2, '0'));
        this.input.value = formattedDate;
    }
    /**
     * Sets the date value programmatically
     */
    setValue(year, month, day) {
        this.selectedDate = [year, month, day];
        this.jalaliYear = year;
        this.jalaliMonth = month;
        this.jalaliDay = day;
        this.formatAndSetValue();
        this.renderCalendar();
    }
    /**
     * Gets the currently selected date as a tuple [year, month, day]
     */
    getValue() {
        return this.selectedDate;
    }
    /**
     * Checks if the currently selected date is a holiday
     */
    isSelectedDateHoliday() {
        if (!this.selectedDate)
            return false;
        return EventUtils.isHoliday(this.selectedDate[1], this.selectedDate[2], this.holidayTypes, this.includeAllTypes);
    }
    /**
     * Gets events for the currently selected date
     */
    getSelectedDateEvents() {
        if (!this.selectedDate)
            return [];
        return EventUtils.getEvents(this.selectedDate[1], this.selectedDate[2], this.holidayTypes, this.includeAllTypes);
    }
    /**
     * Clears the selected date
     */
    clear() {
        this.selectedDate = null;
        this.input.value = '';
        this.renderCalendar();
    }
    /**
     * Initialize touch gesture support for the calendar
     */
    initTouchGestures() {
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        const threshold = 20; // Even lower threshold for more responsive swipes
        let touchStartTime = 0;
        let isSwiping = false;
        // Handle touch start - capture initial position
        this.calendar.addEventListener('touchstart', (e) => {
            // Only handle touches when calendar is visible
            if (!this.calendar.classList.contains("visible"))
                return;
            // Store initial touch position
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = false;
            isSwiping = false;
            touchStartTime = Date.now();
        }, { passive: true });
        // For the entire calendar, capture touchmove events
        this.calendar.addEventListener('touchmove', (e) => {
            // Only process if calendar is visible
            if (!this.calendar.classList.contains("visible"))
                return;
            // Calculate how far we've moved
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = currentX - startX;
            const diffY = currentY - startY;
            // If we're already swiping, always prevent default
            if (isSwiping) {
                e.preventDefault();
                return;
            }
            // If horizontal movement is greater than vertical movement and significant
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
                // We have a horizontal swipe inside the calendar - prevent page scrolling
                e.preventDefault();
                isDragging = true;
                isSwiping = true;
            }
        }, { passive: false });
        // Handle touch end - determine if it was a swipe
        this.calendar.addEventListener('touchend', (e) => {
            if (!this.calendar.classList.contains("visible"))
                return;
            // Reset swiping state
            const wasSwiping = isSwiping;
            isSwiping = false;
            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchStartTime;
            // Only process if the touch was quick (< 300ms) or we detected dragging
            if ((touchDuration < 300 || isDragging) && !this.isTransitioning) {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const diffX = endX - startX;
                const diffY = endY - startY;
                // Only consider horizontal movements that are larger than vertical movements
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > threshold) {
                    // Determine direction based on RTL mode
                    const isRTL = getComputedStyle(this).getPropertyValue('--jdp-direction').trim() === 'rtl';
                    // In RTL mode, swipe left moves to next month, swipe right moves to previous month
                    // In LTR mode, it's the opposite
                    if ((isRTL && diffX < 0) || (!isRTL && diffX > 0)) {
                        e.preventDefault(); // Prevent any default actions
                        e.stopPropagation(); // Stop event from propagating
                        this.changeMonth(1); // Next month
                    }
                    else if ((isRTL && diffX > 0) || (!isRTL && diffX < 0)) {
                        e.preventDefault(); // Prevent any default actions
                        e.stopPropagation(); // Stop event from propagating
                        this.changeMonth(-1); // Previous month
                    }
                }
            }
            // If we were swiping, prevent any click events
            if (wasSwiping) {
                e.preventDefault();
            }
        }, { passive: false });
        // Add a touchcancel handler to reset state
        this.calendar.addEventListener('touchcancel', () => {
            isSwiping = false;
            isDragging = false;
        });
        // Improve performance by preventing events from being processed by the whole document
        this.calendar.addEventListener('touchstart', (e) => {
            e.stopPropagation();
        }, { passive: true });
        // Improve month navigation performance
        this.shadowRoot?.getElementById("prev-month")?.addEventListener("touchstart", (e) => {
            e.stopPropagation();
        }, { passive: true });
        this.shadowRoot?.getElementById("next-month")?.addEventListener("touchstart", (e) => {
            e.stopPropagation();
        }, { passive: true });
    }
    /**
     * Navigate to today's date and select it
     */
    goToToday() {
        // Get today's date
        const today = new Date();
        const jalaliToday = PersianDate.gregorianToJalali(today.getFullYear(), today.getMonth() + 1, today.getDate());
        const previousYear = this.jalaliYear;
        // Update current view to today's month/year
        this.jalaliYear = jalaliToday[0];
        this.jalaliMonth = jalaliToday[1];
        // If the year has changed, refresh the Hijri events
        if (previousYear !== this.jalaliYear) {
            EventUtils.refreshEvents();
        }
        // Render the calendar with the new month/year
        this.renderCalendar();
        // Select today's date
        this.selectDate(jalaliToday[2]);
    }
    /**
     * Navigate to tomorrow's date and select it
     */
    goToTomorrow() {
        // Get tomorrow's date (add 1 day to today)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const jalaliTomorrow = PersianDate.gregorianToJalali(tomorrow.getFullYear(), tomorrow.getMonth() + 1, tomorrow.getDate());
        const previousYear = this.jalaliYear;
        // Update current view to tomorrow's month/year
        this.jalaliYear = jalaliTomorrow[0];
        this.jalaliMonth = jalaliTomorrow[1];
        // If the year has changed, refresh the Hijri events
        if (previousYear !== this.jalaliYear) {
            EventUtils.refreshEvents();
        }
        // Render the calendar with the new month/year
        this.renderCalendar();
        // Select tomorrow's date
        this.selectDate(jalaliTomorrow[2]);
    }
    /**
     * Setup month and year selector dropdowns
     */
    setupMonthYearSelectors() {
        const shadow = this.shadowRoot;
        const monthSelect = shadow.getElementById("month-select");
        const yearSelect = shadow.getElementById("year-select");
        // Clear existing options
        monthSelect.innerHTML = "";
        yearSelect.innerHTML = "";
        // Add month options (1-12)
        const persianMonths = [
            "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
            "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
        ];
        persianMonths.forEach((month, index) => {
            const option = document.createElement("option");
            option.value = (index + 1).toString();
            option.textContent = month;
            monthSelect.appendChild(option);
        });
        // Add year options (current year - 100 to current year + 50)
        const today = new Date();
        const jalaliToday = PersianDate.gregorianToJalali(today.getFullYear(), today.getMonth() + 1, today.getDate());
        const currentJalaliYear = jalaliToday[0];
        const startYear = currentJalaliYear - 100;
        const endYear = currentJalaliYear + 50;
        for (let year = startYear; year <= endYear; year++) {
            const option = document.createElement("option");
            option.value = year.toString();
            option.textContent = year.toString();
            yearSelect.appendChild(option);
        }
    }
}

;// CONCATENATED MODULE: ./src/index.ts
// Import the custom element class

// Import the utility class

// Define the custom element
if (!customElements.get('persian-datepicker-element')) {
    customElements.define('persian-datepicker-element', PersianDatePickerElement);
}
// Export the classes and types

// Default export for convenient usage
/* ESM default export */ const src = (PersianDatePickerElement);

__webpack_exports__ = __webpack_exports__["default"];return __webpack_exports__;
})()

});
//# sourceMappingURL=persian-datepicker-element.js.map