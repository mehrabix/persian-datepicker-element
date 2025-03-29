# Persian Date Picker for Spring MVC

A modern Jalali (Shamsi) Date Picker web component for Spring MVC applications.

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

1. Add the dependency to your `pom.xml`:
```xml
<dependency>
    <groupId>com.github.mehrabix</groupId>
    <artifactId>persian-datepicker-spring</artifactId>
    <version>1.0.0</version>
</dependency>
```

2. Add the following to your JSP page:
```jsp
<%@ taglib prefix="persian" uri="http://github.com/mehrabix/persian-datepicker" %>
```

3. Add the JavaScript reference to your page:
```html
<script src="https://unpkg.com/persian-datepicker-element@1.0.35/dist/persian-datepicker-element.min.js"></script>
```

## Usage

### Basic Usage

```jsp
<form:form modelAttribute="form">
    <persian:datePicker path="date" />
</form:form>
```

### With Parameters

```jsp
<form:form modelAttribute="form">
    <persian:datePicker 
        path="date"
        placeholder="انتخاب تاریخ"
        format="YYYY/MM/DD"
        rtl="true"
        showHolidays="true"
        holidayTypes="Iran,Religious"
        todayButtonText="امروز"
        tomorrowButtonText="فردا"
        rangeMode="true" />
</form:form>
```

### Handling Date Changes

```java
@Controller
public class YourController {
    @PostMapping("/submit")
    public String handleSubmit(@ModelAttribute("form") YourForm form) {
        // The date will be available in the format "YYYY/MM/DD"
        String date = form.getDate();
        // Process the date...
        return "success";
    }
}

public class YourForm {
    private String date;
    
    // Getters and setters
    public String getDate() {
        return date;
    }
    
    public void setDate(String date) {
        this.date = date;
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
| path | string | required | The path to the property to bind to |
| placeholder | string | "انتخاب تاریخ" | Placeholder text for the input field |
| format | string | "YYYY/MM/DD" | Date format pattern |
| rtl | boolean | true | Whether to use RTL direction |
| showHolidays | boolean | true | Whether to highlight holidays |
| holidayTypes | string | "Iran,Religious" | Comma-separated list of holiday types |
| todayButtonText | string | "امروز" | Text for the Today button |
| todayButtonClass | string | null | Additional CSS classes for Today button |
| tomorrowButtonText | string | "فردا" | Text for the Tomorrow button |
| tomorrowButtonClass | string | null | Additional CSS classes for Tomorrow button |
| showMonthSelector | boolean | true | Whether to show month selector |
| showYearSelector | boolean | true | Whether to show year selector |
| showPrevButton | boolean | true | Whether to show previous month button |
| showNextButton | boolean | true | Whether to show next month button |
| showTodayButton | boolean | true | Whether to show Today button |
| showTomorrowButton | boolean | true | Whether to show Tomorrow button |
| rangeMode | boolean | false | Whether to enable range selection mode |

## License

MIT License - see LICENSE file for details 