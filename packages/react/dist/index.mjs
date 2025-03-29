// src/PersianDatepicker.tsx
import React, { forwardRef, useRef, useEffect, useImperativeHandle } from "react";
if (typeof window !== "undefined") {
  import("persian-datepicker-element");
}
var PersianDatepicker = forwardRef(
  (props, ref) => {
    const {
      value,
      onChange,
      placeholder,
      format,
      showHolidays,
      rtl,
      minDate,
      maxDate,
      disabledDates,
      disabled,
      className,
      style,
      darkMode,
      ...rest
    } = props;
    const elementRef = useRef(null);
    const handleChange = useRef(null);
    useImperativeHandle(ref, () => ({
      setValue: (year, month, day) => {
        elementRef.current?.setValue?.(year, month, day);
      },
      getValue: () => {
        const value2 = elementRef.current?.getValue?.();
        return value2 || [1400, 1, 1];
      },
      open: () => {
        elementRef.current?.open?.();
      },
      close: () => {
        elementRef.current?.close?.();
      },
      getElement: () => elementRef.current
    }));
    useEffect(() => {
      if (onChange) {
        handleChange.current = (e) => {
          const customEvent = e;
          onChange(customEvent.detail);
        };
      }
    }, [onChange]);
    useEffect(() => {
      const element = elementRef.current;
      const handler = handleChange.current;
      if (element && handler) {
        element.addEventListener("change", handler);
        return () => {
          element.removeEventListener("change", handler);
        };
      }
    }, []);
    const convertDateTupleToString = (date) => {
      if (!date) return "";
      return JSON.stringify(date);
    };
    useEffect(() => {
      if (elementRef.current) {
        if (value) elementRef.current.setAttribute("value", Array.isArray(value) ? value.join("/") : String(value));
        if (placeholder) elementRef.current.setAttribute("placeholder", placeholder);
        if (format) elementRef.current.setAttribute("format", format);
        if (showHolidays !== void 0) elementRef.current.setAttribute("show-holidays", String(showHolidays));
        if (rtl !== void 0) elementRef.current.setAttribute("rtl", String(rtl));
        if (minDate) elementRef.current.setAttribute("min-date", convertDateTupleToString(minDate));
        if (maxDate) elementRef.current.setAttribute("max-date", convertDateTupleToString(maxDate));
        if (disabledDates) elementRef.current.setAttribute("disabled-dates", disabledDates);
        if (disabled !== void 0) elementRef.current.setAttribute("disabled", String(disabled));
      }
    }, [value, placeholder, format, showHolidays, rtl, minDate, maxDate, disabledDates, disabled]);
    const minDateStr = convertDateTupleToString(minDate);
    const maxDateStr = convertDateTupleToString(maxDate);
    const elementProps = {
      value,
      placeholder,
      format,
      "show-holidays": showHolidays,
      rtl,
      "min-date": minDateStr,
      "max-date": maxDateStr,
      "disabled-dates": disabledDates,
      disabled,
      ...rest
    };
    return /* @__PURE__ */ React.createElement("div", { className, style }, /* @__PURE__ */ React.createElement(
      "persian-datepicker-element",
      {
        ref: elementRef,
        ...elementProps
      }
    ));
  }
);

// src/index.tsx
var index_default = PersianDatepicker;
export {
  PersianDatepicker,
  index_default as default
};
