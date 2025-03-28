<template>
  <div class="app" :class="{ dark: isDarkMode }">
    <div class="container">
      <h1>Persian Date Picker Element</h1>
      <p>این مثال قابلیت‌های شخصی‌سازی ظاهری تقویم شمسی را نشان می‌دهد</p>

      <div class="theme-container">
        <div class="theme-toggles">
          <h2 style="margin: 0">حالت تاریک</h2>
          <label class="theme-switch">
            <input v-model="isDarkMode" type="checkbox" />
            <span class="slider"></span>
          </label>
        </div>
      </div>

      <div class="form-group">
        <label>تاریخ تولد:</label>
        <PersianDatepicker
          id="birthdate"
          v-model="birthdate"
          placeholder="انتخاب تاریخ تولد"
          @change="handleDateChange"
        />
      </div>

      <div class="form-group">
        <label>تاریخ عضویت:</label>
        <PersianDatepicker
          id="joinDate"
          v-model="joinDate"
          format="YYYY/MM/DD"
          placeholder="تاریخ عضویت"
          @change="handleDateChange"
        />
      </div>

      <div class="holiday-options">
        <h2>انواع تعطیلات</h2>
        <p>با استفاده از ویژگی holiday-types می‌توانید نوع تعطیلات نمایش داده شده را مشخص کنید</p>

        <div class="holiday-types-container">
          <div class="form-group">
            <label>فقط تعطیلات ایران:</label>
            <PersianDatepicker
              id="iran-holidays"
              v-model="iranHolidays"
              holiday-types="Iran"
              placeholder="فقط تعطیلات ایران"
              @change="handleDateChange"
            />
          </div>

          <div class="form-group">
            <label>فقط تعطیلات مذهبی:</label>
            <PersianDatepicker
              id="religious-holidays"
              v-model="religiousHolidays"
              holiday-types="Religious"
              placeholder="فقط تعطیلات مذهبی"
              @change="handleDateChange"
            />
          </div>

          <div class="form-group">
            <label>تعطیلات افغانستان:</label>
            <PersianDatepicker
              id="afghanistan-holidays"
              v-model="afghanistanHolidays"
              holiday-types="Afghanistan"
              placeholder="تعطیلات افغانستان"
              @change="handleDateChange"
            />
          </div>

          <div class="form-group">
            <label>همه تعطیلات:</label>
            <PersianDatepicker
              id="all-holidays"
              v-model="allHolidays"
              holiday-types="Iran,Religious,Afghanistan"
              placeholder="همه تعطیلات"
              @change="handleDateChange"
            />
          </div>
        </div>
      </div>

      <div class="result">
        <p
          ><strong>تاریخ انتخاب شده (شمسی):</strong>
          <span id="jalali-result">{{ selectedJalali }}</span></p
        >
        <p
          ><strong>تاریخ میلادی معادل:</strong>
          <span id="gregorian-result">{{ selectedGregorian }}</span></p
        >
        <p
          ><strong>رویدادها:</strong> <span id="events-result">{{ selectedEvents }}</span></p
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { PersianDatepicker } from 'vue-persian-datepicker-element';
  import 'persian-datepicker-element';

  // State
  const isDarkMode = ref(false);
  const selectedJalali = ref('-');
  const selectedGregorian = ref('-');
  const selectedEvents = ref('-');

  // Datepicker values
  const birthdate = ref('');
  const joinDate = ref('');
  const iranHolidays = ref('');
  const religiousHolidays = ref('');
  const afghanistanHolidays = ref('');
  const allHolidays = ref('');

  // Check system dark mode preference
  onMounted(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Set initial state
    isDarkMode.value = mediaQuery.matches;

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      isDarkMode.value = e.matches;
    };

    mediaQuery.addEventListener('change', handleChange);

    onUnmounted(() => {
      mediaQuery.removeEventListener('change', handleChange);
    });
  });

  // Format events for display
  const formatEvents = (
    events: Array<{ title: string; type: string; holiday: boolean }> | undefined
  ) => {
    if (!events || events.length === 0) return 'هیچ رویدادی وجود ندارد';

    return events
      .map(event => {
        const holidayMark = event.holiday ? '🔴 ' : '';
        return `${holidayMark}${event.title} (${event.type})`;
      })
      .join(' | ');
  };

  // Handle date change
  const handleDateChange = (event: any) => {
    const jalaliDate = event.jalali;
    const gregorianDate = event.gregorian;
    const events = event.events;

    selectedJalali.value = `${jalaliDate[0]}/${jalaliDate[1].toString().padStart(2, '0')}/${jalaliDate[2].toString().padStart(2, '0')}`;
    selectedGregorian.value = `${gregorianDate[0]}/${gregorianDate[1].toString().padStart(2, '0')}/${gregorianDate[2].toString().padStart(2, '0')}`;
    selectedEvents.value = formatEvents(events);
  };
</script>

