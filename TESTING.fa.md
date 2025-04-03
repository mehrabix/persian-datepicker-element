# راهنمای تست کامپوننت انتخاب تاریخ شمسی

این سند اطلاعات جامعی درباره تست کردن کامپوننت انتخاب تاریخ شمسی ارائه می‌دهد، شامل تست‌های واحد، تست‌های یکپارچه‌سازی و تست‌های خاص فریم‌ورک‌ها.

## فهرست مطالب

- [معرفی](#معرفی)
- [ساختار تست‌ها](#ساختار-تست‌ها)
- [اجرای تست‌ها](#اجرای-تست‌ها)
- [نوشتن تست‌ها](#نوشتن-تست‌ها)
- [تست‌های خاص فریم‌ورک‌ها](#تست‌های-خاص-فریم‌ورک‌ها)
- [پوشش تست](#پوشش-تست)
- [یکپارچه‌سازی مداوم](#یکپارچه‌سازی-مداوم)
- [عیب‌یابی](#عیب‌یابی)

## معرفی

کامپوننت انتخاب تاریخ شمسی از Jest به عنوان فریم‌ورک تست استفاده می‌کند، با ابزارهای اضافی برای تست‌های خاص فریم‌ورک‌ها:

- **Jest**: برای تست‌های واحد و یکپارچه‌سازی
- **Testing Library**: برای ابزارهای تست DOM
- **JSDOM**: برای شبیه‌سازی محیط مرورگر
- **Vitest**: برای تست‌های خاص Vue
- **Jest DOM**: برای ادعاهای خاص DOM

## ساختار تست‌ها

سوییت تست به صورت زیر سازماندهی شده است:

```
├── src/
│   ├── __tests__/
│   │   ├── core/
│   │   │   ├── persian-datepicker-element.test.ts
│   │   │   ├── utils.test.ts
│   │   │   └── holidays.test.ts
│   │   ├── react/
│   │   │   └── persian-datepicker.test.tsx
│   │   ├── vue/
│   │   │   └── persian-datepicker.test.ts
│   │   └── angular/
│   │       └── persian-datepicker.component.spec.ts
│   └── ...
├── packages/
│   ├── react/
│   │   └── test/
│   ├── vue/
│   │   └── test/
│   └── angular/
│       └── test/
└── ...
```

## اجرای تست‌ها

### تست‌های هسته

```bash
# اجرای همه تست‌ها
npm test

# اجرای فقط تست‌های هسته
npm run test:core

# اجرای تست‌ها با پوشش
npm test -- --coverage

# اجرای تست‌ها در حالت نظارت
npm test -- --watch

# اجرای تست‌ها در یک فایل خاص
npm test -- path/to/file.test.ts
```

### تست‌های خاص فریم‌ورک‌ها

```bash
# تست‌های React
npm run test:react

# تست‌های Vue
npm run test:vue

# تست‌های Angular
npm run test:angular
```

## نوشتن تست‌ها

### تست‌های واحد

تست‌های واحد بر روی تست کردن توابع و متدهای فردی به صورت مجزا تمرکز دارند. مثال:

```typescript
import { PersianDatepickerElement } from '../src/persian-datepicker-element';

describe('PersianDatepickerElement', () => {
  let element: PersianDatepickerElement;

  beforeEach(() => {
    element = document.createElement('persian-datepicker-element') as PersianDatepickerElement;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should initialize with default values', () => {
    expect(element.value).toBe('');
    expect(element.format).toBe('YYYY/MM/DD');
    expect(element.showHolidays).toBe(false);
    expect(element.rtl).toBe(false);
  });

  it('should update value when setValue is called', () => {
    element.setValue(1402, 1, 1);
    expect(element.value).toBe('1402/01/01');
  });

  it('should emit change event when a date is selected', () => {
    const changeHandler = jest.fn();
    element.addEventListener('change', changeHandler);
    
    element.setValue(1402, 1, 1);
    
    expect(changeHandler).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          jalali: [1402, 1, 1],
          isHoliday: expect.any(Boolean),
          events: expect.any(Array)
        })
      })
    );
  });
});
```

### تست‌های یکپارچه‌سازی

تست‌های یکپارچه‌سازی تأیید می‌کنند که بخش‌های مختلف کامپوننت به درستی با هم کار می‌کنند:

```typescript
describe('PersianDatepickerElement Integration', () => {
  it('should update calendar when month/year changes', () => {
    const element = document.createElement('persian-datepicker-element');
    document.body.appendChild(element);
    
    // باز کردن تقویم
    element.open();
    
    // تغییر ماه
    const nextButton = element.shadowRoot.querySelector('.next-month-button');
    nextButton.click();
    
    // تأیید به‌روزرسانی تقویم
    const currentMonth = element.shadowRoot.querySelector('.current-month');
    expect(currentMonth.textContent).toMatch(/فروردین/);
    
    document.body.removeChild(element);
  });
  
  it('should handle range selection correctly', () => {
    const element = document.createElement('persian-datepicker-element');
    element.setAttribute('range-mode', '');
    document.body.appendChild(element);
    
    // باز کردن تقویم
    element.open();
    
    // انتخاب تاریخ شروع
    const startDate = element.shadowRoot.querySelector('[data-day="1"]');
    startDate.click();
    
    // انتخاب تاریخ پایان
    const endDate = element.shadowRoot.querySelector('[data-day="5"]');
    endDate.click();
    
    // تأیید انتخاب بازه
    const range = element.getRange();
    expect(range.start).toEqual([1402, 1, 1]);
    expect(range.end).toEqual([1402, 1, 5]);
    
    document.body.removeChild(element);
  });
});
```

### تست‌های دسترسی‌پذیری

```typescript
describe('PersianDatepickerElement Accessibility', () => {
  it('should have correct ARIA attributes', () => {
    const element = document.createElement('persian-datepicker-element');
    document.body.appendChild(element);
    
    const input = element.shadowRoot.querySelector('input');
    expect(input).toHaveAttribute('role', 'combobox');
    expect(input).toHaveAttribute('aria-expanded', 'false');
    expect(input).toHaveAttribute('aria-haspopup', 'listbox');
    
    document.body.removeChild(element);
  });
  
  it('should handle keyboard navigation', () => {
    const element = document.createElement('persian-datepicker-element');
    document.body.appendChild(element);
    
    // باز کردن تقویم با صفحه‌کلید
    element.focus();
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    
    // ناوبری با کلیدهای جهت‌دار
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    
    // تأیید حرکت فوکوس
    const focusedDay = element.shadowRoot.querySelector(':focus');
    expect(focusedDay).toHaveAttribute('data-day', '2');
    
    document.body.removeChild(element);
  });
});
```

## تست‌های خاص فریم‌ورک‌ها

### تست‌های React

```tsx
import { render, fireEvent, screen } from '@testing-library/react';
import { PersianDatepicker } from '../src/react';

describe('PersianDatepicker React Component', () => {
  it('should render correctly', () => {
    render(<PersianDatepicker placeholder="انتخاب تاریخ" />);
    expect(screen.getByPlaceholderText('انتخاب تاریخ')).toBeInTheDocument();
  });
  
  it('should handle controlled mode', () => {
    const onChange = jest.fn();
    render(
      <PersianDatepicker
        value="1402/01/01"
        onChange={onChange}
      />
    );
    
    const input = screen.getByRole('combobox');
    fireEvent.change(input, { target: { value: '1402/01/02' } });
    
    expect(onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: expect.objectContaining({
          jalali: [1402, 1, 2]
        })
      })
    );
  });
});
```

### تست‌های Vue

```typescript
import { mount } from '@vue/test-utils';
import { PersianDatepicker } from '../src/vue';

describe('PersianDatepicker Vue Component', () => {
  it('should render correctly', () => {
    const wrapper = mount(PersianDatepicker, {
      props: {
        placeholder: 'انتخاب تاریخ'
      }
    });
    
    expect(wrapper.find('input').attributes('placeholder')).toBe('انتخاب تاریخ');
  });
  
  it('should handle v-model', async () => {
    const wrapper = mount(PersianDatepicker, {
      props: {
        modelValue: '1402/01/01',
        'onUpdate:modelValue': (e) => wrapper.setProps({ modelValue: e })
      }
    });
    
    await wrapper.find('input').setValue('1402/01/02');
    expect(wrapper.props('modelValue')).toBe('1402/01/02');
  });
});
```

### تست‌های Angular

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersianDatepickerComponent } from '../src/angular';

describe('PersianDatepickerComponent', () => {
  let component: PersianDatepickerComponent;
  let fixture: ComponentFixture<PersianDatepickerComponent>;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersianDatepickerComponent ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersianDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should handle form control', () => {
    component.writeValue('1402/01/01');
    expect(component.value).toBe('1402/01/01');
    
    const onChange = jasmine.createSpy('onChange');
    component.registerOnChange(onChange);
    
    component.value = '1402/01/02';
    component.onChange();
    
    expect(onChange).toHaveBeenCalledWith('1402/01/02');
  });
});
```

## پوشش تست

گزارش پوشش تست پس از اجرای تست‌ها با پرچم `--coverage` تولید می‌شود. اهداف پوشش فعلی عبارتند از:

- عبارات: ۸۰٪
- شاخه‌ها: ۷۰٪
- توابع: ۸۰٪
- خطوط: ۸۰٪

برای بهبود پوشش:

۱. مسیرهای کد پوشش داده نشده را در گزارش پوشش شناسایی کنید
۲. تست‌های اضافی برای موارد خاص بنویسید
۳. تست‌های مدیریت خطا اضافه کنید
۴. ویژگی‌های خاص فریم‌ورک‌ها را تست کنید

## یکپارچه‌سازی مداوم

تست‌ها به صورت خودکار در موارد زیر اجرا می‌شوند:

- درخواست‌های pull
- ادغام‌ها در شاخه اصلی
- ساخت‌های شبانه

خط لوله CI شامل موارد زیر است:

۱. بررسی کد
۲. بررسی نوع
۳. تست‌های واحد
۴. تست‌های یکپارچه‌سازی
۵. تست‌های خاص فریم‌ورک‌ها
۶. گزارش‌دهی پوشش

## عیب‌یابی

### مشکلات رایج تست

۱. **دسترسی به Shadow DOM**: هنگام تست کردن کامپوننت‌های وب، به یاد داشته باشید که برای دسترسی به عناصر داخل shadow DOM از `shadowRoot` استفاده کنید.

۲. **عملیات ناهمگام**: برای تست‌های شامل عملیات ناهمگام از `async/await` یا callback `done` استفاده کنید.

۳. **مدیریت رویدادها**: برای رویدادهای سفارشی، از `CustomEvent` استفاده کنید و ویژگی `detail` صحیح را شامل شوید.

۴. **یکپارچه‌سازی فریم‌ورک**: هنگام تست کردن wrapperهای فریم‌ورک، اطمینان حاصل کنید که هم عملکرد wrapper و هم کامپوننت وب زیربنایی را تست می‌کنید.

### اشکال‌زدایی تست‌ها

۱. از `console.log` یا دستورات `debugger` در تست‌ها استفاده کنید
۲. تست‌ها را در حالت نظارت با `--watch` اجرا کنید
۳. از پرچم `--verbose` برای خروجی دقیق استفاده کنید
۴. گزارش پوشش تست را برای کد پوشش داده نشده بررسی کنید

### ملاحظات عملکرد

۱. از `beforeAll` برای راه‌اندازی پرهزینه استفاده کنید
۲. عناصر DOM را در `afterEach` پاک کنید
۳. وابستگی‌های خارجی را mock کنید
۴. از `jest.mock()` برای ماژول‌های پیچیده استفاده کنید

## بهترین شیوه‌ها

۱. **سازماندهی تست‌ها**:
   - تست‌های مرتبط را با بلوک‌های `describe` گروه‌بندی کنید
   - از نام‌های تست واضح و توصیفی استفاده کنید
   - از الگوی Arrange-Act-Assert پیروی کنید

۲. **جداسازی تست‌ها**:
   - هر تست باید مستقل باشد
   - پس از هر تست تمیز کنید
   - به ترتیب تست‌ها تکیه نکنید

۳. **ادعاها**:
   - از ادعاهای خاص استفاده کنید
   - پیام‌های خطای معنادار شامل کنید
   - هم موارد مثبت و هم منفی را تست کنید

۴. **پوشش کد**:
   - برای پوشش بالا تلاش کنید
   - روی مسیرهای بحرانی تمرکز کنید
   - موارد خاص و شرایط خطا را تست کنید

۵. **نگهداری**:
   - تست‌ها را با تغییرات کد به‌روز نگه دارید
   - هنگام بازسازی کد، تست‌ها را نیز بازسازی کنید
   - راه‌اندازی‌های تست پیچیده را مستند کنید 