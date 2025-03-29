# Persian Date Picker for Blazor

A modern Jalali (Shamsi) Date Picker web component for Blazor applications.

## Features

- Full support for Jalali (Persian) calendar
- Holiday highlighting with customizable types
- Range selection mode
- RTL support
- Touch gesture support for mobile devices
- Customizable styling with CSS variables
- Modern shadcn-like UI
- Configurable UI elements visibility

## Installation

1. Install the NuGet package:
```bash
dotnet add package PersianDatePicker.Blazor
```

2. Add the following to your `_Host.cshtml` or `index.html`:
```html
<script src="_content/PersianDatePicker.Blazor/persian-datepicker.js"></script>
```

3. Register the component in your `Program.cs`:
```csharp
builder.Services.AddScoped<IJSObjectReference>(sp => 
    (IJSObjectReference)sp.GetRequiredService<IJSRuntime>());
```

## Usage

### Basic Usage

```razor
<PersianDatePicker OnChange="@HandleDateChange" />
```

### With Parameters

```razor
<PersianDatePicker 
    Placeholder="انتخاب تاریخ"
    Format="YYYY/MM/DD"
    Rtl="true"
    ShowHolidays="true"
    HolidayTypes="Iran,Religious"
    TodayButtonText="امروز"
    TomorrowButtonText="فردا"
    RangeMode="true"
    OnChange="@HandleDateChange" />
```

### Handling Date Changes

```csharp
private async Task HandleDateChange(PersianDatePickerEventArgs args)
{
    // args.Jalali contains [year, month, day]
    // args.Gregorian contains [year, month, day]
    // args.IsHoliday indicates if the selected date is a holiday
    // args.Events contains any events for the selected date
    
    Console.WriteLine($"Selected Jalali date: {args.Jalali[0]}/{args.Jalali[1]}/{args.Jalali[2]}");
    Console.WriteLine($"Selected Gregorian date: {args.Gregorian[0]}/{args.Gregorian[1]}/{args.Gregorian[2]}");
    Console.WriteLine($"Is holiday: {args.IsHoliday}");
    
    foreach (var evt in args.Events)
    {
        Console.WriteLine($"Event: {evt.Title} ({evt.Type})");
    }
}
```

### Styling

You can customize the appearance using CSS variables:

```css
persian-datepicker-element {
    --jdp-primary: #0891b2;
    --jdp-font-family: 'Vazir', sans-serif;
    --jdp-border-radius: 0.5rem;
}
```

## Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| Placeholder | string | "انتخاب تاریخ" | Placeholder text for the input field |
| Format | string | "YYYY/MM/DD" | Date format pattern |
| Rtl | bool | true | Whether to use RTL direction |
| ShowHolidays | bool | true | Whether to highlight holidays |
| HolidayTypes | string | "Iran,Religious" | Comma-separated list of holiday types |
| TodayButtonText | string | "امروز" | Text for the Today button |
| TodayButtonClass | string | null | Additional CSS classes for Today button |
| TomorrowButtonText | string | "فردا" | Text for the Tomorrow button |
| TomorrowButtonClass | string | null | Additional CSS classes for Tomorrow button |
| ShowMonthSelector | bool | true | Whether to show month selector |
| ShowYearSelector | bool | true | Whether to show year selector |
| ShowPrevButton | bool | true | Whether to show previous month button |
| ShowNextButton | bool | true | Whether to show next month button |
| ShowTodayButton | bool | true | Whether to show Today button |
| ShowTomorrowButton | bool | true | Whether to show Tomorrow button |
| RangeMode | bool | false | Whether to enable range selection mode |
| OnChange | EventCallback<PersianDatePickerEventArgs> | null | Callback for date change events |

## License

MIT License - see LICENSE file for details 