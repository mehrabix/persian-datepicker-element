var t;
(t = () =>
  (() => {
    var t = {
        d: (a, e) => {
          for (var n in e)
            t.o(e, n) && !t.o(a, n) && Object.defineProperty(a, n, { enumerable: !0, get: e[n] });
        },
        o: (t, a) => Object.prototype.hasOwnProperty.call(t, a),
      },
      a = {};
    t.d(a, { default: () => y });
    const e = {
      g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
      jalaliToGregorian: function (t, a, e) {
        const n = (t = parseInt(t.toString())) - 979,
          i = (a = parseInt(a.toString())) - 1,
          l = (e = parseInt(e.toString())) - 1;
        let o = 365 * n + 8 * Math.floor(n / 33) + Math.floor(((n % 33) + 3) / 4);
        for (let t = 0; t < i; ++t) o += this.j_days_in_month[t];
        o += l;
        let d = o + 79,
          r = 1600 + 400 * Math.floor(d / 146097);
        d %= 146097;
        let y = !0;
        d >= 36525 &&
          (d--, (r += 100 * Math.floor(d / 36524)), (d %= 36524), d >= 365 ? d++ : (y = !1)),
          (r += 4 * Math.floor(d / 1461)),
          (d %= 1461),
          d >= 366 && ((y = !1), d--, (r += Math.floor(d / 365)), (d %= 365));
        let s = 0;
        for (; d >= this.g_days_in_month[s] + (1 === s && y ? 1 : 0); s++)
          d -= this.g_days_in_month[s] + (1 === s && y ? 1 : 0);
        return [r, s + 1, d + 1];
      },
      gregorianToJalali: function (t, a, e) {
        const n = (t = parseInt(t.toString())) - 1600,
          i = (a = parseInt(a.toString())) - 1,
          l = (e = parseInt(e.toString())) - 1;
        let o =
          365 * n +
          Math.floor((n + 3) / 4) -
          Math.floor((n + 99) / 100) +
          Math.floor((n + 399) / 400);
        for (let t = 0; t < i; ++t) o += this.g_days_in_month[t];
        i > 1 && ((n % 4 == 0 && n % 100 != 0) || n % 400 == 0) && o++, (o += l);
        let d = o - 79;
        const r = Math.floor(d / 12053);
        d %= 12053;
        let y = 979 + 33 * r + 4 * Math.floor(d / 1461);
        (d %= 1461), d >= 366 && ((y += Math.floor((d - 1) / 365)), (d = (d - 1) % 365));
        let s = 0;
        for (; s < 11 && d >= this.j_days_in_month[s]; ++s) d -= this.j_days_in_month[s];
        return [y, s + 1, d + 1];
      },
      isLeapJalaliYear: t => [1, 5, 9, 13, 17, 22, 26, 30].includes(t % 33),
      getDaysInMonth: function (t, a) {
        return a < 1 || a > 12 ? 0 : a <= 6 ? 31 : a <= 11 || this.isLeapJalaliYear(t) ? 30 : 29;
      },
      getMonthName: t =>
        [
          'فروردین',
          'اردیبهشت',
          'خرداد',
          'تیر',
          'مرداد',
          'شهریور',
          'مهر',
          'آبان',
          'آذر',
          'دی',
          'بهمن',
          'اسفند',
        ][t - 1],
      getDayOfWeek: function (t, a, e) {
        const n = this.jalaliToGregorian(t, a, e);
        return new Date(n[0], n[1] - 1, n[2]).getDay();
      },
      getDaysInYear: function (t) {
        return this.isLeapJalaliYear(t) ? 366 : 365;
      },
      isValidDate: function (t, a, e) {
        return !(t < 0 || a < 1 || a > 12 || e < 1) && e <= this.getDaysInMonth(t, a);
      },
    };
    var n = JSON.parse(
      '{"Source":{"Afghanistan":"https://w.mudl.gov.af/sites/default/files/2020-03/Calendar%202020%20Website.pdf","Iran":"https://calendar.ut.ac.ir/documents/2139738/7092644/Calendar-1404.pdf","AncientIran":"~https://raw.githubusercontent.com/ilius/starcal/master/plugins/iran-ancient-data.txt","International":"~https://www.un.org/en/sections/observances/international-days/","Nepal":""},"#meta":["https://github.com/persian-calendar","فهرست مناسبت‌های ایران و افغانستان که در پروژهٔ تقویم فارسی، توسط توسعه‌دهندگان آن و به کمک منابع زیر","تهیه و نگه‌داری می‌شود. با توجه به زحمتی که برای گردآوردی آن کشیده شده است","پیشنهاد می‌شود آن را فقط در پروژه‌های متن‌باز و یا با ارجاع مناسب به منبع استفادهٔ مجدد کنید","و اگر اشکالی در یکی از مناسبت‌ها، عنوان یا تاریخ یا عدم وجود مناسبتی دیدید سریعاً پروژه را مطلع کنید، با تشکر","توجه:","به مناسبت‌هایی که در انتهای صفحه قرار دارند و الگوی تکرارشان متفاوت است توجه ویژه کنید","این داده‌ها از منابع رسمی زیر گردآوری شده‌اند، خود این گردآوردی رسمی و دارای تضمین بی‌نقص بودن نیست ولی محتویات آن به منابع زیر بر می‌گردد","https://w.mudl.gov.af/sites/default/files/2020-03/Calendar%202020%20Website.pdf","افغانستان","https://calendar.ut.ac.ir/documents/2139738/7092644/Calendar-1404.pdf","مرکز تقویم دانشگاه تهران","https://github.com/ilius/starcal/tree/main/plugins","مطابق با استخراج و تنظیم شورای مرکز تقویم مؤسسهٔ ژئوفیزیک دانشگاه تهران (مناسبت‌ها از شورای فرهنگ عمومی)","گردآوری، فرمت‌بندی و به روزآوری: سعید رسولی <saeed.gnu@gmail.com>، مولا پهنادایان <mola.mp@gmail.com>","https://raw.githubusercontent.com/ilius/starcal/master/plugins/iran-ancient-data.txt","جشن‌های باستانی ایران","Ardalan Razavi","رضا مرادی غیاث‌آبادی (www.ghiasabadi.com)","سعید رسولی <saeed.gnu@gmail.com>","https://www.un.org/en/sections/observances/international-days/"],"Persian Calendar":[{"holiday":true,"month":1,"day":1,"type":"Afghanistan","title":"جشن نوروز"},{"holiday":true,"month":1,"day":2,"type":"Afghanistan","title":"جشن دهقان"},{"holiday":false,"month":1,"day":3,"type":"Afghanistan","title":"روز زنگ مکتب"},{"holiday":false,"month":2,"day":5,"type":"Afghanistan","title":"روز مطبوعات"},{"holiday":false,"month":2,"day":7,"type":"Afghanistan","title":"کودتای حزب دموکراتیک خلق افغانستان (سال ۱۳۵۷)"},{"holiday":true,"month":2,"day":8,"type":"Afghanistan","title":"پیروزی جهاد مقدس افغانستان (سال ۱۳۷۱)"},{"holiday":false,"month":3,"day":24,"type":"Afghanistan","title":"روز مادر"},{"holiday":true,"month":5,"day":28,"type":"Afghanistan","title":"روز استرداد استقلال کشور (سال ۱۲۹۸ مصادف با ۱۹۱۹ میلادی)"},{"holiday":false,"month":6,"day":9,"type":"Afghanistan","title":"روز همبستگی با برادران پشتون و بلوچ"},{"holiday":true,"month":6,"day":18,"type":"Afghanistan","title":"روز شهادت قهرمان ملی افغانستان (آغاز هفتهٔ شهید)"},{"holiday":false,"month":7,"day":16,"type":"Afghanistan","title":"روز هنر"},{"holiday":false,"month":7,"day":21,"type":"Afghanistan","title":"روز جیودیزیست‌های کشور"},{"holiday":false,"month":7,"day":24,"type":"Afghanistan","title":"آغاز هفتهٔ مخصوص سره میاشت"},{"holiday":false,"month":7,"day":29,"type":"Afghanistan","title":"روز ملی زبان اوزبیکی"},{"holiday":false,"month":8,"day":15,"type":"Afghanistan","title":"روز وحدت ملی و شهادت شش عضو ولسی جرگه شورای ملی در بغلان (سال ۱۳۸۶)"},{"holiday":false,"month":9,"day":13,"type":"Afghanistan","title":"روز تحقیق و پژوهش"},{"holiday":false,"month":10,"day":6,"type":"Afghanistan","title":"روز تجاوز ارتش اتحاد شوروی سابق بر حریم کشور (سال ۱۳۵۸)"},{"holiday":false,"month":10,"day":14,"type":"Afghanistan","title":"هفتهٔ قانون اساسی افغانستان (۱۴-۲۰ جدی)"},{"holiday":false,"month":11,"day":10,"type":"Afghanistan","title":"روز متعاقدین"},{"holiday":true,"month":11,"day":26,"type":"Afghanistan","title":"روز شکست و خروج ارتش اتحاد شوروی سابق از افغانستان"},{"holiday":false,"month":12,"day":3,"type":"Afghanistan","title":"روز تکبیر و قیام مردم کابل در برابر تجاوز ارتش اتحاد شوروی سابق"},{"holiday":false,"month":12,"day":9,"type":"Afghanistan","title":"روز ملی حمایت از نیروهای دفاعی و امنیتی کشور"},{"holiday":false,"month":12,"day":20,"type":"Afghanistan","title":"روز حفاظت از میراث‌های فرهنگی کشور"},{"holiday":false,"month":12,"day":22,"type":"Afghanistan","title":"روز شهید وحدت ملی استاد عبدالعلی مزاری (۱۳۷۳)"},{"holiday":false,"month":12,"day":24,"type":"Afghanistan","title":"روز قیام مردم هرات بر علیه جمهوری دموکراتیک خلق افغانستان"},{"holiday":false,"month":12,"day":27,"type":"Afghanistan","title":"روز ملی خبرنگار"},{"holiday":true,"month":1,"day":1,"type":"Iran","title":"آغاز نوروز"},{"holiday":true,"month":1,"day":2,"type":"Iran","title":"عید نوروز"},{"holiday":false,"month":1,"day":2,"type":"Iran","title":"هجوم مأموران ستم‌شاهی پهلوی به مدرسهٔ فیضیهٔ قم (۱۳۴۲ ه‍.ش)"},{"holiday":false,"month":1,"day":2,"type":"Iran","title":"آغاز عملیات فتح‌المبین (۱۳۶۱ ه‍.ش)"},{"holiday":true,"month":1,"day":3,"type":"Iran","title":"عید نوروز"},{"holiday":true,"month":1,"day":4,"type":"Iran","title":"عید نوروز"},{"holiday":false,"month":1,"day":6,"type":"Iran","title":"زادروز زرتشت پیامبر"},{"holiday":false,"month":1,"day":7,"type":"Iran","title":"روز هنرهای نمایشی"},{"holiday":true,"month":1,"day":12,"type":"Iran","title":"روز جمهوری اسلامی ایران"},{"holiday":true,"month":1,"day":13,"type":"Iran","title":"روز طبیعت"},{"holiday":false,"month":1,"day":15,"type":"Iran","title":"روز ذخایر ژنتیکی و زیستی"},{"holiday":false,"month":1,"day":18,"type":"Iran","title":"روز سلامتی"},{"holiday":false,"month":1,"day":19,"type":"Iran","title":"شهادت آیت‌اللّه سیدمحمدباقر صدر و خواهر ایشان بنت‌الهدی به دست حکومت بعث عراق (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":1,"day":20,"type":"Iran","title":"روز ملی فناوری هسته‌ای"},{"holiday":false,"month":1,"day":20,"type":"Iran","title":"شهادت سید مرتضی آوینی"},{"holiday":false,"month":1,"day":20,"type":"Iran","title":"روز هنر انقلاب اسلامی"},{"holiday":false,"month":1,"day":21,"type":"Iran","title":"شهادت امیر سپهبد علی صیاد شیرازی (۱۳۷۸ ه‍.ش)"},{"holiday":false,"month":1,"day":21,"type":"Iran","title":"سالروز افتتاح حساب شمارهٔ ۱۰۰ به فرمان حضرت امام خمینی (ره) و تأسیس بنیاد مسکن انقلاب اسلامی (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":1,"day":25,"type":"Iran","title":"روز بزرگداشت عطار نیشابوری"},{"holiday":false,"month":1,"day":29,"type":"Iran","title":"روز ارتش جمهوری اسلامی و نیروی زمینی"},{"holiday":false,"month":1,"day":31,"type":"Iran","title":"روز گندم و نان"},{"holiday":false,"month":2,"day":1,"type":"Iran","title":"روز بزرگداشت سعدی"},{"holiday":false,"month":2,"day":1,"type":"Iran","title":"روز نثر فارسی"},{"holiday":false,"month":2,"day":1,"type":"Iran","title":"روز شهدای ورزشکار"},{"holiday":false,"month":2,"day":2,"type":"Iran","title":"تأسیس سپاه پاسداران انقلاب اسلامی (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":2,"day":2,"type":"Iran","title":"سالروز اعلام انقلاب فرهنگی (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":2,"day":2,"type":"Iran","title":"روز زمین پاک"},{"holiday":false,"month":2,"day":3,"type":"Iran","title":"روز بزرگداشت شیخ بهایی"},{"holiday":false,"month":2,"day":3,"type":"Iran","title":"روز معماری"},{"holiday":false,"month":2,"day":3,"type":"Iran","title":"سالروز شهادت امیر سپهبد قرنی (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":2,"day":5,"type":"Iran","title":"شکست حملهٔ نظامی آمریکا به ایران در طبس (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":2,"day":7,"type":"Iran","title":"روز ایمنی حمل و نقل"},{"holiday":false,"month":2,"day":9,"type":"Iran","title":"روز شوراها"},{"holiday":false,"month":2,"day":10,"type":"Iran","title":"روز ملی خلیج فارس"},{"holiday":false,"month":2,"day":10,"type":"Iran","title":"آغاز عملیات بیت‌المقدس (۱۳۶۱ ه‍.ش)"},{"holiday":false,"month":2,"day":12,"type":"Iran","title":"شهادت استاد مرتضی مطهری (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":2,"day":12,"type":"Iran","title":"روز معلم"},{"holiday":false,"month":2,"day":15,"type":"Iran","title":"روز بزرگداشت شیخ صدوق"},{"holiday":false,"month":2,"day":18,"type":"Iran","title":"روز بیماری‌های خاص و صعب‌العلاج"},{"holiday":false,"month":2,"day":19,"type":"Iran","title":"روز بزرگداشت شیخ کلینی"},{"holiday":false,"month":2,"day":19,"type":"Iran","title":"روز اسناد ملی و میراث مکتوب"},{"holiday":false,"month":2,"day":20,"type":"Iran","title":"روز گل محمدی و گلاب"},{"holiday":false,"month":2,"day":24,"type":"Iran","title":"لغو امتیاز تنباکو به فتوای آیت‌الله میرزا حسن شیرازی (۱۲۷۰ ه‍.ش)"},{"holiday":false,"month":2,"day":25,"type":"Iran","title":"روز پاسداشت زبان فارسی و بزرگداشت حکیم ابوالقاسم فردوسی"},{"holiday":false,"month":2,"day":27,"type":"Iran","title":"روز ارتباطات و روابط عمومی"},{"holiday":false,"month":2,"day":28,"type":"Iran","title":"روز بزرگداشت حکیم عمر خیام"},{"holiday":false,"month":2,"day":30,"type":"Iran","title":"روز ملی جمعیت"},{"holiday":false,"month":2,"day":31,"type":"Iran","title":"روز اهدای عضو، اهدای زندگی"},{"holiday":false,"month":3,"day":1,"type":"Iran","title":"روز بهره‌وری و بهینه‌سازی مصرف"},{"holiday":false,"month":3,"day":1,"type":"Iran","title":"روز بزرگداشت ملاصدرا (صدرالمتألهین)"},{"holiday":false,"month":3,"day":3,"type":"Iran","title":"فتح خرمشهر در عملیات بیت‌المقدس (۱۳۶۱ ه‍.ش) و روز مقاومت، ایثار و پیروزی"},{"holiday":false,"month":3,"day":4,"type":"Iran","title":"روز مقاومت و پایداری"},{"holiday":false,"month":3,"day":4,"type":"Iran","title":"روز دزفول"},{"holiday":false,"month":3,"day":5,"type":"Iran","title":"روز نسیم مهر (روز حمایت از خانواده زندانیان)"},{"holiday":false,"month":3,"day":7,"type":"Iran","title":"افتتاح اولین دورهٔ مجلس شورای اسلامی (۱۳۵۹ ه‍.ش)"},{"holiday":true,"month":3,"day":14,"type":"Iran","title":"رحلت حضرت امام خمینی (ره) رهبر کبیر انقلاب و بنیان‌گذار جمهوری اسلامی ایران (۱۳۶۸ ه‍.ش)"},{"holiday":false,"month":3,"day":14,"type":"Iran","title":"انتخاب حضرت آیت‌الله امام خامنه‌ای به رهبری (۱۳۶۸ ه‍.ش)"},{"holiday":true,"month":3,"day":15,"type":"Iran","title":"قیام خونین ۱۵ خرداد (۱۳۴۲ ه‍.ش)"},{"holiday":false,"month":3,"day":15,"type":"Iran","title":"زندانی شدن حضرت امام خمینی (ره) به دست مأموران ستم شاهی پهلوی (۱۳۴۲ ه‍.ش)"},{"holiday":false,"month":3,"day":20,"type":"Iran","title":"روز صنایع دستی"},{"holiday":false,"month":3,"day":20,"type":"Iran","title":"روز ملی فرش"},{"holiday":false,"month":3,"day":20,"type":"Iran","title":"شهادت آیت‌الله سعیدی به دست مأموران ستم‌شاهی پهلوی (۱۳۴۹ ه‍.ش)"},{"holiday":false,"month":3,"day":26,"type":"Iran","title":"شهادت سربازان دلیر اسلام: بخارایی، امانی، صفار هرندی و نیک‌نژاد (۱۳۴۴ ه‍.ش)"},{"holiday":false,"month":3,"day":27,"type":"Iran","title":"روز جهاد کشاورزی (تشکیل جهاد سازندگی به فرمان حضرت امام خمینی (ره)) (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":3,"day":29,"type":"Iran","title":"درگذشت دکتر علی شریعتی (۱۳۵۶ ه‍.ش)"},{"holiday":false,"month":3,"day":30,"type":"Iran","title":"شهادت زائران حرم رضوی (ع) به دست ایادی آمریکا (عاشورای ۱۳۷۳ ه‍.ش)"},{"holiday":false,"month":3,"day":31,"type":"Iran","title":"شهادت دکتر مصطفی چمران (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":3,"day":31,"type":"Iran","title":"روز بسیج استادان"},{"holiday":false,"month":4,"day":1,"type":"Iran","title":"سالروز صدور فرمان حضرت امام خمینی رحمة‌الله علیه مبنی بر تأسیس سازمان تبلیغات اسلامی (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":4,"day":1,"type":"Iran","title":"روز تبلیغ و اطلاع‌رسانی دینی"},{"holiday":false,"month":4,"day":1,"type":"Iran","title":"روز اصناف"},{"holiday":false,"month":4,"day":7,"type":"Iran","title":"شهادت مظلومانهٔ آیت‌الله دکتر بهشتی و ۷۲ تن از یاران حضرت امام خمینی (ره) با انفجار بمب به دست منافقان در دفتر مرکزی حزب جمهوری اسلامی (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":4,"day":7,"type":"Iran","title":"روز قوهٔ قضائیه"},{"holiday":false,"month":4,"day":7,"type":"Iran","title":"بمباران شیمیایی شهر سردشت (۱۳۶۶ ه‍.ش)"},{"holiday":false,"month":4,"day":8,"type":"Iran","title":"روز مبارزه با سلاح‌های شیمیایی و میکروبی"},{"holiday":false,"month":4,"day":10,"type":"Iran","title":"روز صنعت و معدن"},{"holiday":false,"month":4,"day":10,"type":"Iran","title":"روز دیپلماسی فرهنگی و تعامل با جهان"},{"holiday":false,"month":4,"day":10,"type":"Iran","title":"روز آزادسازی شهر مهران"},{"holiday":false,"month":4,"day":10,"type":"Iran","title":"روز بزرگداشت صائب تبریزی"},{"holiday":false,"month":4,"day":10,"type":"Iran","title":"یاد روز ورود حضرت امام رضا (ع) به نیشابور و نقل حدیث سلسلةالذهب"},{"holiday":false,"month":4,"day":11,"type":"Iran","title":"شهادت چهارمین شهید محراب، آیت‌الله صدوقی به دست منافقان (۱۳۶۱ ه‍.ش)"},{"holiday":false,"month":4,"day":12,"type":"Iran","title":"حملهٔ ددمنشانهٔ ناوگان آمریکای جنایتکار به هواپیمای مسافربری جمهوری اسلامی ایران (۱۳۶۷ ه‍.ش)"},{"holiday":false,"month":4,"day":12,"type":"Iran","title":"روز افشای حقوق بشر آمریکایی"},{"holiday":false,"month":4,"day":12,"type":"Iran","title":"روز بزرگداشت علامه امینی (۱۳۴۹ ه‍.ش)"},{"holiday":false,"month":4,"day":14,"type":"Iran","title":"روز قلم"},{"holiday":false,"month":4,"day":14,"type":"Iran","title":"روز شهرداری و دهیاری"},{"holiday":false,"month":4,"day":16,"type":"Iran","title":"روز مالیات"},{"holiday":false,"month":4,"day":18,"type":"Iran","title":"روز ادبیات کودکان و نوجوانان"},{"holiday":false,"month":4,"day":18,"type":"Iran","title":"کشف توطئهٔ آمریکایی در پایگاه هوایی شهید نوژه (کودتای نافرجام نقاب) (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":4,"day":21,"type":"Iran","title":"روز عفاف و حجاب"},{"holiday":false,"month":4,"day":21,"type":"Iran","title":"حمله به مسجد گوهرشاد و کشتار مردم به دست رضاخان (۱۳۱۴ ه‍.ش)"},{"holiday":false,"month":4,"day":22,"type":"Iran","title":"روز بزرگداشت خوارزمی"},{"holiday":false,"month":4,"day":22,"type":"Iran","title":"روز فناوری اطلاعات"},{"holiday":false,"month":4,"day":23,"type":"Iran","title":"روز گفت‌وگو و تعامل سازنده با جهان"},{"holiday":false,"month":4,"day":23,"type":"Iran","title":"گشایش نخستین مجلس خبرگان رهبری (۱۳۶۲ ه‍.ش)"},{"holiday":false,"month":4,"day":25,"type":"Iran","title":"روز بهزیستی و تأمین اجتماعی"},{"holiday":false,"month":4,"day":26,"type":"Iran","title":"سالروز تأسیس نهاد شورای نگهبان (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":4,"day":27,"type":"Iran","title":"اعلام پذیرش قطعنامهٔ ۵۹۸ شورای امنیت از سوی ایران (۱۳۶۷ ه‍.ش)"},{"holiday":false,"month":4,"day":30,"type":"Iran","title":"روز بزرگداشت آیت‌الله سید ابوالقاسم کاشانی"},{"holiday":false,"month":5,"day":4,"type":"Iran","title":"روز بزرگداشت شیخ صفی‌الدین اردبیلی"},{"holiday":false,"month":5,"day":5,"type":"Iran","title":"سالروز عملیات افتخار‌آفرین مرصاد (۱۳۶۷ ه‍.ش)"},{"holiday":false,"month":5,"day":5,"type":"Iran","title":"روز اقامهٔ اولین نماز جمعه با حکم حضرت امام خمینی (ره) در سال ۱۳۵۸"},{"holiday":false,"month":5,"day":6,"type":"Iran","title":"روز کارآفرینی و آموزش‌های فنی‌و‌حرفه‌ای"},{"holiday":false,"month":5,"day":8,"type":"Iran","title":"روز شعر و ادبیات آیینی"},{"holiday":false,"month":5,"day":8,"type":"Iran","title":"روز بزرگداشت محتشم کاشانی"},{"holiday":false,"month":5,"day":8,"type":"Iran","title":"روز بزرگداشت شیخ شهاب‌الدین سهروردی (شیخ اشراق)"},{"holiday":false,"month":5,"day":8,"type":"Iran","title":"روز زنجان"},{"holiday":false,"month":5,"day":9,"type":"Iran","title":"روز اهدای خون"},{"holiday":false,"month":5,"day":11,"type":"Iran","title":"شهادت آیت‌الله شیخ فضل‌الله نوری (۱۲۸۸ ه‍.ش)"},{"holiday":false,"month":5,"day":14,"type":"Iran","title":"صدور فرمان مشروطیت (۱۲۸۵ ه‍.ش)"},{"holiday":false,"month":5,"day":14,"type":"Iran","title":"روز حقوق بشر اسلامی و کرامت انسانی"},{"holiday":false,"month":5,"day":15,"type":"Iran","title":"سالروز شهادت امیر سرلشکر خلبان عباس بابایی (۱۳۶۶ ه‍.ش)"},{"holiday":false,"month":5,"day":16,"type":"Iran","title":"تشکیل جهاد دانشگاهی (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":5,"day":17,"type":"Iran","title":"سالروز شهادت محمد صارمی"},{"holiday":false,"month":5,"day":17,"type":"Iran","title":"روز خبرنگار"},{"holiday":false,"month":5,"day":18,"type":"Iran","title":"روز بزرگداشت شهدای مدافع حرم"},{"holiday":false,"month":5,"day":21,"type":"Iran","title":"روز حمایت از صنایع کوچک"},{"holiday":false,"month":5,"day":22,"type":"Iran","title":"روز تشکل‌ها و مشارکت‌های اجتماعی"},{"holiday":false,"month":5,"day":23,"type":"Iran","title":"روز مقاومت اسلامی"},{"holiday":false,"month":5,"day":26,"type":"Iran","title":"آغاز بازگشت آزادگان به میهن اسلامی (۱۳۶۹ ه‍.ش)"},{"holiday":false,"month":5,"day":28,"type":"Iran","title":"کودتای آمریکا برای بازگرداندن شاه (۱۳۳۲ ه‍.ش)"},{"holiday":false,"month":5,"day":28,"type":"Iran","title":"گشایش مجلس خبرگان برای بررسی نهایی قانون اساسی جمهوری اسلامی ایران (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":5,"day":30,"type":"Iran","title":"روز بزرگداشت علامهٔ مجلسی"},{"holiday":false,"month":5,"day":31,"type":"Iran","title":"روز صنعت دفاعی"},{"holiday":false,"month":5,"day":31,"type":"Iran","title":"روز عسل"},{"holiday":false,"month":6,"day":1,"type":"Iran","title":"روز بزرگداشت ابوعلی سینا"},{"holiday":false,"month":6,"day":1,"type":"Iran","title":"روز پزشک"},{"holiday":false,"month":6,"day":1,"type":"Iran","title":"روز همدان"},{"holiday":false,"month":6,"day":2,"type":"Iran","title":"آغاز هفتهٔ دولت"},{"holiday":false,"month":6,"day":2,"type":"Iran","title":"شهادت سید ‌علی اندرزگو (در روز ۱۹ ماه مبارک رمضان) (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":6,"day":3,"type":"Iran","title":"اِشغال ایران توسط متفقین و فرار رضاخان (۱۳۲۰ ه‍.ش)"},{"holiday":false,"month":6,"day":4,"type":"Iran","title":"روز کارمند"},{"holiday":false,"month":6,"day":5,"type":"Iran","title":"روز بزرگداشت محمدبن زکریای رازی"},{"holiday":false,"month":6,"day":5,"type":"Iran","title":"روز داروسازی"},{"holiday":false,"month":6,"day":5,"type":"Iran","title":"روز کُشتی"},{"holiday":false,"month":6,"day":8,"type":"Iran","title":"انفجار دفتر نخست‌وزیری به دست منافقان و شهادت مظلومانهٔ شهیدان رجایی و باهنر (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":6,"day":8,"type":"Iran","title":"روز مبارزه با تروریسم"},{"holiday":false,"month":6,"day":10,"type":"Iran","title":"سالروز تصویب قانون عملیات بانکی بدون ربا (۱۳۶۲ ه‍.ش)"},{"holiday":false,"month":6,"day":10,"type":"Iran","title":"روز بانکداری اسلامی"},{"holiday":false,"month":6,"day":10,"type":"Iran","title":"روز تشکیل قرارگاه پدافند هوایی حضرت خاتم‌الانبیا (ص) (۱۳۷۱ ه‍.ش)"},{"holiday":false,"month":6,"day":11,"type":"Iran","title":"روز صنعت چاپ"},{"holiday":false,"month":6,"day":12,"type":"Iran","title":"سالروز شهادت رئیسعلی دلواری (۱۲۹۴ ه‍.ش)"},{"holiday":false,"month":6,"day":12,"type":"Iran","title":"روز مبارزه با استعمار انگلیس"},{"holiday":false,"month":6,"day":12,"type":"Iran","title":"روز بهوَرز"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"روز تعاون"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"روز بزرگداشت ابوریحان بیرونی"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"روز علوم پایه"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"روز مردم‌شناسی"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"سالروز زلزله فردوس در سال ۱۳۴۷"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"روز حرکت‌های جهادی و امداد مردمی"},{"holiday":false,"month":6,"day":14,"type":"Iran","title":"شهادت آیت‌الله قدوسی و سرتیپ وحید دستجردی (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":6,"day":17,"type":"Iran","title":"قیام ۱۷ شهریور و کشتار جمعی از مردم به‌دست مأموران ستم‌شاهی پهلوی (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":6,"day":19,"type":"Iran","title":"وفات آیت‌الله سید محمود طالقانی اولین حضرت امام جمعهٔ تهران (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":6,"day":20,"type":"Iran","title":"شهادت دومین شهید محراب، آیت‌الله مدنی به دست منافقان (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":6,"day":21,"type":"Iran","title":"روز سینما"},{"holiday":false,"month":6,"day":25,"type":"Iran","title":"روز خرما"},{"holiday":false,"month":6,"day":27,"type":"Iran","title":"روز شعر و ادب فارسی"},{"holiday":false,"month":6,"day":27,"type":"Iran","title":"روز بزرگداشت استاد سید‌ محمد‌حسین شهریار"},{"holiday":false,"month":6,"day":31,"type":"Iran","title":"آغاز جنگ تحمیلی (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":6,"day":31,"type":"Iran","title":"آغاز هفتهٔ دفاع مقدس"},{"holiday":false,"month":7,"day":2,"type":"Iran","title":"روز بزرگداشت شهدای منا"},{"holiday":false,"month":7,"day":4,"type":"Iran","title":"روز سرباز"},{"holiday":false,"month":7,"day":5,"type":"Iran","title":"شکست حصر آبادان در عملیات ثامن‌الائمه (ع) (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":7,"day":5,"type":"Iran","title":"روز گردشگری"},{"holiday":false,"month":7,"day":7,"type":"Iran","title":"شهادت سرداران اسلام: فلاحی، فکوری، نامجو، کلاهدوز و جهان‌آرا (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":7,"day":7,"type":"Iran","title":"روز بزرگداشت فرماندهان شهید دفاع مقدس"},{"holiday":false,"month":7,"day":7,"type":"Iran","title":"روز آتش‌نشانی و ایمنی"},{"holiday":false,"month":7,"day":7,"type":"Iran","title":"روز بزرگداشت شمس"},{"holiday":false,"month":7,"day":8,"type":"Iran","title":"روز بزرگداشت مولوی"},{"holiday":false,"month":7,"day":10,"type":"Iran","title":"روز نخبگان"},{"holiday":false,"month":7,"day":13,"type":"Iran","title":"هجرت حضرت امام خمینی (ره) از عراق به پاریس (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":7,"day":13,"type":"Iran","title":"روز نیروی انتظامی"},{"holiday":false,"month":7,"day":14,"type":"Iran","title":"روز دامپزشکی"},{"holiday":false,"month":7,"day":15,"type":"Iran","title":"روز روستا و عشایر"},{"holiday":false,"month":10,"day":7,"type":"Iran","title":"روز جهانی حماسهٔ فلسطین"},{"holiday":false,"month":10,"day":7,"type":"Iran","title":"طوفان الاقصی"},{"holiday":false,"month":7,"day":20,"type":"Iran","title":"روز بزرگداشت حافظ"},{"holiday":false,"month":7,"day":23,"type":"Iran","title":"شهادت پنجمین شهید محراب، آیت‌الله اشرفی اصفهانی به دست منافقان (۱۳۶۱ ه‍.ش)"},{"holiday":false,"month":7,"day":24,"type":"Iran","title":"روز ملی پارالمپیک"},{"holiday":false,"month":7,"day":24,"type":"Iran","title":"روز پیوند اولیا و مربیان"},{"holiday":false,"month":7,"day":24,"type":"Iran","title":"سالروز واقعهٔ به آتش کشیدن مسجد جامع شهر کرمان به دست دژخیمان حکومت پهلوی (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":7,"day":25,"type":"Iran","title":"روز نسل‌کشی کودکان و زنان فلسطینی"},{"holiday":false,"month":7,"day":26,"type":"Iran","title":"روز تربیت‌بدنی و ورزش"},{"holiday":false,"month":7,"day":29,"type":"Iran","title":"روز صادرات"},{"holiday":false,"month":8,"day":1,"type":"Iran","title":"شهادت مظلومانهٔ آیت‌الله حاج سید مصطفی خمینی (۱۳۵۶ ه‍.ش)"},{"holiday":false,"month":8,"day":1,"type":"Iran","title":"روز آمار و برنامه‌ریزی"},{"holiday":false,"month":8,"day":1,"type":"Iran","title":"روز بزرگداشت ابوالفضل بیهقی"},{"holiday":false,"month":8,"day":4,"type":"Iran","title":"اعتراض و افشاگری حضرت امام خمینی (ره) علیه پذیرش کاپیتولاسیون (۱۳۴۳ ه‍.ش)"},{"holiday":false,"month":8,"day":5,"type":"Iran","title":"روز زعفران"},{"holiday":false,"month":8,"day":7,"type":"Iran","title":"روز انار"},{"holiday":false,"month":8,"day":8,"type":"Iran","title":"شهادت محمدحسین فهمیده (بسیجی ۱۳ ساله) (۱۳۵۹ ه‍.ش)"},{"holiday":false,"month":8,"day":8,"type":"Iran","title":"روز نوجوان و بسیج دانش‌آموزی"},{"holiday":false,"month":8,"day":8,"type":"Iran","title":"روز پدافند غیرعامل"},{"holiday":false,"month":8,"day":10,"type":"Iran","title":"شهادت اولین شهید محراب، آیت‌الله قاضی طباطبایی به دست منافقان (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":8,"day":13,"type":"Iran","title":"تسخیر لانهٔ جاسوسی آمریکا به دست دانشجویان پیرو خط حضرت امام (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":8,"day":13,"type":"Iran","title":"روز ملی مبارزه با استکبار جهانی"},{"holiday":false,"month":8,"day":13,"type":"Iran","title":"روز دانش‌آموز"},{"holiday":false,"month":8,"day":13,"type":"Iran","title":"تبعید حضرت امام خمینی (ره) از ایران به ترکیه (۱۳۴۳ ه‍.ش)"},{"holiday":false,"month":8,"day":14,"type":"Iran","title":"روز فرهنگ عمومی"},{"holiday":false,"month":8,"day":14,"type":"Iran","title":"روز مازندران"},{"holiday":false,"month":8,"day":18,"type":"Iran","title":"روز کیفیت"},{"holiday":false,"month":8,"day":24,"type":"Iran","title":"روز کتاب، کتاب‌خوانی و کتابدار"},{"holiday":false,"month":8,"day":24,"type":"Iran","title":"روز بزرگداشت آیت‌الله علامه سید محمّدحسین طباطبایی (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":8,"day":25,"type":"Iran","title":"روز اصفهان"},{"holiday":false,"month":8,"day":26,"type":"Iran","title":"سالروز آزادسازی سوسنگرد"},{"holiday":false,"month":8,"day":30,"type":"Iran","title":"روز قهرمان ملی"},{"holiday":false,"month":8,"day":30,"type":"Iran","title":"روز بزرگداشت ابونصر فارابی"},{"holiday":false,"month":8,"day":30,"type":"Iran","title":"روز حکمت و فلسفه"},{"holiday":false,"month":9,"day":4,"type":"Iran","title":"روز زیتون"},{"holiday":false,"month":9,"day":5,"type":"Iran","title":"تشکیل بسیج مستضعفان به فرمان حضرت امام خمینی (ره) (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":9,"day":5,"type":"Iran","title":"روز بسیج مستضعفان"},{"holiday":false,"month":9,"day":5,"type":"Iran","title":"سالروز قیام مردم گرگان (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":9,"day":7,"type":"Iran","title":"روز نیروی دریایی"},{"holiday":false,"month":9,"day":7,"type":"Iran","title":"روز نوآوری و فناوری ساخت ایران"},{"holiday":false,"month":9,"day":9,"type":"Iran","title":"روز بزرگداشت شیخ مفید"},{"holiday":false,"month":9,"day":10,"type":"Iran","title":"شهادت آیت‌الله سید حسن مدرس (۱۳۱۶ ه‍.ش) و روز مجلس"},{"holiday":false,"month":9,"day":11,"type":"Iran","title":"شهادت میرزا‌ کوچک‌خان جنگلی (۱۳۰۰ ه‍.ش)"},{"holiday":false,"month":9,"day":12,"type":"Iran","title":"تصویب قانون اساسی جمهوری اسلامی ایران (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":9,"day":12,"type":"Iran","title":"روز قانون اساسی جمهوری اسلامی ایران"},{"holiday":false,"month":9,"day":13,"type":"Iran","title":"روز بیمه"},{"holiday":false,"month":9,"day":16,"type":"Iran","title":"روز دانشجو"},{"holiday":false,"month":9,"day":18,"type":"Iran","title":"معرفی عراق به عنوان مسئول و آغازگر جنگ از سوی سازمان ملل (۱۳۷۰ ه‍.ش)"},{"holiday":false,"month":9,"day":19,"type":"Iran","title":"تشکیل شورای عالی انقلاب فرهنگی به فرمان حضرت امام خمینی (ره) (۱۳۶۳ ه‍.ش)"},{"holiday":false,"month":9,"day":20,"type":"Iran","title":"شهادت سومین شهید محراب، آیت‌الله دستغیب به دست منافقان (۱۳۶۰ ه‍.ش)"},{"holiday":false,"month":9,"day":25,"type":"Iran","title":"روز پژوهش"},{"holiday":false,"month":9,"day":26,"type":"Iran","title":"روز حمل‌و‌نقل و رانندگان"},{"holiday":false,"month":9,"day":27,"type":"Iran","title":"شهادت آیت‌الله دکتر محمد مفتح (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":9,"day":27,"type":"Iran","title":"روز وحدت حوزه و دانشگاه"},{"holiday":false,"month":9,"day":27,"type":"Iran","title":"روز جهان عاری از خشونت و افراطی‌گری"},{"holiday":false,"month":9,"day":29,"type":"Iran","title":"روز تجلیل از شهید تندگویان"},{"holiday":false,"month":9,"day":30,"type":"Iran","title":"شب یلدا (چله)"},{"holiday":false,"month":9,"day":30,"type":"Iran","title":"ترویج فرهنگ میهمانی و پیوند با خویشان"},{"holiday":false,"month":10,"day":3,"type":"Iran","title":"روز ثبت احوال"},{"holiday":false,"month":10,"day":4,"type":"Iran","title":"روز بزرگداشت رودکی"},{"holiday":false,"month":10,"day":5,"type":"Iran","title":"روز ایمنی در برابر زلزله و کاهش اثرات بلایای طبیعی"},{"holiday":false,"month":10,"day":7,"type":"Iran","title":"سالروز تشکیل نهضت سوادآموزی به فرمان حضرت امام خمینی (ره) (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":10,"day":7,"type":"Iran","title":"شهادت آیت‌الله حسین غفاری به دست مأموران ستم‌شاهی پهلوی (۱۳۵۳ ه‍.ش)"},{"holiday":false,"month":10,"day":8,"type":"Iran","title":"روز صنعت پتروشیمی"},{"holiday":false,"month":10,"day":9,"type":"Iran","title":"روز بصیرت و میثاق امت با ولایت"},{"holiday":false,"month":10,"day":12,"type":"Iran","title":"روز بزرگداشت علامه مصباح یزدی"},{"holiday":false,"month":10,"day":12,"type":"Iran","title":"روز علوم انسانی اسلامی"},{"holiday":false,"month":10,"day":13,"type":"Iran","title":"روز جهانی مقاومت"},{"holiday":false,"month":10,"day":13,"type":"Iran","title":"شهادت الگوی اخلاص و عمل سردار سپهبد قاسم سلیمانی به دست استکبار جهانی"},{"holiday":false,"month":10,"day":13,"type":"Iran","title":"ابلاغ پیام تاریخی حضرت امام خمینی (ره) به گورباچف رهبر شوروی سابق (۱۳۶۷ ه‍.ش)"},{"holiday":false,"month":10,"day":16,"type":"Iran","title":"شهادت سیدحسین علم‌الهدی و همرزمان وی در هویزه"},{"holiday":false,"month":10,"day":16,"type":"Iran","title":"روز شهدای دانشجو"},{"holiday":false,"month":10,"day":17,"type":"Iran","title":"اجرای طرح استعماری حذف حجاب (کشف حجاب) به دست رضاخان (۱۳۱۴ ه‍.ش)"},{"holiday":false,"month":10,"day":17,"type":"Iran","title":"روز بزرگداشت خواجوی کرمانی"},{"holiday":false,"month":10,"day":17,"type":"Iran","title":"روز کرمان"},{"holiday":false,"month":10,"day":19,"type":"Iran","title":"قیام خونین مردم قم (۱۳۵۶ ه‍.ش)"},{"holiday":false,"month":10,"day":20,"type":"Iran","title":"شهادت میرزا تقی‌خان امیرکبیر (۱۲۳۰ ه‍.ش)"},{"holiday":false,"month":10,"day":22,"type":"Iran","title":"تشکیل شورای انقلاب به فرمان حضرت امام خمینی (ره) (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":10,"day":25,"type":"Iran","title":"روز تاریخ‌نگاری انقلاب اسلامی"},{"holiday":false,"month":10,"day":26,"type":"Iran","title":"فرار شاه معدوم (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":10,"day":27,"type":"Iran","title":"شهادت نواب صفوی، طهماسبی، برادران واحدی و ذوالقدر از فدائیان اسلام (۱۳۳۴ ه‍.ش)"},{"holiday":false,"month":11,"day":1,"type":"Iran","title":"روز بزرگداشت خاقانی شروانی"},{"holiday":false,"month":11,"day":6,"type":"Iran","title":"سالروز حماسهٔ مردم آمل"},{"holiday":false,"month":11,"day":6,"type":"Iran","title":"روز بزرگداشت صفی‌الدین اُرمَوی"},{"holiday":false,"month":11,"day":6,"type":"Iran","title":"روز آواها و نواهای ایرانی"},{"holiday":false,"month":11,"day":12,"type":"Iran","title":"سالروز بازگشت حضرت امام خمینی (ره) به ایران و آغاز دههٔ مبارک فجر انقلاب اسلامی"},{"holiday":false,"month":11,"day":14,"type":"Iran","title":"روز فناوری فضایی"},{"holiday":false,"month":11,"day":19,"type":"Iran","title":"روز نیروی هوایی"},{"holiday":false,"month":11,"day":1,"type":"Iran","title":"روز چهارمحال و بختیاری"},{"holiday":false,"month":11,"day":21,"type":"Iran","title":"شکسته شدن حکومت‌نظامی به فرمان حضرت امام خمینی (ره) (۱۳۵۷ ه‍.ش)"},{"holiday":true,"month":11,"day":22,"type":"Iran","title":"پیروزی انقلاب اسلامی ایران و سقوط نظام شاهنشاهی (۱۳۵۷ ه‍.ش)"},{"holiday":false,"month":11,"day":25,"type":"Iran","title":"صدور حکم تاریخی حضرت امام خمینی (ره) مبنی بر ارتداد سلمان‌رشدی نویسندهٔ خائن کتاب آیات شیطانی (۱۳۶۷ ه‍.ش)"},{"holiday":false,"month":11,"day":29,"type":"Iran","title":"قیام مردم تبریز به مناسبت چهلمین روز شهادت شهدای قم (۱۳۵۶ ه‍.ش)"},{"holiday":false,"month":11,"day":29,"type":"Iran","title":"روز اقتصاد مقاومتی و کارآفرینی"},{"holiday":false,"month":12,"day":3,"type":"Iran","title":"کودتای انگلیسی رضاخان (۱۲۹۹ ه‍.ش)"},{"holiday":false,"month":12,"day":5,"type":"Iran","title":"روز بزرگداشت خواجه‌نصیرالدین طوسی"},{"holiday":false,"month":12,"day":5,"type":"Iran","title":"روز مهندسی"},{"holiday":false,"month":12,"day":8,"type":"Iran","title":"روز امور تربیتی و تربیت اسلامی"},{"holiday":false,"month":12,"day":8,"type":"Iran","title":"روز بزرگداشت حکیم حاج ملاهادی سبزواری"},{"holiday":false,"month":12,"day":8,"type":"Iran","title":"روز حمایت از بیماران نادر"},{"holiday":false,"month":12,"day":9,"type":"Iran","title":"روز حمایت از حقوق مصرف‌کنندگان"},{"holiday":false,"month":12,"day":14,"type":"Iran","title":"روز احسان و نیکوکاری"},{"holiday":false,"month":12,"day":14,"type":"Iran","title":"روز ترویج فرهنگ قرض‌الحسنه"},{"holiday":false,"month":12,"day":15,"type":"Iran","title":"روز درختکاری"},{"holiday":false,"month":12,"day":15,"type":"Iran","title":"روز آموزش همگانی حفظ محیط زیست"},{"holiday":false,"month":12,"day":18,"type":"Iran","title":"روز بزرگداشت سید ‌جمال‌الدین اسدآبادی"},{"holiday":false,"month":12,"day":18,"type":"Iran","title":"سالروز تأسیس کانون‌های فرهنگی‌و‌هنری مساجد کشور"},{"holiday":false,"month":12,"day":18,"type":"Iran","title":"روز بوشهر"},{"holiday":false,"month":12,"day":20,"type":"Iran","title":"روز راهیان نور"},{"holiday":false,"month":12,"day":21,"type":"Iran","title":"روز بزرگداشت نظامی گنجوی"},{"holiday":false,"month":12,"day":22,"type":"Iran","title":"سالروز صدور فرمان حضرت امام خمینی (ره)، مبنی بر تأسیس بنیاد شهید انقلاب اسلامی (۱۳۵۸ ه‍.ش)"},{"holiday":false,"month":12,"day":22,"type":"Iran","title":"روز بزرگداشت شهدا"},{"holiday":false,"month":12,"day":25,"type":"Iran","title":"روز بزرگداشت پروین اعتصامی"},{"holiday":false,"month":12,"day":25,"type":"Iran","title":"بمباران شیمیایی حلبچه به دست ارتش بعث عراق (۱۳۶۶ ه‍.ش)"},{"holiday":true,"month":12,"day":29,"type":"Iran","title":"روز ملی شدن صنعت نفت ایران (۱۳۲۹ ه‍.ش)"},{"holiday":false,"month":1,"day":30,"type":"Iran","title":"روز آزمایشگاهیان"},{"holiday":false,"month":2,"day":9,"type":"Iran","title":"روز روان‌شناس و مشاور"},{"holiday":false,"month":2,"day":15,"type":"Iran","title":"روز صنعت بتن آماده"},{"holiday":false,"month":2,"day":15,"type":"Iran","title":"روز صنعت تهویه مطبوع"},{"holiday":false,"month":2,"day":22,"type":"Iran","title":"روز مشاغل خانگی و تولید خانواده‌محور"},{"holiday":false,"month":2,"day":31,"type":"Iran","title":"روز بوم‌گردی"},{"holiday":false,"month":3,"day":7,"type":"Iran","title":"روز نقشه‌برداری"},{"holiday":false,"month":3,"day":8,"type":"Iran","title":"روز مشاور املاک"},{"holiday":false,"month":3,"day":30,"type":"Iran","title":"روز صنعت موتورسیکلت"},{"holiday":false,"month":4,"day":5,"type":"Iran","title":"روز صنعت ابزارآلات"},{"holiday":false,"month":4,"day":6,"type":"Iran","title":"روز عینک‌سازی و بینایی‌سنجی"},{"holiday":false,"month":4,"day":12,"type":"Iran","title":"روز حمایت از تولید ملی و مبارزه با قاچاق کالا"},{"holiday":false,"month":4,"day":12,"type":"Iran","title":"روز خیاط، صنعت نساجی و پوشاک"},{"holiday":false,"month":4,"day":18,"type":"Iran","title":"روز صنعت قیر و آسفالت"},{"holiday":false,"month":4,"day":30,"type":"Iran","title":"روز خلبان"},{"holiday":false,"month":6,"day":25,"type":"Iran","title":"روز کفاش، صنعت کفش و چرم"},{"holiday":false,"month":7,"day":24,"type":"Iran","title":"روز صنعت آسانسور و پله‌برقی"},{"holiday":false,"month":8,"day":8,"type":"Iran","title":"روز محیط‌بان"},{"holiday":false,"month":8,"day":25,"type":"Iran","title":"روز صنعت نوشت‌افزار"},{"holiday":false,"month":9,"day":1,"type":"Iran","title":"روز صنعت سرب و روی"},{"holiday":false,"month":9,"day":15,"type":"Iran","title":"روز حسابدار"},{"holiday":false,"month":9,"day":18,"type":"Iran","title":"روز سد و نیروگاه برق‌آبی"},{"holiday":false,"month":9,"day":22,"type":"Iran","title":"روز صنعت مس"},{"holiday":false,"month":10,"day":1,"type":"Iran","title":"روز آرایشگر"},{"holiday":false,"month":10,"day":6,"type":"Iran","title":"روز دفاتر اسناد رسمی"},{"holiday":false,"month":10,"day":8,"type":"Iran","title":"روز صنعت سیمان"},{"holiday":false,"month":10,"day":20,"type":"Iran","title":"روز قناد، صنعت شیرینی و شکلات"},{"holiday":false,"month":10,"day":29,"type":"Iran","title":"روز معاینه فنی خودرو"},{"holiday":false,"month":11,"day":11,"type":"Iran","title":"روز ویراستار"},{"holiday":false,"month":12,"day":10,"type":"Iran","title":"روز بازاریاب و مدیر فروش"},{"holiday":false,"month":12,"day":16,"type":"Iran","title":"روز کارشناس و متخصص تغذیه"},{"holiday":false,"month":12,"day":21,"type":"Iran","title":"روز خادمان آرامستان"},{"holiday":false,"month":12,"day":23,"type":"Iran","title":"روز صنعت طلا، جواهر، نقره و گوهرسنگ‌ها"},{"holiday":false,"month":1,"day":1,"type":"AncientIran","title":"جشن نوروز، نوروز جمشیدی (جمشید پیشدادی) - ابتدای بهار"},{"holiday":false,"month":1,"day":6,"type":"AncientIran","title":"نوروز بزرگ (هودرو)، زادروز آشو زرتشت - روییدن مشی و مشیانه"},{"holiday":false,"month":1,"day":7,"type":"AncientIran","title":"آیین نیایش پیر هریشت از ۷ تا ۱۱ فروردین"},{"holiday":false,"month":1,"day":13,"type":"AncientIran","title":"سیزده نوروز، سیزده‌بدر"},{"holiday":false,"month":1,"day":19,"type":"AncientIran","title":"جشن فرودینگان"},{"holiday":false,"month":2,"day":2,"type":"AncientIran","title":"جشن اردیبهشتگان، پوشیدن لباس سپید به نشانه پاکی"},{"holiday":false,"month":2,"day":10,"type":"AncientIran","title":"جشن چلمو (چله بهار) - گاهان بار میدیوزرم‌گاه از ۱۰ تا ۱۴ اردیبهشت"},{"holiday":false,"month":2,"day":18,"type":"AncientIran","title":"جشن پنجاه بدر"},{"holiday":false,"month":2,"day":25,"type":"AncientIran","title":"بزرگداشت استاد توس فردوسی بزرگ"},{"holiday":false,"month":3,"day":4,"type":"AncientIran","title":"جشن خوردادگان، امشاسپند خورداد نگاهبان آبها"},{"holiday":false,"month":3,"day":24,"type":"AncientIran","title":"آیین نیایش ستی پیر و پیر سبز (چک چک)"},{"holiday":false,"month":3,"day":29,"type":"AncientIran","title":"جشن ابتدای تیر ماه، آب پاشونک"},{"holiday":false,"month":4,"day":2,"type":"AncientIran","title":"آیین نیایش پیر نارستانه"},{"holiday":false,"month":4,"day":8,"type":"AncientIran","title":"گاهان بار میدیوشهیم‌گاه از ۸ تا ۱۲ تیر"},{"holiday":false,"month":4,"day":10,"type":"AncientIran","title":"جشن تیرگان، آب پاشونک"},{"holiday":false,"month":4,"day":13,"type":"AncientIran","title":"آیین نیایش پارس بانو از ۱۳ تا ۱۷ تیر"},{"holiday":false,"month":5,"day":3,"type":"AncientIran","title":"جشن امردادگان، امشاسپند امرداد نگاهبان رستنی‌ها"},{"holiday":false,"month":5,"day":6,"type":"AncientIran","title":"جشن چلهٔ تابستان"},{"holiday":false,"month":5,"day":12,"type":"AncientIran","title":"آیین نیایش پیر نارکی از ۱۲ تا ۱۶ مرداد"},{"holiday":false,"month":5,"day":30,"type":"AncientIran","title":"جشن شهریورگان، امشاسپند شهریور نگاهبان فلزات"},{"holiday":false,"month":6,"day":3,"type":"AncientIran","title":"جشن خزان"},{"holiday":false,"month":6,"day":21,"type":"AncientIran","title":"گاهان‌بار پتیه‌شهیم‌گاه از ۲۱ تا ۲۵ شهریور"},{"holiday":false,"month":7,"day":10,"type":"AncientIran","title":"جشن مهرگان"},{"holiday":false,"month":8,"day":4,"type":"AncientIran","title":"جشن آبانگان"},{"holiday":false,"month":8,"day":7,"type":"AncientIran","title":"روز کوروش بزرگ"},{"holiday":false,"month":8,"day":9,"type":"AncientIran","title":"جشن پاییزانه"},{"holiday":false,"month":8,"day":21,"type":"AncientIran","title":"جشن گالشی"},{"holiday":false,"month":9,"day":3,"type":"AncientIran","title":"جشن آذرگان"},{"holiday":false,"month":9,"day":25,"type":"AncientIran","title":"اولین جشن دی‌گان"},{"holiday":false,"month":9,"day":30,"type":"AncientIran","title":"جشن شب یلدا"},{"holiday":false,"month":10,"day":2,"type":"AncientIran","title":"دومین جشن دی‌گان"},{"holiday":false,"month":10,"day":8,"type":"AncientIran","title":"جشن سیر و سور"},{"holiday":false,"month":10,"day":9,"type":"AncientIran","title":"سومین جشن دی‌گان"},{"holiday":false,"month":10,"day":17,"type":"AncientIran","title":"چهارمین جشن دی‌گان"},{"holiday":false,"month":10,"day":26,"type":"AncientIran","title":"جشن بهمنگان، روز پدر، بهمن (منش نیک) امشاسپند"},{"holiday":false,"month":10,"day":29,"type":"AncientIran","title":"جشن نوسده"},{"holiday":false,"month":11,"day":9,"type":"AncientIran","title":"جشن میانهٔ زمستان"},{"holiday":false,"month":11,"day":10,"type":"AncientIran","title":"جشن سده، آتش افروزی به هنگام غروب آفتاب"},{"holiday":false,"month":11,"day":29,"type":"AncientIran","title":"جشن اسفندگان، روز مادر و روز عشق پاک"},{"holiday":false,"month":12,"day":14,"type":"AncientIran","title":"جشن گلدان (اینجه، رسیدگی به امور نباتات)"}],"Hijri Calendar":[{"holiday":true,"month":1,"day":10,"type":"Afghanistan","title":"روز عاشورا"},{"holiday":true,"month":3,"day":12,"type":"Afghanistan","title":"روز میلاد نبی (ص)"},{"holiday":true,"month":9,"day":1,"type":"Afghanistan","title":"اول ماه مبارک رمضان"},{"holiday":false,"month":9,"day":15,"type":"Afghanistan","title":"روز حمایت از اطفال آسیب‌پذیر، یتیم و بی‌سرپرست"},{"holiday":false,"month":9,"day":27,"type":"Afghanistan","title":"روز گرامیداشت از نزول قرآن عظیم‌الشان"},{"holiday":true,"month":10,"day":1,"type":"Afghanistan","title":"عید سعید فطر"},{"holiday":true,"month":10,"day":2,"type":"Afghanistan","title":"عید سعید فطر، روز دوم"},{"holiday":true,"month":10,"day":3,"type":"Afghanistan","title":"عید سعید فطر، روز سوم"},{"holiday":true,"month":12,"day":9,"type":"Afghanistan","title":"روز عرفه و عید سعید اضحی"},{"holiday":true,"month":12,"day":10,"type":"Afghanistan","title":"روز عرفه و عید سعید اضحی"},{"holiday":true,"month":12,"day":11,"type":"Afghanistan","title":"روز عرفه و عید سعید اضحی"},{"holiday":true,"month":12,"day":12,"type":"Afghanistan","title":"روز عرفه و عید سعید اضحی"},{"holiday":false,"month":1,"day":1,"type":"Iran","title":"آغاز سال هجری قمری"},{"holiday":false,"month":1,"day":2,"type":"Iran","title":"روز امر به معروف و نهی از منکر"},{"holiday":true,"month":1,"day":9,"type":"Iran","title":"تاسوعای حسینی"},{"holiday":true,"month":1,"day":10,"type":"Iran","title":"عاشورای حسینی"},{"holiday":false,"month":1,"day":11,"type":"Iran","title":"روز تجلیل از اسرا و مفقودان"},{"holiday":false,"month":1,"day":12,"type":"Iran","title":"شهادت حضرت امام زین‌العابدین (ع) (۹۵ ه‍.ق)"},{"holiday":false,"month":1,"day":25,"type":"Iran","title":"شهادت حضرت امام زین‌العابدین (ع) (۹۵ ه‍.ق) به روایتی"},{"holiday":false,"month":1,"day":25,"type":"Iran","title":"یاد روز قیام مردم سیستان به خون‌خواهی شهدای کربلا (سال ۶۲ ه‍.ق)"},{"holiday":false,"month":2,"day":3,"type":"Iran","title":"ولادت حضرت امام محمد باقر (ع) (۵۷ ﻫ.ق) به روایتی"},{"holiday":false,"month":2,"day":7,"type":"Iran","title":"شهادت حضرت امام حسن مجتبی (ع) (۵۰ ه‍.ق) به روایتی"},{"holiday":false,"month":2,"day":7,"type":"Iran","title":"روز بزرگداشت سلمان فارسی"},{"holiday":true,"month":2,"day":20,"type":"Iran","title":"اربعین حسینی"},{"holiday":true,"month":2,"day":28,"type":"Iran","title":"رحلت حضرت رسول اکرم (ص) (۱۱ ه‍.ق) – شهادت حضرت امام حسن مجتبی (ع) (۵۰ ه‍.ق)"},{"holiday":false,"month":3,"day":1,"type":"Iran","title":"هجرت رسول اکرم (ص) از مکه به مدینه"},{"holiday":true,"month":3,"day":8,"type":"Iran","title":"شهادت حضرت امام حسن عسکری (ع) (۲۶۰ ه‍.ق) و آغاز امامت حضرت ولی عصر (عج)"},{"holiday":false,"month":3,"day":12,"type":"Iran","title":"ولادت حضرت رسول اکرم (ص) به روایت اهل سنت (۵۳ سال قبل از هجرت)"},{"holiday":false,"month":3,"day":12,"type":"Iran","title":"آغاز هفتهٔ وحدت"},{"holiday":false,"month":3,"day":14,"type":"Iran","title":"روز سیستان و بلوچستان"},{"holiday":false,"month":3,"day":16,"type":"Iran","title":"روز وقف"},{"holiday":true,"month":3,"day":17,"type":"Iran","title":"ولادت حضرت رسول اکرم (ص) (۵۳ سال قبل از هجرت) و روز اخلاق و مهرورزی"},{"holiday":true,"month":3,"day":17,"type":"Iran","title":"ولادت حضرت امام جعفر صادق (ع) مؤسس مذهب جعفری (۸۳ ه‍.ق)"},{"holiday":false,"month":4,"day":4,"type":"Iran","title":"ولادت حضرت عبدالعظیم حسنی (ع)"},{"holiday":false,"month":4,"day":8,"type":"Iran","title":"ولادت حضرت امام حسن عسکری (ع) (۲۳۲ ه‍.ق)"},{"holiday":false,"month":4,"day":10,"type":"Iran","title":"وفات حضرت معصومه (س) (۲۰۱ ه‍.ق)"},{"holiday":false,"month":5,"day":5,"type":"Iran","title":"ولادت حضرت زینب (س) (۵ ه‍.ق) و روز پرستار"},{"holiday":false,"month":5,"day":13,"type":"Iran","title":"شهادت حضرت فاطمهٔ زهرا (س) (۱۱ ه‍.ق) به روایتی"},{"holiday":true,"month":6,"day":3,"type":"Iran","title":"شهادت حضرت فاطمهٔ زهرا (س) (۱۱ ه‍.ق)"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"سالروز وفات حضرت ام‌البنین (س)"},{"holiday":false,"month":6,"day":13,"type":"Iran","title":"روز تکریم مادران و همسران شهدا"},{"holiday":false,"month":6,"day":20,"type":"Iran","title":"روز زن و مادر و ولادت حضرت فاطمهٔ زهرا (س) (سال هشتم قبل از هجرت)"},{"holiday":false,"month":6,"day":20,"type":"Iran","title":"تولد حضرت امام خمینی (ره) رهبر کبیر انقلاب اسلامی (۱۳۲۰ ه‍.ق)"},{"holiday":false,"month":7,"day":1,"type":"Iran","title":"ولادت حضرت امام محمد باقر (ع) (۵۷ ه‍.ق)"},{"holiday":false,"month":7,"day":3,"type":"Iran","title":"شهادت حضرت امام علی النقی الهادی (ع) (۲۵۴ ه‍.ق)"},{"holiday":false,"month":7,"day":10,"type":"Iran","title":"ولادت حضرت امام محمد تقی (ع) «جوادالائمه» (۱۹۵ ه‍.ق)"},{"holiday":true,"month":7,"day":13,"type":"Iran","title":"ولادت حضرت امام علی (ع) (۲۳ سال قبل از هجرت)"},{"holiday":false,"month":7,"day":13,"type":"Iran","title":"روز پدر"},{"holiday":false,"month":7,"day":13,"type":"Iran","title":"آغاز ایام‌البیض (اعتکاف)"},{"holiday":false,"month":7,"day":15,"type":"Iran","title":"ارتحال حضرت زینب (س) (۶۲ ه‍.ق)"},{"holiday":false,"month":7,"day":15,"type":"Iran","title":"تغییر قبلهٔ مسلمین از بیت‌المقدس به مکهٔ معظمه (۲ ه‍.ق)"},{"holiday":false,"month":7,"day":25,"type":"Iran","title":"شهادت حضرت امام موسی کاظم (ع) (۱۸۳ ه‍.ق)"},{"holiday":true,"month":7,"day":27,"type":"Iran","title":"مبعث حضرت رسول اکرم (ص) (۱۳ سال قبل از هجرت)"},{"holiday":false,"month":8,"day":3,"type":"Iran","title":"ولادت حضرت امام حسین (ع) (۴ ه‍.ق) و روز پاسدار"},{"holiday":false,"month":8,"day":4,"type":"Iran","title":"ولادت حضرت ابوالفضل العباس (ع) (۲۶ ه‍.ق) و روز جانباز"},{"holiday":false,"month":8,"day":5,"type":"Iran","title":"ولادت حضرت امام زین‌العابدین (ع) (۳۸ ه‍.ق)"},{"holiday":false,"month":8,"day":5,"type":"Iran","title":"روز صحیفهٔ سجادیه"},{"holiday":false,"month":8,"day":11,"type":"Iran","title":"ولادت حضرت علی اکبر (ع) (۳۳ ه‍.ق) و روز جوان"},{"holiday":true,"month":8,"day":15,"type":"Iran","title":"ولادت حضرت قائم (عج) (۲۵۵ ه‍.ق) و روز جهانی مستضعفان"},{"holiday":false,"month":8,"day":15,"type":"Iran","title":"روز سربازان گمنام حضرت امام زمان (عج)"},{"holiday":false,"month":9,"day":10,"type":"Iran","title":"وفات حضرت خدیجه (س) (۳ سال قبل از هجرت)"},{"holiday":false,"month":9,"day":15,"type":"Iran","title":"ولادت حضرت امام حسن مجتبی (ع) (۳ ه‍.ق) و روز اکرام و تکریم خیرین"},{"holiday":false,"month":9,"day":18,"type":"Iran","title":"شب قدر"},{"holiday":false,"month":9,"day":19,"type":"Iran","title":"ضربت خوردن حضرت امام علی (ع) (۴۰ ه‍.ق)"},{"holiday":false,"month":9,"day":19,"type":"Iran","title":"روز نهج‌البلاغه"},{"holiday":false,"month":9,"day":20,"type":"Iran","title":"شب قدر"},{"holiday":true,"month":9,"day":21,"type":"Iran","title":"شهادت حضرت امام علی (ع) (۴۰ ه‍.ق)"},{"holiday":false,"month":9,"day":22,"type":"Iran","title":"شب قدر"},{"holiday":true,"month":10,"day":1,"type":"Iran","title":"عید سعید فطر"},{"holiday":true,"month":10,"day":2,"type":"Iran","title":"تعطیل به مناسبت عید سعید فطر"},{"holiday":false,"month":10,"day":17,"type":"Iran","title":"روز فرهنگ پهلوانی و ورزش زورخانه‌ای"},{"holiday":false,"month":10,"day":21,"type":"Iran","title":"فتح اندلس به دست مسلمانان (۹۲ ه‍.ق)"},{"holiday":true,"month":10,"day":25,"type":"Iran","title":"شهادت حضرت امام جعفر صادق (ع) (۱۴۸ ه‍.ق)"},{"holiday":false,"month":11,"day":1,"type":"Iran","title":"ولادت حضرت معصومه (س) (۱۷۳ ه‍.ق) و روز دختران"},{"holiday":false,"month":11,"day":1,"type":"Iran","title":"آغاز دههٔ کرامت"},{"holiday":false,"month":11,"day":5,"type":"Iran","title":"روز تجلیل از امامزادگان و بقاع متبرکه"},{"holiday":false,"month":11,"day":5,"type":"Iran","title":"روز بزرگداشت حضرت صالح بن موسی کاظم (ع)"},{"holiday":false,"month":11,"day":6,"type":"Iran","title":"روز بزرگداشت حضرت احمدبن‌موسی شاهچراغ (ع)"},{"holiday":false,"month":11,"day":11,"type":"Iran","title":"ولادت حضرت امام رضا (ع) (۱۴۸ ه‍.ق)"},{"holiday":false,"month":12,"day":1,"type":"Iran","title":"سالروز ازدواج حضرت امام علی (ع) و حضرت فاطمه (س) (۲ ه‍.ق)"},{"holiday":false,"month":12,"day":1,"type":"Iran","title":"روز ازدواج"},{"holiday":false,"month":12,"day":6,"type":"Iran","title":"شهادت مظلومانهٔ زائران خانهٔ خدا به دست مأموران آل سعود (۱۳۶۶ ه‍.ش برابر با ۶ ذی‌الحجه ۱۴۰۷ ه‍.ق)"},{"holiday":false,"month":12,"day":7,"type":"Iran","title":"شهادت حضرت امام محمد باقر (ع) (۱۱۴ ه‍.ق)"},{"holiday":false,"month":12,"day":9,"type":"Iran","title":"روز عرفه (روز نیایش)"},{"holiday":true,"month":12,"day":10,"type":"Iran","title":"عید سعید قربان"},{"holiday":false,"month":12,"day":10,"type":"Iran","title":"آغاز دههٔ امامت و ولایت"},{"holiday":false,"month":12,"day":15,"type":"Iran","title":"ولادت حضرت امام علی النقی الهادی (ع) (۲۱۲ ه‍.ق)"},{"holiday":true,"month":12,"day":18,"type":"Iran","title":"عید سعید غدیر خم (۱۰ ه‍.ق)"},{"holiday":false,"month":12,"day":20,"type":"Iran","title":"ولادت حضرت امام موسی کاظم (ع) (۱۲۸ ه‍.ق)"},{"holiday":false,"month":12,"day":24,"type":"Iran","title":"روز مباهلهٔ پیامبر اسلام (ص) (۱۰ ه‍.ق)"},{"holiday":false,"month":12,"day":25,"type":"Iran","title":"روز خانواده و تکریم بازنشستگان"}],"Gregorian Calendar":[{"holiday":false,"month":1,"day":21,"title":"روز ملی مبارزه علیه مواد انفجاری تعبیه شده","type":"Afghanistan"},{"holiday":false,"month":3,"day":8,"title":"روز جهانی زن","type":"Afghanistan"},{"holiday":false,"month":3,"day":15,"title":"روز جهانی حقوق مستهلک","type":"Afghanistan"},{"holiday":false,"month":3,"day":22,"title":"روز جهانی آب","type":"Afghanistan"},{"holiday":false,"month":3,"day":23,"title":"روز جهانی هواشناسی","type":"Afghanistan"},{"holiday":false,"month":5,"day":1,"title":"روز بین‌المللی کارگر","type":"Afghanistan"},{"holiday":false,"month":5,"day":6,"title":"روز قلم","type":"Afghanistan"},{"holiday":false,"month":5,"day":17,"title":"روز جهانی تیلی‌کمیونیکیشن","type":"Afghanistan"},{"holiday":false,"month":5,"day":18,"title":"روز بین‌المللی موزیم‌ها","type":"Afghanistan"},{"holiday":false,"month":6,"day":1,"title":"روز بین‌المللی طفل","type":"Afghanistan"},{"holiday":false,"month":6,"day":5,"title":"هفتهٔ محیط زیست (۵-۱۱ جون)","type":"Afghanistan"},{"holiday":false,"month":6,"day":20,"title":"روز بین‌المللی پناهنده‌گان","type":"Afghanistan"},{"holiday":false,"month":6,"day":23,"title":"روز جهانی المپیک","type":"Afghanistan"},{"holiday":false,"month":6,"day":26,"title":"هفتهٔ مبارزه علیه مواد مخدر، روز جهانی مبارزه علیه مواد مخدر","type":"Afghanistan"},{"holiday":false,"month":7,"day":11,"title":"روز جهانی نفوس","type":"Afghanistan"},{"holiday":false,"month":8,"day":1,"title":"هفتهٔ تغذیه از شیر مادر (۱-۷ آگست)","type":"Afghanistan"},{"holiday":false,"month":8,"day":21,"title":"روز بین المللی یادبود و گرامیداشت از قربانیان تروریزم","type":"Afghanistan"},{"holiday":false,"month":9,"day":8,"title":"روز بین‌المللی سواد","type":"Afghanistan"},{"holiday":false,"month":9,"day":21,"title":"روز جهانی صلح","type":"Afghanistan"},{"holiday":false,"month":9,"day":27,"title":"روز جهانی توریزم","type":"Afghanistan"},{"holiday":false,"month":10,"day":5,"title":"روز جهانی معلم","type":"Afghanistan"},{"holiday":false,"month":10,"day":9,"title":"روز جهانی پست","type":"Afghanistan"},{"holiday":false,"month":10,"day":12,"title":"روز جهانی کاهش خطرپذیری","type":"Afghanistan"},{"holiday":false,"month":10,"day":16,"title":"روز جهانی غذا","type":"Afghanistan"},{"holiday":false,"month":10,"day":24,"title":"روز جهانی ملل متحد","type":"Afghanistan"},{"holiday":false,"month":11,"day":17,"title":"روز جهانی محصلان","type":"Afghanistan"},{"holiday":false,"month":12,"day":7,"title":"روز جهانی هوانوردی","type":"Afghanistan"},{"holiday":false,"month":12,"day":18,"title":"روز جهانی مهاجرت","type":"Afghanistan"},{"holiday":false,"month":12,"day":28,"title":"روز جهانی سینما","type":"Afghanistan"},{"holiday":false,"month":1,"day":1,"title":"آغاز سال میلادی","type":"Iran"},{"holiday":false,"month":1,"day":26,"title":"روز جهانی گمرک","type":"Iran"},{"holiday":false,"month":3,"day":22,"title":"روز جهانی آب","type":"Iran"},{"holiday":false,"month":3,"day":23,"title":"روز جهانی هواشناسی","type":"Iran"},{"holiday":false,"month":4,"day":5,"title":"روز جهانی کودک فلسطینی","type":"Iran"},{"holiday":false,"month":5,"day":1,"title":"روز جهانی کار و کارگر","type":"Iran"},{"holiday":false,"month":5,"day":5,"title":"روز جهانی ماما","type":"Iran"},{"holiday":false,"month":5,"day":8,"title":"روز جهانی صلیب سرخ و هلال احمر","type":"Iran"},{"holiday":false,"month":5,"day":18,"title":"روز جهانی موزه و میراث فرهنگی","type":"Iran"},{"holiday":false,"month":5,"day":31,"title":"روز جهانی بدون دخانیات","type":"Iran"},{"holiday":false,"month":6,"day":1,"title":"روز جهانی والدین","type":"Iran"},{"holiday":false,"month":6,"day":5,"title":"روز جهانی محیط زیست","type":"Iran"},{"holiday":false,"month":6,"day":17,"title":"روز جهانی بیابان‌زدایی","type":"Iran"},{"holiday":false,"month":6,"day":26,"title":"روز جهانی مبارزه با مواد مخدر","type":"Iran"},{"holiday":false,"month":8,"day":1,"title":"روز جهانی شیر مادر","type":"Iran"},{"holiday":false,"month":8,"day":6,"title":"انفجار بمب اتمی آمریکا در هیروشیما با بیش از ۱۶۰هزار کشته و مجروح (۱۹۴۵ میلادی)","type":"Iran"},{"holiday":false,"month":8,"day":21,"title":"روز جهانی مسجد","type":"Iran"},{"holiday":false,"month":9,"day":27,"title":"روز جهانی جهانگردی","type":"Iran"},{"holiday":false,"month":9,"day":30,"title":"روز جهانی دریانوردی","type":"Iran"},{"holiday":false,"month":9,"day":30,"title":"روز جهانی ناشنوایان","type":"Iran"},{"holiday":false,"month":10,"day":1,"title":"روز جهانی سالمندان","type":"Iran"},{"holiday":false,"month":10,"day":8,"title":"روز جهانی کودک","type":"Iran"},{"holiday":false,"month":10,"day":9,"title":"روز جهانی پست","type":"Iran"},{"holiday":false,"month":10,"day":14,"title":"روز جهانی استاندارد","type":"Iran"},{"holiday":false,"month":10,"day":15,"title":"روز جهانی نابینایان (عصای سفید)","type":"Iran"},{"holiday":false,"month":10,"day":16,"title":"روز جهانی غذا","type":"Iran"},{"holiday":false,"month":11,"day":10,"title":"روز جهانی علم در خدمت صلح و توسعه","type":"Iran"},{"holiday":false,"month":12,"day":1,"title":"روز جهانی مبارزه با ایدز","type":"Iran"},{"holiday":false,"month":12,"day":3,"title":"روز جهانی معلولان","type":"Iran"},{"holiday":false,"month":12,"day":7,"title":"روز جهانی هواپیمایی","type":"Iran"},{"holiday":false,"month":12,"day":25,"title":"ولادت حضرت عیسی مسیح (ع)","type":"Iran"},{"holiday":false,"month":1,"day":4,"title":"روز جهانی بریل","type":"International"},{"holiday":false,"month":1,"day":24,"title":"روز جهانی آموزش","type":"International"},{"holiday":false,"month":2,"day":2,"title":"روز جهانی تالاب‌ها","type":"International"},{"holiday":false,"month":2,"day":4,"title":"روز جهانی سرطان","type":"International"},{"holiday":false,"month":2,"day":6,"title":"روز جهانی مبارزه با ناقص‌سازی زنان","type":"International"},{"holiday":false,"month":2,"day":10,"title":"روز جهانی حبوبات","type":"International"},{"holiday":false,"month":2,"day":11,"title":"روز جهانی زن و دختر در علم","type":"International"},{"holiday":false,"month":2,"day":13,"title":"روز جهانی رادیو","type":"International"},{"holiday":false,"month":2,"day":20,"title":"روز جهانی عدالت اجتماعی","type":"International"},{"holiday":false,"month":2,"day":21,"title":"روز جهانی زبان مادری","type":"International"},{"holiday":false,"month":3,"day":1,"title":"روز جهانی بدون تبعیض","type":"International"},{"holiday":false,"month":3,"day":3,"title":"روز جهانی حیات وحش","type":"International"},{"holiday":false,"month":3,"day":8,"title":"روز جهانی زن","type":"International"},{"holiday":false,"month":3,"day":20,"title":"روز جهانی شادی","type":"International"},{"holiday":false,"month":3,"day":21,"title":"روز جهانی شعر","type":"International"},{"holiday":false,"month":3,"day":21,"title":"روز جهانی سندروم داون","type":"International"},{"holiday":false,"month":3,"day":21,"title":"روز بین‌المللی جنگل‌ها","type":"International"},{"holiday":false,"month":3,"day":24,"title":"روز جهانی سل","type":"International"},{"holiday":false,"month":3,"day":24,"title":"روز بین‌المللی حق بر صحت و درستی دربارهٔ نقض فاحش حقوق بشر و منزلت قربانیان","type":"International"},{"holiday":false,"month":3,"day":25,"title":"روز بین‌المللی یادبود قربانیان بردگی و تجارت برده از آن سوی اقیانوس اطلس","type":"International"},{"holiday":false,"month":3,"day":27,"title":"روز جهانی تئاتر","type":"International"},{"holiday":false,"month":4,"day":2,"title":"روز جهانی کتاب کودک","type":"International"},{"holiday":false,"month":4,"day":7,"title":"روز جهانی کارتونیست‌ها","type":"International"},{"holiday":false,"month":4,"day":7,"title":"روز جهانی سلامت","type":"International"},{"holiday":false,"month":4,"day":15,"title":"روز جهانی هنر (سالروز تولد داوینچی)","type":"International"},{"holiday":false,"month":4,"day":19,"title":"روز جهانی کبد","type":"International"},{"holiday":false,"month":4,"day":22,"title":"روز جهانی زمین پاک","type":"International"},{"holiday":false,"month":4,"day":23,"title":"روز جهانی کتاب و حق مؤلف","type":"International"},{"holiday":false,"month":4,"day":25,"title":"روز جهانی مالاریا","type":"International"},{"holiday":false,"month":4,"day":27,"title":"روز جهانی گرافیک","type":"International"},{"holiday":false,"month":4,"day":28,"title":"روز جهانی ایمنی و بهداشت حرفه‌ای","type":"International"},{"holiday":false,"month":5,"day":3,"title":"روز جهانی آزادی مطبوعات","type":"International"},{"holiday":false,"month":5,"day":12,"title":"روز جهانی پرستار","type":"International"},{"holiday":false,"month":5,"day":12,"title":"روز جهانی زنان در ریاضیات","type":"International"},{"holiday":false,"month":5,"day":15,"title":"روز جهانی خانواده","type":"International"},{"holiday":false,"month":5,"day":16,"title":"روز جهانی پسران","type":"International"},{"holiday":false,"month":5,"day":20,"title":"روز جهانی زنبور","type":"International"},{"holiday":false,"month":5,"day":29,"title":"روز جهانی حافظان صلح ملل متحد","type":"International"},{"holiday":false,"month":6,"day":4,"title":"روز جهانی حمایت از کودکان قربانی خشونت","type":"International"},{"holiday":false,"month":6,"day":10,"title":"روز جهانی صنایع دستی","type":"International"},{"holiday":false,"month":6,"day":12,"title":"روز جهانی منع کار کودکان","type":"International"},{"holiday":false,"month":6,"day":14,"title":"روز جهانی اهدای خون","type":"International"},{"holiday":false,"month":6,"day":20,"title":"روز جهانی پناهندگان","type":"International"},{"holiday":false,"month":6,"day":21,"title":"روز جهانی موسیقی","type":"International"},{"holiday":false,"month":6,"day":26,"title":"روز جهانی قربانیان خشونت","type":"International"},{"holiday":false,"month":7,"day":11,"title":"روز جهانی جمعیت","type":"International"},{"holiday":false,"month":8,"day":12,"title":"روز جهانی جوانان","type":"International"},{"holiday":false,"month":8,"day":13,"title":"روز جهانی چپ‌دستان","type":"International"},{"holiday":false,"month":8,"day":19,"title":"روز جهانی انسان دوستی","type":"International"},{"holiday":false,"month":8,"day":19,"title":"روز جهانی عکاسی","type":"International"},{"holiday":false,"month":8,"day":29,"title":"روز جهانی مبارزه با آزمایش‌های هسته‌ای","type":"International"},{"holiday":false,"month":9,"day":8,"title":"روز جهانی باسوادی","type":"International"},{"holiday":false,"month":9,"day":10,"title":"روز جهانی جلوگیری از خودکشی","type":"International"},{"holiday":false,"month":9,"day":15,"title":"روز جهانی مردم‌سالاری","type":"International"},{"holiday":false,"month":9,"day":16,"title":"روز جهانی حفاظت از لایهٔ اُزن","type":"International"},{"holiday":false,"month":9,"day":21,"title":"روز جهانی آلزایمر","type":"International"},{"holiday":false,"month":9,"day":21,"title":"روز جهانی صلح","type":"International"},{"holiday":false,"month":9,"day":30,"title":"روز جهانی ترجمه","type":"International"},{"holiday":false,"month":10,"day":1,"title":"روز بین‌المللی قهوه","type":"International"},{"holiday":false,"month":10,"day":5,"title":"روز جهانی معلم","type":"International"},{"holiday":false,"month":10,"day":10,"title":"روز جهانی بهداشت روان","type":"International"},{"holiday":false,"month":10,"day":11,"title":"روز جهانی دختران","type":"International"},{"holiday":false,"month":10,"day":24,"title":"روز ملل متحد و روز جهانی توسعه اطلاعات","type":"International"},{"holiday":false,"month":10,"day":25,"title":"روز جهانی هنرمند","type":"International"},{"holiday":false,"month":10,"day":27,"title":"روز جهانی میراث سمعی و بصری","type":"International"},{"holiday":false,"month":10,"day":27,"title":"روز جهانی کاردرمانی","type":"International"},{"holiday":false,"month":10,"day":31,"title":"روز جهانی شهرها","type":"International"},{"holiday":false,"month":10,"day":31,"title":"جشن هالووین","type":"International"},{"holiday":false,"month":11,"day":6,"title":"روز بین‌المللی پیشگیری از سوء استفاده از محیط زیست در جنگ و مناقشات مسلحانه","type":"International"},{"holiday":false,"month":11,"day":10,"title":"روز جهانی حسابداری","type":"International"},{"holiday":false,"month":11,"day":14,"title":"روز جهانی دیابت","type":"International"},{"holiday":false,"month":11,"day":19,"title":"روز جهانی مرد","type":"International"},{"holiday":false,"month":11,"day":21,"title":"روز جهانی تلویزیون","type":"International"},{"holiday":false,"month":11,"day":25,"title":"روز جهانی مبارزه با خشونت علیه زنان","type":"International"},{"holiday":false,"month":11,"day":29,"title":"روز جهانی همبستگی با مردم فلسطین","type":"International"},{"holiday":false,"month":12,"day":2,"title":"روز جهانی لغو برده‌داری","type":"International"},{"holiday":false,"month":12,"day":5,"title":"روز جهانی داوطلبان پیشرفت اجتماعی","type":"International"},{"holiday":false,"month":12,"day":9,"title":"روز جهانی مبارزه با فساد","type":"International"},{"holiday":false,"month":12,"day":10,"title":"روز جهانی حقوق بشر","type":"International"},{"holiday":false,"month":12,"day":11,"title":"روز جهانی کوهستان","type":"International"}],"Nepali Calendar":[],"Irregular Recurring":[{"calendar":"Persian","rule":"nth weekday of month","nth":2,"weekday":7,"month":1,"type":"Afghanistan","title":"هفتهٔ جیولوجست‌های افغانستان (هفتهٔ دوم حمل)","holiday":false},{"calendar":"Persian","rule":"last weekday of month","weekday":7,"month":2,"type":"Afghanistan","title":"هفتهٔ کتاب‌خوانی (هفتهٔ اخیر ثور)","holiday":false},{"calendar":"Persian","rule":"nth weekday of month","nth":2,"weekday":6,"month":7,"type":"Iran","title":"آیین مذهبی قالیشویان اردهال - بزرگداشت امامزاده علی بن محمدباقر (ع) (دومین جمعهٔ مهر)","holiday":false},{"calendar":"Persian","rule":"single event","year":1401,"month":8,"day":3,"type":"Iran","title":"خورشیدگرفتگی جزئی قابل مشاهده در ایران","holiday":false},{"calendar":"Hijri","rule":"end of month","month":2,"type":"Iran","title":"شهادت حضرت امام رضا (ع) (۲۰۳ ه‍.ق) (۳۰ صَفَر یا انتهای ماه)","holiday":true},{"calendar":"Hijri","rule":"end of month","month":11,"type":"Iran","title":"شهادت حضرت امام محمد تقی (ع) (۲۲۰ ه‍.ق) (۳۰ ذی‌القعده یا انتهای ماه)","holiday":false},{"calendar":"Hijri","rule":"last weekday of month","weekday":6,"month":9,"type":"Iran","title":"روز جهانی قدس (آخرین جمعهٔ رمضان)","holiday":false},{"calendar":"Persian","rule":"last weekday of month","weekday":4,"offset":-1,"month":12,"type":"Iran","title":"روز تکریم همسایگان (شب آخرین چهارشنبهٔ سال)","holiday":false},{"calendar":"Persian","rule":"last weekday of month","weekday":3,"month":12,"type":"AncientIran","title":"چهارشنبه‌سوری (آخرین سه‌شنبهٔ سال)","holiday":false},{"calendar":"Gregorian","rule":"nth weekday of month","nth":3,"weekday":5,"month":11,"type":"International","title":"روز جهانی فلسفه (سومین پنجشنبهٔ نوامبر)","holiday":false},{"calendar":"Gregorian","rule":"last weekday of month","weekday":1,"month":1,"type":"International","title":"روز جهانی کمک به جذامیان (آخرین یکشنبهٔ ژانویه)","holiday":false},{"calendar":"Gregorian","rule":"last weekday of month","weekday":6,"month":11,"type":"International","title":"جمعهٔ سیاه یا بلک فرایدی (آخرین جمعهٔ نوامبر)","holiday":false},{"calendar":"Gregorian","rule":"nth day from","nth":256,"month":1,"day":1,"type":"International","title":"روز جهانی برنامه‌نویس (روز ۲۵۶م سال میلادی)","holiday":false}]}'
    );
    function hijriToJalali(t, a, e) {
      const [n, i, l] = ((t, a, e) => {
        if (a < 1 || a > 12 || e < 1 || e > 30) throw new Error('Invalid Hijri date');
        return (t => {
          const a = Math.floor(t + 0.5),
            e = Math.floor((a - 1867216.25) / 36524.25),
            n = a + 1 + e - Math.floor(e / 4) + 1524,
            i = Math.floor((n - 122.1) / 365.25),
            l = Math.floor(365.25 * i),
            o = Math.floor((n - l) / 30.6001),
            d = Math.floor(n - l - Math.floor(30.6001 * o));
          let r = o - 1 - 12 * Math.floor(o / 14),
            y = i - 4715 - Math.floor((7 + r) / 10);
          return r < 1 && ((r += 12), (y -= 1)), [y, r, d];
        })(Math.floor(354.367 * (t - 1)) + Math.floor(29.5 * (a - 1)) + (e - 1) + 1948439.5);
      })(t, a, e);
      return ((t, a, e) => {
        const n = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
          i = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29];
        (t = parseInt(t.toString())),
          (a = parseInt(a.toString())),
          (e = parseInt(e.toString())),
          (n[1] = (t % 4 == 0 && t % 100 != 0) || t % 400 == 0 ? 29 : 28);
        let l = e;
        for (let t = 0; t < a - 1; t++) l += n[t];
        const o =
            Math.floor((1461 * (t + Math.floor((a - 8) / 6) + 100100)) / 4) +
            Math.floor((153 * (((a + 9) % 12) + 1)) / 5) +
            e -
            34840408,
          d = o % 1461,
          r = Math.floor(o / 1461) - 2820 + 474;
        let y = d;
        y >= 366 && ((y -= 366), Math.floor(y / 365), (y %= 365));
        let s = 0,
          h = y;
        for (; h >= i[s]; ) (h -= i[s]), s++;
        return [r, s + 1, h + 1];
      })(n, i, l);
    }
    const i = [
      { title: 'عید نوروز', month: 1, day: 1, type: 'Iran', holiday: !0 },
      { title: 'روز طبیعت', month: 1, day: 13, type: 'Iran', holiday: !0 },
      { title: 'عید فطر', month: 4, day: 5, type: 'Religious', holiday: !0 },
      { title: 'عید قربان', month: 6, day: 10, type: 'Religious', holiday: !0 },
      { title: 'تاسوعا', month: 7, day: 9, type: 'Religious', holiday: !0 },
      { title: 'عاشورا', month: 7, day: 10, type: 'Religious', holiday: !0 },
    ];
    function mapPersianCalendarEvents() {
      try {
        let t = [];
        if (
          (n &&
            Array.isArray(n['Persian Calendar']) &&
            (t = [
              ...n['Persian Calendar'].map(t => ({
                title: t.title,
                month: t.month,
                day: t.day,
                type: t.type,
                holiday: t.holiday,
              })),
            ]),
          n && Array.isArray(n['Hijri Calendar']))
        ) {
          const a = new Date(),
            i = e.gregorianToJalali(a.getFullYear(), a.getMonth() + 1, a.getDate())[0],
            l = [];
          n['Hijri Calendar'].forEach(t => {
            const a = ((t, a, e) => {
              new Date();
              const n = Math.floor(t - 621.5 + 0.74 * (t - 621.5)) - 202;
              for (let i = 0; i <= 1; i++)
                try {
                  const l = n + i,
                    [o, d, r] = hijriToJalali(l, a, e);
                  if (o === t) return [d, r];
                } catch (t) {}
              return null;
            })(i, t.month, t.day);
            if (a) {
              const [e, n] = a;
              l.push({
                title: t.title,
                month: e,
                day: n,
                type: t.type,
                holiday: t.holiday,
                originalHijriMonth: t.month,
                originalHijriDay: t.day,
              });
            }
          }),
            (t = [...t, ...l]);
        }
        return 0 === t.length ? i : t;
      } catch (t) {
        return i;
      }
    }
    const l = mapPersianCalendarEvents(),
      o = {
        getAllEvents(t, a = !1) {
          let e = [...l];
          return t && t.length > 0 && !a && (e = e.filter(a => t.includes(a.type))), e;
        },
        getEvents(t, a, e, n = !1) {
          return this.getAllEvents(e, n).filter(e => e.month === t && e.day === a);
        },
        isHoliday(t, a, e, n = !1) {
          return this.getEvents(t, a, e, n).some(t => !0 === t.holiday);
        },
        getHolidayTitles(t, a, e, n = !1) {
          return this.getEvents(t, a, e, n)
            .filter(t => !0 === t.holiday)
            .map(t => t.title);
        },
        getAllEventTitles(t, a, e, n = !1) {
          return this.getEvents(t, a, e, n).map(t => t.title);
        },
        getEventsByType(t, a = !1, e = !1) {
          const n = a ? l : l.filter(a => a.type === t);
          return e ? n.filter(t => !0 === t.holiday) : n;
        },
        getAllHolidays(t, a = !1) {
          return this.getAllEvents(t, a).filter(t => !0 === t.holiday);
        },
        getEventTypes() {
          const t = new Set();
          return l.forEach(a => t.add(a.type)), Array.from(t);
        },
        getSourceMetadata: () => n.Source || {},
        refreshEvents() {
          const t = mapPersianCalendarEvents();
          for (; l.length > 0; ) l.pop();
          return t.forEach(t => l.push(t)), [...l];
        },
      },
      d = ['Iran', 'Religious'];
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
          'show-month-selector',
          'show-year-selector',
          'show-prev-button',
          'show-next-button',
          'show-today-button',
          'show-tomorrow-button',
        ];
      }
      constructor(t = {}) {
        super(),
          (this.jalaliYear = 0),
          (this.jalaliMonth = 0),
          (this.jalaliDay = 0),
          (this.selectedDate = null),
          (this.showHolidays = !0),
          (this.holidayTypes = [...d]),
          (this.includeAllTypes = !1),
          (this.isTransitioning = !1),
          (this._documentClickHandler = () => {}),
          (this.persianMonths = [
            'فروردین',
            'اردیبهشت',
            'خرداد',
            'تیر',
            'مرداد',
            'شهریور',
            'مهر',
            'آبان',
            'آذر',
            'دی',
            'بهمن',
            'اسفند',
          ]),
          (this.handleInputClick = t => {
            t.stopPropagation(), this.toggleCalendar();
          }),
          (this.handleDocumentClick = t => {
            this.calendar &&
              this.calendar.classList.contains('visible') &&
              (t.composedPath().includes(this) ||
                (this.closeAllDropdowns(), this.toggleCalendar()));
          }),
          (this.options = t);
        const a = this.attachShadow({ mode: 'open' });
        this.render(a), t.holidayTypes && this.setHolidayTypes(t.holidayTypes);
      }
      connectedCallback() {
        try {
          if (!this.shadowRoot) return;
          this.initializeDomReferences(),
            this.initializeCurrentDate(),
            this.initializeUIComponents(),
            this.addEventListeners(),
            this.initTouchGestures(),
            this.renderCalendar();
        } catch (t) {}
      }
      disconnectedCallback() {
        this._documentClickHandler &&
          document.removeEventListener('click', this._documentClickHandler),
          PersianDatePickerElement.openCalendarInstance === this &&
            (PersianDatePickerElement.openCalendarInstance = null),
          [this.input, this.calendar, this.daysContainer, this.dayNamesContainer].forEach(t => {
            if (t) {
              const a = t.cloneNode(!1);
              t.parentNode && t.parentNode.replaceChild(a, t);
            }
          });
      }
      attributeChangedCallback(t, a, e) {
        if (a !== e && this.shadowRoot)
          switch (t) {
            case 'placeholder':
              this.input && (this.input.placeholder = e || '');
              break;
            case 'rtl':
              this.style.setProperty(
                '--jdp-direction',
                null !== e && 'false' !== e ? 'rtl' : 'ltr'
              );
              break;
            case 'show-holidays':
              (this.showHolidays = null !== e && 'false' !== e),
                this.calendar && this.renderCalendar();
              break;
            case 'holiday-types':
              e
                ? this.setHolidayTypes(e)
                : ((this.holidayTypes = [...d]), (this.includeAllTypes = !1)),
                this.calendar && this.renderCalendar();
              break;
            case 'today-button-text':
            case 'tomorrow-button-text':
              this.updateButtonText(t, e);
              break;
            case 'today-button-class':
            case 'tomorrow-button-class':
              this.updateButtonClass(t, e);
              break;
            case 'show-month-selector':
            case 'show-year-selector':
            case 'show-prev-button':
            case 'show-next-button':
            case 'show-today-button':
            case 'show-tomorrow-button':
              this.shadowRoot &&
                (this.render(this.shadowRoot),
                this.initializeDomReferences(),
                this.initializeUIComponents(),
                this.addEventListeners(),
                this.renderCalendar());
          }
      }
      updateButtonText(t, a) {
        if (!this.shadowRoot) return;
        const e = 'today-button-text' === t ? 'امروز' : 'فردا',
          n = this.shadowRoot.getElementById(
            'today-button-text' === t ? 'today-button' : 'tomorrow-button'
          );
        n && (n.textContent = a || e);
      }
      updateButtonClass(t, a) {
        if (!this.shadowRoot) return;
        const e = 'today-button-class' === t ? 'today-button' : 'tomorrow-button',
          n = this.shadowRoot.getElementById(
            'today-button-class' === t ? 'today-button' : 'tomorrow-button'
          );
        n &&
          ((n.className = `date-nav-button ${e}`),
          a &&
            a.split(' ').forEach(t => {
              t.trim() && n.classList.add(t.trim());
            }));
      }
      initializeDomReferences() {
        if (this.shadowRoot) {
          if (
            ((this.input = this.shadowRoot.getElementById('date-input')),
            (this.calendar = this.shadowRoot.getElementById('calendar')),
            (this.daysContainer = this.shadowRoot.getElementById('days-container')),
            (this.dayNamesContainer = this.shadowRoot.getElementById('day-names')),
            !(this.input && this.calendar && this.daysContainer && this.dayNamesContainer))
          )
            throw new Error('Failed to initialize required elements');
          if (this.options.placeholder) this.input.placeholder = this.options.placeholder;
          else {
            const t = this.getAttribute('placeholder');
            t && (this.input.placeholder = t);
          }
        }
      }
      initializeCurrentDate() {
        const t = new Date(),
          a = e.gregorianToJalali(t.getFullYear(), t.getMonth() + 1, t.getDate());
        (this.jalaliYear = a[0]),
          (this.jalaliMonth = a[1]),
          (this.jalaliDay = a[2]),
          (this.selectedDate = null);
      }
      initializeUIComponents() {
        this.initializeDayNames(), this.setupMonthYearSelectors(), o.refreshEvents();
      }
      initializeDayNames() {
        this.dayNamesContainer &&
          ((this.dayNamesContainer.innerHTML = ''),
          ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].forEach(t => {
            const a = document.createElement('div');
            a.classList.add('day-name'), (a.textContent = t), this.dayNamesContainer.appendChild(a);
          }));
      }
      setupMonthYearSelectors() {
        if (!this.shadowRoot) return;
        const t = this.shadowRoot.getElementById('month-select-trigger'),
          a = this.shadowRoot.getElementById('year-select-trigger'),
          n = this.shadowRoot.getElementById('month-select-value'),
          i = this.shadowRoot.getElementById('year-select-value'),
          l = this.shadowRoot.getElementById('month-select-content'),
          o = this.shadowRoot.getElementById('year-select-content');
        if (!(t && a && n && i && l && o)) return;
        (l.innerHTML = ''),
          (o.innerHTML = ''),
          this.persianMonths.forEach((t, a) => {
            const e = a + 1,
              i = document.createElement('div');
            i.classList.add('select-item'),
              (i.textContent = t),
              (i.dataset.value = e.toString()),
              e === this.jalaliMonth && (i.classList.add('selected'), (n.textContent = t)),
              i.addEventListener('click', a => {
                a.stopPropagation(), this.handleMonthChange(e, t), this.closeAllDropdowns();
              }),
              l.appendChild(i);
          });
        const d = new Date(),
          r = e.gregorianToJalali(d.getFullYear(), d.getMonth() + 1, d.getDate())[0],
          y = r + 50;
        for (let t = r - 100; t <= y; t++) {
          const a = document.createElement('div');
          a.classList.add('select-item'),
            (a.textContent = t.toString()),
            (a.dataset.value = t.toString()),
            t === this.jalaliYear && (a.classList.add('selected'), (i.textContent = t.toString())),
            a.addEventListener('click', a => {
              a.stopPropagation(), this.handleYearChange(t), this.closeAllDropdowns();
            }),
            o.appendChild(a);
        }
        t.addEventListener('click', t => {
          t.stopPropagation(), this.toggleDropdown(l);
        }),
          a.addEventListener('click', t => {
            t.stopPropagation(), this.toggleDropdown(o);
          }),
          l.addEventListener('click', t => {
            t.stopPropagation();
          }),
          o.addEventListener('click', t => {
            t.stopPropagation();
          });
      }
      addEventListeners() {
        this.shadowRoot &&
          this.input &&
          this.calendar &&
          (this.input.addEventListener('click', this.handleInputClick),
          this.setupNavigationButtons(),
          this.calendar.addEventListener('click', t => t.stopPropagation()),
          this.calendar.addEventListener('click', t => {
            const a = t.target;
            a.closest('.select-trigger') ||
              a.closest('.select-content') ||
              this.closeAllDropdowns();
          }),
          (this._documentClickHandler = this.handleDocumentClick.bind(this)),
          document.addEventListener('click', this._documentClickHandler));
      }
      setupNavigationButtons() {
        if (!this.shadowRoot) return;
        const t = this.shadowRoot.getElementById('prev-month'),
          a = this.shadowRoot.getElementById('next-month'),
          e = this.shadowRoot.getElementById('today-button'),
          n = this.shadowRoot.getElementById('tomorrow-button'),
          addClickHandler = (t, a) => {
            t &&
              t.addEventListener('click', t => {
                t.stopPropagation(), this.closeAllDropdowns(), a();
              });
          };
        addClickHandler(t, () => this.changeMonth(-1)),
          addClickHandler(a, () => this.changeMonth(1)),
          addClickHandler(e, () => this.goToToday()),
          addClickHandler(n, () => this.goToTomorrow());
      }
      setHolidayTypes(t) {
        if ('string' == typeof t) {
          if ('all' === t.toLowerCase())
            return (this.includeAllTypes = !0), void (this.holidayTypes = [...o.getEventTypes()]);
          this.holidayTypes = t
            .split(',')
            .map(t => t.trim())
            .filter(Boolean);
        } else this.holidayTypes = Array.isArray(t) ? [...t] : [...d];
        (this.includeAllTypes = !1), this.calendar && this.renderCalendar();
      }
      getHolidayTypes() {
        return [...this.holidayTypes];
      }
      isShowingAllTypes() {
        return this.includeAllTypes;
      }
      render(t) {
        const a = this.getAttribute('today-button-text') || 'امروز',
          e = this.getAttribute('today-button-class') || '',
          n = this.getAttribute('tomorrow-button-text') || 'فردا',
          i = this.getAttribute('tomorrow-button-class') || '',
          l = 'false' !== this.getAttribute('show-month-selector'),
          o = 'false' !== this.getAttribute('show-year-selector'),
          d = 'false' !== this.getAttribute('show-prev-button'),
          r = 'false' !== this.getAttribute('show-next-button'),
          y = 'false' !== this.getAttribute('show-today-button'),
          s = 'false' !== this.getAttribute('show-tomorrow-button'),
          h =
            '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
        t.innerHTML = `\n      <style>:host {\n  /* Color scheme */\n  --jdp-primary: #0891b2;\n  --jdp-primary-hover: #0e7490;\n  --jdp-primary-foreground: #ffffff;\n  \n  /* Neutral colors */\n  --jdp-background: #ffffff;\n  --jdp-foreground: #1e293b;\n  --jdp-muted: #f1f5f9;\n  --jdp-muted-foreground: #64748b;\n  --jdp-border: #e2e8f0;\n  --jdp-ring: #0284c7;\n  \n  /* Holiday colors */\n  --jdp-holiday-color: #ef4444;\n  --jdp-holiday-bg: #fee2e2;\n  --jdp-holiday-hover-bg: #fecaca;\n  \n  /* Typography */\n  --jdp-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;\n  --jdp-font-size: 14px;\n  --jdp-line-height: 1.5;\n  --jdp-font-weight: 400;\n  --jdp-font-weight-medium: 500;\n  --jdp-day-name-font-size: 12px;\n  --jdp-day-name-font-weight: 400;\n  --jdp-day-font-size: 13px;\n  --jdp-day-font-weight: 400;\n  --jdp-month-year-font-size: 14px;\n  --jdp-month-year-font-weight: 500;\n  \n  /* Spacing */\n  --jdp-spacing-xs: 4px;\n  --jdp-spacing-sm: 8px;\n  --jdp-spacing-md: 16px;\n  --jdp-spacing-lg: 24px;\n  \n  /* Input field */\n  --jdp-input-padding-x: 14px;\n  --jdp-input-padding-y: 10px;\n  --jdp-input-border-width: 1px;\n  --jdp-input-border-color: var(--jdp-border);\n  --jdp-input-border-radius: var(--jdp-border-radius);\n  --jdp-input-focus-ring-width: 2px;\n  --jdp-input-focus-ring-color: rgba(2, 132, 199, 0.25);\n  \n  /* Calendar popup */\n  --jdp-calendar-width: 280px;\n  --jdp-calendar-padding: var(--jdp-spacing-md);\n  --jdp-calendar-border-width: 1px;\n  --jdp-calendar-border-color: var(--jdp-border);\n  --jdp-calendar-border-radius: var(--jdp-border-radius);\n  --jdp-calendar-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);\n  --jdp-calendar-z-index: 10;\n  \n  /* Navigation buttons */\n  --jdp-nav-button-size: 30px;\n  --jdp-nav-button-bg: var(--jdp-muted);\n  --jdp-nav-button-bg-hover: var(--jdp-border);\n  --jdp-nav-button-border-radius: var(--jdp-border-radius);\n  --jdp-nav-arrow-size: 8px;\n  --jdp-nav-arrow-thickness: 2px;\n  --jdp-nav-arrow-color: var(--jdp-foreground);\n  \n  /* Day grid */\n  --jdp-day-cell-size: 32px;\n  --jdp-day-cell-margin: 1px;\n  --jdp-day-cell-border-radius: var(--jdp-border-radius);\n  \n  /* States */\n  --jdp-day-hover-bg: var(--jdp-muted);\n  --jdp-day-selected-bg: var(--jdp-primary);\n  --jdp-day-selected-color: var(--jdp-primary-foreground);\n  --jdp-day-today-border-color: var(--jdp-primary);\n  --jdp-day-today-border-width: 1px;\n  --jdp-day-disabled-opacity: 0.4;\n  \n  /* Animations */\n  --jdp-transition-duration: 0.2s;\n  --jdp-fade-from-y: -4px;\n  --jdp-fade-from-y-reverse: 4px;\n  --jdp-month-transition-duration: 0.3s;\n  \n  /* Layout */\n  --jdp-border-radius: 0.5rem;\n  --jdp-direction: rtl;\n  --jdp-header-gap: var(--jdp-spacing-xs);\n\n  /* Select boxes - default values that can be overridden */\n  --jdp-select-container-gap: var(--jdp-spacing-xs);\n  --jdp-select-trigger-height: var(--jdp-nav-button-size);\n  --jdp-select-trigger-bg: var(--jdp-muted);\n}\n\n* {\n  box-sizing: border-box;\n  direction: var(--jdp-direction);\n}\n\n.picker-container {\n  position: relative;\n  display: inline-block;\n  width: 100%;\n  font-family: var(--jdp-font-family);\n  font-size: var(--jdp-font-size);\n  line-height: var(--jdp-line-height);\n  font-weight: var(--jdp-font-weight);\n}\n\ninput {\n  width: 100%;\n  padding: var(--jdp-input-padding-y) var(--jdp-input-padding-x);\n  border-radius: var(--jdp-input-border-radius);\n  border: var(--jdp-input-border-width) solid var(--jdp-input-border-color);\n  font-size: var(--jdp-font-size);\n  line-height: var(--jdp-line-height);\n  font-family: inherit;\n  background-color: var(--jdp-background);\n  color: var(--jdp-foreground);\n  cursor: pointer;\n  outline: none;\n  transition: all var(--jdp-transition-duration) ease;\n  text-align: right;\n}\n\ninput:focus {\n  border-color: var(--jdp-ring);\n  box-shadow: 0 0 0 var(--jdp-input-focus-ring-width) var(--jdp-input-focus-ring-color);\n}\n\n.calendar {\n  display: none;\n  position: absolute;\n  right: 0;\n  width: var(--jdp-calendar-width);\n  background: var(--jdp-background);\n  border: var(--jdp-calendar-border-width) solid var(--jdp-calendar-border-color);\n  border-radius: var(--jdp-calendar-border-radius);\n  box-shadow: var(--jdp-calendar-shadow);\n  padding: var(--jdp-calendar-padding);\n  text-align: center;\n  z-index: var(--jdp-calendar-z-index);\n  touch-action: manipulation;\n  -webkit-user-select: none;\n  user-select: none;\n  transform: translateZ(0);\n  will-change: transform;\n  backface-visibility: hidden;\n  contain: layout style;\n}\n\n.calendar.position-bottom {\n  top: calc(100% + 5px);\n  animation: fadeInFromTop var(--jdp-transition-duration) ease;\n}\n\n.calendar.position-top {\n  bottom: calc(100% + 5px);\n  animation: fadeInFromBottom var(--jdp-transition-duration) ease;\n}\n\n.calendar.visible {\n  display: block;\n}\n\n@keyframes fadeInFromTop {\n  from { opacity: 0; transform: translateY(var(--jdp-fade-from-y)); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n@keyframes fadeInFromBottom {\n  from { opacity: 0; transform: translateY(var(--jdp-fade-from-y-reverse)); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n.header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: var(--jdp-spacing-md);\n  gap: var(--jdp-header-gap, var(--jdp-spacing-xs));\n}\n\n.month-year {\n  font-weight: var(--jdp-month-year-font-weight);\n  font-size: var(--jdp-month-year-font-size);\n  color: var(--jdp-foreground);\n  transition: opacity var(--jdp-transition-duration) ease;\n}\n\n.month-year.fade {\n  opacity: 0;\n}\n\n.days-wrapper {\n  position: relative;\n  touch-action: pan-y;\n  overflow: visible;\n  z-index: 1;\n  contain: layout;\n  isolation: isolate;\n}\n\n.days {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  transition: transform var(--jdp-month-transition-duration) ease, opacity var(--jdp-month-transition-duration) ease;\n  will-change: transform, opacity;\n  transform: translateZ(0);\n  backface-visibility: hidden;\n  position: relative;\n  contain: layout;\n}\n\n.days.slide-left {\n  animation: slideInLeft var(--jdp-month-transition-duration) ease;\n}\n\n.days.slide-right {\n  animation: slideInRight var(--jdp-month-transition-duration) ease;\n}\n\n@keyframes slideInLeft {\n  from { \n    opacity: 0; \n    transform: translateX(-10%) translateZ(0);\n    pointer-events: none;\n  }\n  to { \n    opacity: 1; \n    transform: translateX(0) translateZ(0);\n    pointer-events: auto;\n  }\n}\n\n@keyframes slideInRight {\n  from { \n    opacity: 0; \n    transform: translateX(10%) translateZ(0); \n    pointer-events: none;\n  }\n  to { \n    opacity: 1; \n    transform: translateX(0) translateZ(0);\n    pointer-events: auto;\n  }\n}\n\n.day {\n  position: relative;\n  z-index: 1;\n  touch-action: manipulation;\n  isolation: isolate;\n}\n\n.day:hover {\n  z-index: 2;\n}\n\n.nav-button {\n  background: var(--jdp-nav-button-bg);\n  border: none;\n  border-radius: var(--jdp-nav-button-border-radius);\n  width: var(--jdp-nav-button-size);\n  height: var(--jdp-nav-button-size);\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all var(--jdp-transition-duration) ease;\n  position: relative;\n  touch-action: manipulation;\n  will-change: transform, background-color;\n}\n\n.nav-button:hover {\n  background: var(--jdp-nav-button-bg-hover);\n}\n\n.nav-button:active {\n  transform: translateY(1px);\n}\n\n.nav-button::before {\n  content: '';\n  display: block;\n  width: var(--jdp-nav-arrow-size);\n  height: var(--jdp-nav-arrow-size);\n  border-top: var(--jdp-nav-arrow-thickness) solid var(--jdp-nav-arrow-color);\n  border-right: var(--jdp-nav-arrow-thickness) solid var(--jdp-nav-arrow-color);\n  position: absolute;\n}\n\n.nav-button.prev::before {\n  transform: rotate(45deg);\n  right: 11px;\n  left: auto;\n}\n\n.nav-button.next::before {\n  transform: rotate(225deg);\n  left: 11px;\n  right: auto;\n}\n\n.day-names {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  margin-bottom: var(--jdp-spacing-sm);\n}\n\n.day-name {\n  font-size: var(--jdp-day-name-font-size);\n  font-weight: var(--jdp-day-name-font-weight);\n  color: var(--jdp-muted-foreground);\n  padding: var(--jdp-spacing-xs) 0;\n  text-align: center;\n}\n\n.day {\n  aspect-ratio: 1/1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: var(--jdp-day-cell-border-radius);\n  font-size: var(--jdp-day-font-size);\n  font-weight: var(--jdp-day-font-weight);\n  cursor: pointer;\n  transition: var(--jdp-transition-duration) ease;\n  margin: var(--jdp-day-cell-margin);\n  position: relative;\n  touch-action: manipulation;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-user-select: none;\n  user-select: none;\n}\n\n.day:hover:not(.empty):not(.disabled) {\n  background: var(--jdp-day-hover-bg);\n}\n\n.day.selected {\n  background: var(--jdp-day-selected-bg);\n  color: var(--jdp-day-selected-color);\n}\n\n.day.today:not(.selected) {\n  border: var(--jdp-day-today-border-width) solid var(--jdp-day-today-border-color);\n}\n\n.day.empty {\n  cursor: default;\n}\n\n.day.disabled {\n  opacity: var(--jdp-day-disabled-opacity);\n  cursor: not-allowed;\n}\n\n/* Holiday styles */\n.day.holiday:not(.selected) {\n  color: var(--jdp-holiday-color);\n  background-color: var(--jdp-holiday-bg);\n  font-weight: var(--jdp-font-weight-medium);\n}\n\n.day.holiday:hover:not(.selected):not(.disabled) {\n  background-color: var(--jdp-holiday-hover-bg);\n}\n\n.day.friday {\n  color: var(--jdp-holiday-color);\n}\n\n.event-tooltip {\n  position: absolute;\n  background: var(--jdp-background);\n  border: 1px solid var(--jdp-border);\n  border-radius: var(--jdp-border-radius);\n  padding: var(--jdp-spacing-sm);\n  width: 200px;\n  box-shadow: var(--jdp-calendar-shadow);\n  text-align: right;\n  font-size: 12px;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity var(--jdp-transition-duration) ease, visibility var(--jdp-transition-duration) ease;\n  pointer-events: none;\n  bottom: 120%;\n  right: 0;\n  transform: translateY(-5px);\n  z-index: 9999;\n}\n\n.event-tooltip.tooltip-visible {\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n  background: var(--jdp-background);\n}\n\n/* Mobile-specific tooltip positioning */\n@media (max-width: 768px) {\n  .event-tooltip {\n    position: fixed;\n    left: 50%;\n    top: 50%;\n    transform: translate(-50%, -50%);\n    width: 90%;\n    max-width: 300px;\n    max-height: 80vh;\n    overflow-y: auto;\n    bottom: auto;\n    right: auto;\n    background: var(--jdp-background);\n    z-index: 9999;\n  }\n\n  .event-tooltip::before {\n    content: '';\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: -1;\n  }\n}\n\n.event-item {\n  margin-bottom: 4px;\n  padding-bottom: 4px;\n  border-bottom: 1px solid var(--jdp-border);\n  color: var(--jdp-foreground);\n  background: var(--jdp-background);\n}\n\n.event-item:last-child {\n  margin-bottom: 0;\n  padding-bottom: 0;\n  border-bottom: none;\n}\n\n.event-item.holiday {\n  color: var(--jdp-holiday-color);\n}\n\n.event-type-label {\n  display: inline-block;\n  font-size: 10px;\n  padding: 1px 4px;\n  border-radius: 3px;\n  margin-right: 4px;\n  background-color: var(--jdp-muted);\n  color: var(--jdp-muted-foreground);\n}\n\n/* Today button styling */\n.footer {\n  margin-top: var(--jdp-spacing-md);\n  display: flex;\n  justify-content: space-between;\n}\n\n.date-nav-button {\n  background: var(--jdp-muted);\n  border: none;\n  border-radius: var(--jdp-border-radius);\n  padding: var(--jdp-spacing-xs) var(--jdp-spacing-md);\n  font-family: inherit;\n  font-size: var(--jdp-font-size);\n  color: var(--jdp-foreground);\n  cursor: pointer;\n  transition: all var(--jdp-transition-duration) ease;\n  touch-action: manipulation;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.date-nav-button:hover {\n  background: var(--jdp-nav-button-bg-hover);\n}\n\n.date-nav-button:active {\n  transform: translateY(1px);\n}\n\n/* Month/Year selectors - scoped to the component */\n:host .selectors-container {\n  display: flex;\n  gap: var(--jdp-select-container-gap, var(--jdp-spacing-xs));\n  position: relative;\n  align-items: var(--jdp-select-container-align, center);\n  justify-content: var(--jdp-select-container-justify, space-between);\n  width: 100%;\n  max-width: calc(100% - var(--jdp-nav-button-size) * 2 - var(--jdp-spacing-md));\n  margin: 0 var(--jdp-spacing-xs);\n}\n\n:host .custom-select {\n  position: relative;\n  user-select: none;\n  width: 100%;\n}\n\n:host .select-trigger {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  height: var(--jdp-select-trigger-height, var(--jdp-nav-button-size));\n  min-height: var(--jdp-nav-button-size);\n  background-color: var(--jdp-select-trigger-bg, var(--jdp-muted));\n  border: var(--jdp-select-trigger-border-width, 1px) solid var(--jdp-select-trigger-border-color, var(--jdp-border));\n  border-radius: var(--jdp-select-trigger-border-radius, var(--jdp-border-radius));\n  color: var(--jdp-select-trigger-color, var(--jdp-foreground));\n  font-family: inherit;\n  font-size: var(--jdp-select-trigger-font-size, var(--jdp-font-size));\n  line-height: 1;\n  padding: 0 var(--jdp-select-trigger-padding-x, 0.75rem);\n  cursor: pointer;\n  transition: all var(--jdp-transition-duration) ease;\n  text-align: var(--jdp-select-trigger-text-align, center);\n  min-width: var(--jdp-select-trigger-min-width, initial);\n  outline: none;\n  font-weight: var(--jdp-select-trigger-font-weight, 500);\n  box-sizing: border-box;\n}\n\n:host .select-trigger:hover {\n  background-color: var(--jdp-select-trigger-bg-hover, rgba(0, 0, 0, 0.05));\n  border-color: var(--jdp-select-trigger-border-hover, var(--jdp-border));\n}\n\n:host .select-trigger:focus-visible {\n  outline: 2px solid var(--jdp-select-trigger-focus-ring-color, var(--jdp-ring));\n  outline-offset: var(--jdp-select-trigger-focus-ring-offset, 2px);\n}\n\n:host .select-icon {\n  margin-left: var(--jdp-select-icon-margin, var(--jdp-spacing-xs));\n  display: inline-flex;\n  justify-content: center;\n  align-items: center;\n  transition: transform 0.2s ease;\n  width: var(--jdp-select-icon-size, 12px);\n  height: var(--jdp-select-icon-size, 12px);\n  opacity: var(--jdp-select-icon-opacity, 0.7);\n  flex-shrink: 0;\n}\n\n:host .select-icon svg {\n  width: var(--jdp-select-icon-size, 12px);\n  height: var(--jdp-select-icon-size, 12px);\n}\n\n:host .select-content.open .select-icon {\n  transform: rotate(180deg);\n}\n\n:host .select-content {\n  position: var(--jdp-select-content-position, absolute);\n  top: calc(100% + var(--jdp-select-content-top-offset, 5px));\n  left: 0;\n  width: 100%;\n  background-color: var(--jdp-select-content-bg, var(--jdp-background));\n  border: var(--jdp-select-content-border-width, 1px) solid var(--jdp-select-content-border-color, var(--jdp-border));\n  border-radius: var(--jdp-select-content-border-radius, var(--jdp-border-radius));\n  box-shadow: var(--jdp-select-content-shadow, 0 4px 8px rgba(0,0,0,0.1));\n  z-index: var(--jdp-select-content-z-index, 20);\n  overflow-y: auto;\n  max-height: var(--jdp-select-content-max-height, 200px);\n  display: none;\n  padding: var(--jdp-select-content-padding-y, 0.25rem) var(--jdp-select-content-padding-x, 0);\n}\n\n:host .select-content.open {\n  display: block;\n  animation: fadeInSelect var(--jdp-select-content-animation-duration, var(--jdp-transition-duration)) ease;\n}\n\n:host .month-select-content {\n  width: var(--jdp-select-month-width, 100%);\n}\n\n:host .year-select-content {\n  width: var(--jdp-select-year-width, 100%);\n}\n\n:host .select-item {\n  padding: var(--jdp-select-item-padding-y, 0.5rem) var(--jdp-select-item-padding-x, 0.75rem);\n  cursor: pointer;\n  transition: background-color var(--jdp-transition-duration) ease;\n  text-align: var(--jdp-select-item-text-align, right);\n  border-radius: var(--jdp-select-item-border-radius, 0.25rem);\n  margin: var(--jdp-select-item-margin, 0 0.25rem);\n}\n\n:host .select-item:hover {\n  background-color: var(--jdp-select-item-hover-bg, var(--jdp-day-hover-bg));\n}\n\n:host .select-item.selected {\n  background-color: var(--jdp-select-item-selected-bg, var(--jdp-primary));\n  color: var(--jdp-select-item-selected-color, var(--jdp-primary-foreground));\n  font-weight: var(--jdp-select-item-selected-font-weight, var(--jdp-font-weight-medium));\n}\n\n@keyframes fadeInSelect {\n  from { opacity: 0; transform: translateY(-5px); }\n  to { opacity: 1; transform: translateY(0); }\n}\n\n/* RTL specific styles */\n:host([rtl="true"]) .select-icon,\n:host([dir="rtl"]) .select-icon {\n  margin-left: 0;\n  margin-right: var(--jdp-select-icon-margin, var(--jdp-spacing-xs));\n}\n\n:host([rtl="true"]) .select-item,\n:host([dir="rtl"]) .select-item {\n  text-align: var(--jdp-select-item-text-align, right);\n}\n</style>\n      <div class="picker-container">\n        <input type="text" id="date-input" readonly placeholder="انتخاب تاریخ">\n        <div class="calendar" id="calendar">\n          <div class="header">\n            ${d ? '<button id="prev-month" type="button" class="nav-button prev"></button>' : ''}\n            <div class="selectors-container">\n              ${l ? `\n              <div class="custom-select month-select" id="month-select-container">\n                <button type="button" class="select-trigger" id="month-select-trigger">\n                  <span id="month-select-value"></span>\n                  <span class="select-icon">${h}</span>\n                </button>\n                <div class="select-content month-select-content" id="month-select-content"></div>\n              </div>\n              ` : ''}\n              ${o ? `\n              <div class="custom-select year-select" id="year-select-container">\n                <button type="button" class="select-trigger" id="year-select-trigger">\n                  <span id="year-select-value"></span>\n                  <span class="select-icon">${h}</span>\n                </button>\n                <div class="select-content year-select-content" id="year-select-content"></div>\n              </div>\n              ` : ''}\n            </div>\n            ${r ? '<button id="next-month" type="button" class="nav-button next"></button>' : ''}\n          </div>\n          <div class="day-names" id="day-names"></div>\n          <div class="days-wrapper">\n            <div class="days" id="days-container"></div>\n          </div>\n          <div class="footer">\n            ${y ? `<button id="today-button" type="button" class="date-nav-button today-button ${e}">${a}</button>` : ''}\n            ${s ? `<button id="tomorrow-button" type="button" class="date-nav-button tomorrow-button ${i}">${n}</button>` : ''}\n          </div>\n        </div>\n      </div>\n    `;
      }
      toggleCalendar() {
        this.closeAllDropdowns(),
          this.calendar.classList.contains('visible')
            ? this.calendar.classList.remove('visible', 'position-bottom', 'position-top')
            : (this.positionCalendar(), this.calendar.classList.add('visible'));
      }
      positionCalendar() {
        if (!this.input || !this.calendar) return;
        this.calendar.classList.remove('position-bottom', 'position-top');
        const t = this.input.getBoundingClientRect(),
          a = window.innerHeight;
        this.calendar.classList.add('position-bottom');
        const e = this.calendar.style.visibility,
          n = this.calendar.style.display;
        (this.calendar.style.visibility = 'hidden'), (this.calendar.style.display = 'block');
        const i = this.calendar.offsetHeight,
          l = a - t.bottom;
        if (l < i) {
          const a = t.top;
          (a > l || a >= i) &&
            (this.calendar.classList.remove('position-bottom'),
            this.calendar.classList.add('position-top'));
        }
        (this.calendar.style.visibility = e), (this.calendar.style.display = n);
      }
      changeMonth(t) {
        if (this.isTransitioning) return;
        this.isTransitioning = !0;
        const a = this.daysContainer,
          e = t > 0 ? 'slide-left' : 'slide-right';
        a.classList.add(e),
          (this.jalaliMonth = Number(this.jalaliMonth) + t),
          this.jalaliMonth < 1
            ? ((this.jalaliMonth = 12), this.jalaliYear--)
            : this.jalaliMonth > 12 && ((this.jalaliMonth = 1), this.jalaliYear++),
          requestAnimationFrame(() => {
            setTimeout(() => {
              this.updateMonthYearSelectors(),
                (a.innerHTML = ''),
                this.renderCalendarContent(),
                requestAnimationFrame(() => {
                  a.classList.remove(e),
                    setTimeout(() => {
                      this.isTransitioning = !1;
                    }, 50);
                });
            }, 200);
          });
      }
      updateMonthYearSelectors() {
        if (!this.shadowRoot) return;
        const t = this.shadowRoot.getElementById('month-select-value'),
          a = this.shadowRoot.getElementById('year-select-value');
        t && (t.textContent = this.persianMonths[this.jalaliMonth - 1]),
          a && (a.textContent = this.jalaliYear.toString()),
          this.shadowRoot.querySelectorAll('.month-select-content .select-item').forEach(t => {
            t.getAttribute('data-value') === this.jalaliMonth.toString()
              ? t.classList.add('selected')
              : t.classList.remove('selected');
          }),
          this.shadowRoot.querySelectorAll('.year-select-content .select-item').forEach(t => {
            t.getAttribute('data-value') === this.jalaliYear.toString()
              ? t.classList.add('selected')
              : t.classList.remove('selected');
          });
      }
      renderCalendar() {
        this.shadowRoot &&
          this.daysContainer &&
          (this.updateMonthYearSelectors(),
          (this.daysContainer.innerHTML = ''),
          this.renderCalendarContent());
      }
      renderCalendarContent() {
        if (!this.daysContainer) return;
        const t = e.getDayOfWeek(this.jalaliYear, this.jalaliMonth, 1),
          a = e.getDaysInMonth(this.jalaliYear, this.jalaliMonth),
          n = new Date(),
          i = e.gregorianToJalali(n.getFullYear(), n.getMonth() + 1, n.getDate()),
          l = (t + 1) % 7;
        this.daysContainer.innerHTML = '';
        for (let t = 0; t < l; t++) {
          const t = document.createElement('div');
          t.classList.add('day', 'empty'), this.daysContainer.appendChild(t);
        }
        for (let t = 1; t <= a; t++) {
          const a = document.createElement('div');
          a.classList.add('day'),
            (a.textContent = t.toString()),
            this.setupDayTooltips(a),
            this.setupDayClickHandler(a, t),
            this.jalaliYear === i[0] &&
              this.jalaliMonth === i[1] &&
              t === i[2] &&
              a.classList.add('today'),
            this.selectedDate &&
              this.jalaliYear === this.selectedDate[0] &&
              this.jalaliMonth === this.selectedDate[1] &&
              t === this.selectedDate[2] &&
              a.classList.add('selected'),
            this.showHolidays && this.addHolidayInfo(a, t),
            this.daysContainer.appendChild(a);
        }
      }
      setupDayTooltips(t) {
        t.addEventListener('mouseenter', () => {
          const a = t.querySelector('.event-tooltip');
          a && a.classList.add('tooltip-visible');
        }),
          t.addEventListener('mouseleave', () => {
            const a = t.querySelector('.event-tooltip');
            a && a.classList.remove('tooltip-visible');
          });
      }
      setupDayClickHandler(t, a) {
        let e = 0;
        t.addEventListener('click', n => {
          n.preventDefault(), n.stopPropagation();
          const i = new Date().getTime(),
            l = i - e;
          if ('ontouchstart' in window || navigator.maxTouchPoints > 0)
            if (l < 500 && l > 0) {
              const a = t.querySelector('.event-tooltip');
              if (a) {
                const t = this.shadowRoot?.querySelectorAll('.event-tooltip.tooltip-visible');
                t?.forEach(t => t.classList.remove('tooltip-visible')),
                  a.classList.add('tooltip-visible');
              }
            } else this.selectDate(a);
          else this.selectDate(a);
          e = i;
        });
      }
      addHolidayInfo(t, a) {
        if (
          (5 === e.getDayOfWeek(this.jalaliYear, this.jalaliMonth, a) && t.classList.add('friday'),
          o.isHoliday(this.jalaliMonth, a, this.holidayTypes, this.includeAllTypes))
        ) {
          t.classList.add('holiday');
          const e = o.getEvents(this.jalaliMonth, a, this.holidayTypes, this.includeAllTypes);
          if (e.length > 0) {
            const a = this.createEventTooltip(e);
            t.appendChild(a);
          }
        }
      }
      createEventTooltip(t) {
        const a = document.createElement('div');
        return (
          a.classList.add('event-tooltip'),
          t.forEach(t => {
            const e = document.createElement('div');
            e.classList.add('event-item'), t.holiday && e.classList.add('holiday');
            const n = document.createElement('span');
            n.classList.add('event-type-label'), (n.textContent = t.type), e.appendChild(n);
            const i = document.createElement('span');
            (i.textContent = t.title), e.appendChild(i), a.appendChild(e);
          }),
          a
        );
      }
      navigateToDate(t) {
        const a = e.gregorianToJalali(t.getFullYear(), t.getMonth() + 1, t.getDate()),
          n = this.jalaliYear;
        (this.jalaliYear = a[0]),
          (this.jalaliMonth = a[1]),
          n !== this.jalaliYear && o.refreshEvents(),
          this.renderCalendar(),
          this.selectDate(a[2]);
      }
      goToToday() {
        this.navigateToDate(new Date());
      }
      goToTomorrow() {
        const t = new Date();
        t.setDate(t.getDate() + 1), this.navigateToDate(t);
      }
      selectDate(t) {
        (this.jalaliDay = t),
          (this.selectedDate = [this.jalaliYear, this.jalaliMonth, this.jalaliDay]),
          this.formatAndSetValue();
        const a = o.getEvents(this.jalaliMonth, t, this.holidayTypes, this.includeAllTypes);
        this.dispatchEvent(
          new CustomEvent('change', {
            detail: {
              jalali: this.selectedDate,
              gregorian: e.jalaliToGregorian(this.jalaliYear, this.jalaliMonth, this.jalaliDay),
              isHoliday: o.isHoliday(this.jalaliMonth, t, this.holidayTypes, this.includeAllTypes),
              events: a,
            },
            bubbles: !0,
          })
        ),
          this.closeAllDropdowns(),
          this.toggleCalendar(),
          this.renderCalendar();
      }
      formatAndSetValue() {
        if (!this.selectedDate) return;
        let t = (this.getAttribute('format') || this.options.format || 'YYYY/MM/DD')
          .replace('YYYY', this.selectedDate[0].toString())
          .replace('MM', this.selectedDate[1].toString().padStart(2, '0'))
          .replace('DD', this.selectedDate[2].toString().padStart(2, '0'));
        this.input.value = t;
      }
      handleMonthChange(t, a) {
        this.jalaliMonth !== t && ((this.jalaliMonth = t), this.renderCalendar());
      }
      handleYearChange(t) {
        if (this.jalaliYear === t) return;
        const a = this.jalaliYear;
        (this.jalaliYear = t), a !== t && o.refreshEvents(), this.renderCalendar();
      }
      setValue(t, a, e) {
        (this.selectedDate = [t, a, e]),
          (this.jalaliYear = t),
          (this.jalaliMonth = a),
          (this.jalaliDay = e),
          this.formatAndSetValue(),
          this.renderCalendar();
      }
      getValue() {
        return this.selectedDate ? [...this.selectedDate] : null;
      }
      isSelectedDateHoliday() {
        return (
          !!this.selectedDate &&
          o.isHoliday(
            this.selectedDate[1],
            this.selectedDate[2],
            this.holidayTypes,
            this.includeAllTypes
          )
        );
      }
      getSelectedDateEvents() {
        return this.selectedDate
          ? [
              ...o.getEvents(
                this.selectedDate[1],
                this.selectedDate[2],
                this.holidayTypes,
                this.includeAllTypes
              ),
            ]
          : [];
      }
      clear() {
        (this.selectedDate = null), (this.input.value = ''), this.renderCalendar();
      }
      initTouchGestures() {
        if (!this.calendar || !this.shadowRoot) return;
        let t = 0,
          a = 0,
          e = !1,
          n = 0,
          i = !1;
        this.calendar.addEventListener(
          'touchstart',
          l => {
            this.calendar?.classList.contains('visible') &&
              ((t = l.touches[0].clientX),
              (a = l.touches[0].clientY),
              (e = !1),
              (i = !1),
              (n = Date.now()),
              l.stopPropagation());
          },
          { passive: !0 }
        ),
          this.calendar.addEventListener(
            'touchmove',
            n => {
              if (!this.calendar?.classList.contains('visible')) return;
              const l = n.touches[0].clientX - t,
                o = n.touches[0].clientY - a;
              i
                ? n.preventDefault()
                : Math.abs(l) > Math.abs(o) &&
                  Math.abs(l) > 20 &&
                  (n.preventDefault(), (e = !0), (i = !0));
            },
            { passive: !1 }
          ),
          this.calendar.addEventListener(
            'touchend',
            l => {
              if (!this.calendar?.classList.contains('visible')) return;
              const o = i;
              if (((i = !1), (Date.now() - n < 300 || e) && !this.isTransitioning)) {
                const e = l.changedTouches[0].clientX - t,
                  n = l.changedTouches[0].clientY - a;
                if (Math.abs(e) > Math.abs(n) && Math.abs(e) > 20) {
                  const t =
                    'rtl' === getComputedStyle(this).getPropertyValue('--jdp-direction').trim();
                  (t && e < 0) || (!t && e > 0)
                    ? (l.preventDefault(), l.stopPropagation(), this.changeMonth(1))
                    : ((t && e > 0) || (!t && e < 0)) &&
                      (l.preventDefault(), l.stopPropagation(), this.changeMonth(-1));
                }
              }
              o && l.preventDefault();
            },
            { passive: !1 }
          ),
          this.calendar.addEventListener('touchcancel', () => {
            (i = !1), (e = !1);
          });
        const l = this.shadowRoot.getElementById('prev-month'),
          o = this.shadowRoot.getElementById('next-month');
        l && l.addEventListener('touchstart', t => t.stopPropagation(), { passive: !0 }),
          o && o.addEventListener('touchstart', t => t.stopPropagation(), { passive: !0 });
      }
      closeAllDropdowns() {
        this.shadowRoot &&
          this.shadowRoot.querySelectorAll('.select-content').forEach(t => {
            t.classList.remove('open');
          });
      }
      toggleDropdown(t) {
        if (!t) return;
        const a = t.classList.contains('open');
        this.closeAllDropdowns(), a || t.classList.add('open');
      }
    }
    PersianDatePickerElement.openCalendarInstance = null;
    const r = 'undefined' != typeof window;
    if (r && 'undefined' != typeof customElements) {
      if (!customElements.get('persian-datepicker-element'))
        try {
          customElements.define('persian-datepicker-element', PersianDatePickerElement);
        } catch (t) {}
      if (r && window)
        try {
          window.hasOwnProperty('PersianDatePickerElement') ||
            Object.defineProperty(window, 'PersianDatePickerElement', {
              value: PersianDatePickerElement,
              writable: !1,
              configurable: !1,
            });
        } catch (t) {}
    }
    const y = PersianDatePickerElement;
    return a.default;
  })()),
  'object' == typeof exports && 'object' == typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
      ? define([], t)
      : 'object' == typeof exports
        ? (exports.PersianDatePickerElement = t())
        : (this.PersianDatePickerElement = t());