<style>
  :root {
    --jdp-primary: #0891b2;
    --jdp-primary-hover: #0e7490;
    --jdp-primary-foreground: #ffffff;
    --jdp-background: #ffffff;
    --jdp-foreground: #1e293b;
    --jdp-muted: #f1f5f9;
    --jdp-muted-foreground: #64748b;
    --jdp-border: #e2e8f0;
    --jdp-ring: #0284c7;
    --jdp-holiday-color: #ef4444;
    --jdp-holiday-bg: #fee2e2;
    --jdp-holiday-hover-bg: #fecaca;
    --jdp-font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    --jdp-font-size: 14px;
    --jdp-line-height: 1.5;
    --jdp-font-weight: 400;
    --jdp-font-weight-medium: 500;
    --jdp-day-name-font-size: 12px;
    --jdp-day-name-font-weight: 400;
    --jdp-day-font-size: 13px;
    --jdp-day-font-weight: 400;
    --jdp-month-year-font-size: 14px;
    --jdp-month-year-font-weight: 500;
    --jdp-spacing-xs: 4px;
    --jdp-spacing-sm: 8px;
    --jdp-spacing-md: 16px;
    --jdp-spacing-lg: 24px;
    --jdp-input-padding-x: 14px;
    --jdp-input-padding-y: 10px;
    --jdp-input-border-width: 1px;
    --jdp-input-border-color: var(--jdp-border);
    --jdp-input-border-radius: var(--jdp-border-radius);
    --jdp-input-focus-ring-width: 2px;
    --jdp-input-focus-ring-color: rgba(2, 132, 199, 0.25);
    --jdp-calendar-width: 280px;
    --jdp-calendar-padding: var(--jdp-spacing-md);
    --jdp-calendar-border-width: 1px;
    --jdp-calendar-border-color: var(--jdp-border);
    --jdp-calendar-border-radius: var(--jdp-border-radius);
    --jdp-calendar-shadow:
      0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
    --jdp-calendar-z-index: 10;
    --jdp-nav-button-size: 30px;
    --jdp-nav-button-bg: var(--jdp-muted);
    --jdp-nav-button-bg-hover: var(--jdp-border);
    --jdp-nav-button-border-radius: var(--jdp-border-radius);
    --jdp-nav-arrow-size: 8px;
    --jdp-nav-arrow-thickness: 2px;
    --jdp-nav-arrow-color: var(--jdp-foreground);
    --jdp-day-cell-size: 32px;
    --jdp-day-cell-margin: 1px;
    --jdp-day-cell-border-radius: var(--jdp-border-radius);
    --jdp-day-hover-bg: var(--jdp-muted);
    --jdp-day-selected-bg: var(--jdp-primary);
    --jdp-day-selected-color: var(--jdp-primary-foreground);
    --jdp-day-today-border-color: var(--jdp-primary);
    --jdp-day-today-border-width: 1px;
    --jdp-day-disabled-opacity: 0.4;
    --jdp-transition-duration: 0.2s;
    --jdp-fade-from-y: -4px;
    --jdp-fade-from-y-reverse: 4px;
    --jdp-month-transition-duration: 0.3s;
    --jdp-border-radius: 0.5rem;
    --jdp-direction: rtl;
  }

  body {
    margin: 0;
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f3f4f6;
    color: var(--text-color);
  }

  .app {
    min-height: 100vh;
    padding: 2rem;
  }

  .app.dark {
    background-color: #0f172a;
    color: #e2e8f0;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    color: var(--jdp-primary);
    margin-bottom: 0.5rem;
  }

  p {
    text-align: center;
    color: #6b7280;
    margin-bottom: 2rem;
  }

  .theme-container {
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow);
  }

  .theme-toggles {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .theme-switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .theme-switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: var(--jdp-primary);
  }

  input:checked + .slider:before {
    transform: translateX(26px);
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .holiday-options {
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow);
  }

  .holiday-types-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .result {
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    padding: 2rem;
    box-shadow: var(--shadow);
  }

  .result p {
    text-align: right;
    margin-bottom: 0.5rem;
  }

  .result strong {
    color: var(--jdp-primary);
  }

  /* Dark mode styles */
  .app.dark .theme-container,
  .app.dark .holiday-options,
  .app.dark .result {
    background-color: #0f172a;
    border-color: #1e293b;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  }

  .app.dark .result p {
    color: #e2e8f0;
  }

  .app.dark .result strong {
    color: #60a5fa;
  }

  .app.dark h1 {
    color: #60a5fa;
  }

  .app.dark p {
    color: #94a3b8;
  }

  .app.dark .form-group label {
    color: #e2e8f0;
  }

  .app.dark h2 {
    color: #e2e8f0;
  }

  /* Add these additional styles for the dark mode calendar */
  .app.dark persian-datepicker-element {
    --jdp-background: #1e1e2f;
    --jdp-foreground: #e2e8f0;
    --jdp-muted: #334155;
    --jdp-muted-foreground: #94a3b8;
    --jdp-border: #475569;
    --jdp-input-border-color: #475569;
    --jdp-calendar-shadow: 0px 10px 30px -5px rgba(2, 6, 23, 0.5);
    --jdp-day-hover-bg: #334155;
    --jdp-primary: #0891b2;
    --jdp-primary-hover: #0e7490;
    --jdp-primary-foreground: #ffffff;
    --jdp-ring: #0891b2;
    --jdp-border-radius: 0.5rem;
    --jdp-input-border-radius: undefined;
    --jdp-day-cell-border-radius: undefined;
    --jdp-nav-button-border-radius: undefined;
    --jdp-calendar-border-radius: undefined;
  }

  /* Responsive design */
  @media (max-width: 640px) {
    .app {
      padding: 1rem;
    }

    .holiday-types-container {
      grid-template-columns: 1fr;
    }
  }
</style>
