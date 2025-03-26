# Persian Date Picker Element Examples | نمونه‌های تقویم تاریخ شمسی

This directory contains examples that demonstrate various features and customization options of the Persian Date Picker Element component.

این دایرکتوری شامل نمونه‌هایی است که ویژگی‌ها و گزینه‌های شخصی‌سازی مختلف کامپوننت تقویم تاریخ شمسی را نشان می‌دهد.

## Examples Overview | بررسی اجمالی نمونه‌ها

### [Basic Usage (index.html)](./index.html) | [استفاده پایه (index.html)](./index.html)

This example shows the basic usage of the Persian Date Picker Element component, including:

این نمونه استفاده پایه از کامپوننت تقویم تاریخ شمسی را نشان می‌دهد، از جمله:

- Default configuration
- Setting a custom placeholder
- Using a custom date format
- Setting an initial value programmatically
- Listening for change events
- Basic styling customization with CSS variables
- Persian/Arabic digit formatting

<div dir="rtl">

- پیکربندی پیش‌فرض
- تنظیم یک متن نگهدارنده (placeholder) سفارشی
- استفاده از قالب تاریخ سفارشی
- تنظیم یک مقدار اولیه به صورت برنامه‌نویسی
- گوش دادن به رویدادهای تغییر
- شخصی‌سازی پایه استایل با متغیرهای CSS
- قالب‌بندی ارقام فارسی/عربی

</div>

### [Styling Examples (customization.html)](./customization.html) | [نمونه‌های استایل‌دهی (customization.html)](./customization.html)

This example demonstrates the various styling possibilities of the component using CSS variables, including:

این نمونه امکانات مختلف استایل‌دهی کامپوننت با استفاده از متغیرهای CSS را نشان می‌دهد، از جمله:

- Different color themes (default, blue, green, purple, orange, dark)
- Layout variations with custom spacing and sizing
- Minimal design with simplified styling
- Using HTML attributes for customization
- Persian/Arabic digit support

<div dir="rtl">

- تم‌های رنگی مختلف (پیش‌فرض، آبی، سبز، بنفش، نارنجی، تیره)
- تغییرات طرح‌بندی با فاصله‌گذاری و اندازه‌گذاری سفارشی
- طراحی مینیمال با استایل‌دهی ساده‌شده
- استفاده از صفات HTML برای شخصی‌سازی
- پشتیبانی از ارقام فارسی/عربی

</div>

### [Theme Switcher (theme-switcher.html)](./theme-switcher.html) | [تغییردهنده تم (theme-switcher.html)](./theme-switcher.html)

An interactive example that allows you to:

یک نمونه تعاملی که به شما امکان می‌دهد:

- Toggle between light and dark modes
- Apply preset themes (blue, green, purple, orange, dark, minimal)
- Customize the primary color using a color picker
- Adjust the border radius with a slider
- See the changes applied in real-time
- Display Persian/Arabic digits

<div dir="rtl">

- جابجایی بین حالت‌های روشن و تاریک
- اعمال تم‌های از پیش تعیین شده (آبی، سبز، بنفش، نارنجی، تیره، مینیمال)
- شخصی‌سازی رنگ اصلی با استفاده از انتخابگر رنگ
- تنظیم شعاع گوشه با اسلایدر
- مشاهده تغییرات اعمال شده در زمان واقعی
- نمایش ارقام فارسی/عربی

</div>

### [Full Theme Builder (theme-builder.html)](./theme-builder.html) | [سازنده کامل تم (theme-builder.html)](./theme-builder.html)

A comprehensive theme building tool that allows you to:

یک ابزار جامع ساخت تم که به شما امکان می‌دهد:

- Create a fully customized theme with visual controls
- Adjust all color settings (primary, background, foreground, etc.)
- Fine-tune typography, border radius, and holiday styles
- Toggle dark mode with automatic color adjustments
- Apply preset themes as starting points
- Copy the generated CSS code for your own projects
- Preview the theme with Persian/Arabic digits in real-time

<div dir="rtl">

- ایجاد یک تم کاملاً سفارشی با کنترل‌های بصری
- تنظیم تمام تنظیمات رنگ (اصلی، پس‌زمینه، متن، و غیره)
- تنظیم دقیق تایپوگرافی، شعاع گوشه و سبک تعطیلات
- فعال‌سازی حالت تاریک با تنظیمات خودکار رنگ
- اعمال تم‌های از پیش تعیین شده به عنوان نقطه شروع
- کپی کد CSS تولید شده برای پروژه‌های خودتان
- پیش‌نمایش تم با ارقام فارسی/عربی در زمان واقعی

</div>

## Running the Examples | اجرای نمونه‌ها

1. Build the component with `npm run build` or `pnpm run build`
2. Open any example file in a browser, or start a local server:
   ```
   npx http-server -o /examples
   ```

<div dir="rtl">

1. کامپوننت را با `npm run build` یا `pnpm run build` بسازید
2. هر فایل نمونه را در مرورگر باز کنید، یا یک سرور محلی راه‌اندازی کنید:
   ```
   npx http-server -o /examples
   ```

</div>

## Persian/Arabic Digits | ارقام فارسی/عربی

All examples now support Persian/Arabic digits by default. This is achieved by:

تمام نمونه‌ها اکنون از ارقام فارسی/عربی به صورت پیش‌فرض پشتیبانی می‌کنند. این با موارد زیر انجام می‌شود:

1. Using the Vazir font which supports Arabic numbers
2. Applying the font-feature-settings CSS property:
   ```css
   --jdp-font-feature-settings: "ss02";
   ```
3. Converting JavaScript output to Persian digits:
   ```javascript
   function toPersianNum(num) {
     const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
     return num.toString().replace(/\d/g, x => persianDigits[x]);
   }
   ```

<div dir="rtl">

1. استفاده از فونت وزیر که از اعداد عربی پشتیبانی می‌کند
2. اعمال ویژگی CSS font-feature-settings:
   ```css
   --jdp-font-feature-settings: "ss02";
   ```
3. تبدیل خروجی جاوااسکریپت به ارقام فارسی:
   ```javascript
   function toPersianNum(num) {
     const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
     return num.toString().replace(/\d/g, x => persianDigits[x]);
   }
   ```

</div>

## CSS Variables Reference | مرجع متغیرهای CSS

The component uses a comprehensive set of CSS variables for styling. For a complete list, refer to the [main documentation](../README.md#advanced-styling).

کامپوننت از مجموعه جامعی از متغیرهای CSS برای استایل‌دهی استفاده می‌کند. برای لیست کامل، به [مستندات اصلی](../README.md#advanced-styling) مراجعه کنید. 