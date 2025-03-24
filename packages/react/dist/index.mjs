// src/PersianDatepicker.tsx
import React, { forwardRef, useRef, useEffect, useImperativeHandle } from "react";
if (typeof window !== "undefined") {
  import("persian-datepicker-element");
}
var toKebabCase = (str) => {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
};
var convertValueToAttribute = (value) => {
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }
  return String(value);
};
var PersianDatepicker = forwardRef(
  (props, ref) => {
    const {
      onChange,
      className,
      style,
      primaryColor,
      primaryHover,
      backgroundColor,
      foregroundColor,
      borderColor,
      borderRadius,
      fontFamily,
      holidayColor,
      holidayBg,
      cssVariables,
      ...restProps
    } = props;
    const elementRef = useRef(null);
    const containerRef = useRef(null);
    useImperativeHandle(ref, () => ({
      getValue: () => {
        return elementRef.current?.getValue?.() || [0, 0, 0];
      },
      setValue: (year, month, day) => {
        elementRef.current?.setValue?.(year, month, day);
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
      if (containerRef.current) {
        if (!elementRef.current) {
          const element2 = document.createElement("persian-datepicker-element");
          elementRef.current = element2;
          containerRef.current.appendChild(element2);
        }
        const element = elementRef.current;
        Object.entries(restProps).forEach(([key, value]) => {
          if (value !== void 0 && value !== null) {
            const attributeName = toKebabCase(key);
            element.setAttribute(attributeName, convertValueToAttribute(value));
          }
        });
        if (primaryColor) element.style.setProperty("--jdp-primary", primaryColor);
        if (primaryHover) element.style.setProperty("--jdp-primary-hover", primaryHover);
        if (backgroundColor) element.style.setProperty("--jdp-background", backgroundColor);
        if (foregroundColor) element.style.setProperty("--jdp-foreground", foregroundColor);
        if (borderColor) element.style.setProperty("--jdp-border", borderColor);
        if (borderRadius) element.style.setProperty("--jdp-border-radius", borderRadius);
        if (fontFamily) element.style.setProperty("--jdp-font-family", fontFamily);
        if (holidayColor) element.style.setProperty("--jdp-holiday-color", holidayColor);
        if (holidayBg) element.style.setProperty("--jdp-holiday-bg", holidayBg);
        if (cssVariables) {
          Object.entries(cssVariables).forEach(([key, value]) => {
            const cssKey = key.startsWith("--") ? key : `--${key}`;
            element.style.setProperty(cssKey, value);
          });
        }
        const handleChange = (e) => {
          const customEvent = e;
          if (onChange && customEvent.detail) {
            onChange(customEvent.detail);
          }
        };
        element.addEventListener("change", handleChange);
        return () => {
          element.removeEventListener("change", handleChange);
        };
      }
    }, [
      onChange,
      primaryColor,
      primaryHover,
      backgroundColor,
      foregroundColor,
      borderColor,
      borderRadius,
      fontFamily,
      holidayColor,
      holidayBg,
      cssVariables,
      ...Object.values(restProps)
    ]);
    return /* @__PURE__ */ React.createElement("div", { ref: containerRef, className, style });
  }
);

// src/index.tsx
var index_default = PersianDatepicker;
export {
  PersianDatepicker,
  index_default as default
};
