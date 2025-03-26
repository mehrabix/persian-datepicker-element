"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  PersianDatepicker: () => PersianDatepicker,
  default: () => index_default
});
module.exports = __toCommonJS(index_exports);

// src/PersianDatepicker.tsx
var import_react = __toESM(require("react"));
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
var PersianDatepicker = (0, import_react.forwardRef)(
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
      scrollbarWidth,
      scrollbarThumbColor,
      scrollbarThumbHoverColor,
      scrollbarTrackColor,
      scrollbarBorderRadius,
      darkMode,
      ...restProps
    } = props;
    const elementRef = (0, import_react.useRef)(null);
    const containerRef = (0, import_react.useRef)(null);
    (0, import_react.useImperativeHandle)(ref, () => ({
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
    (0, import_react.useEffect)(() => {
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
        if (scrollbarWidth) element.style.setProperty("--jdp-scrollbar-width", scrollbarWidth);
        if (scrollbarThumbColor) element.style.setProperty("--jdp-scrollbar-thumb-color", scrollbarThumbColor);
        if (scrollbarThumbHoverColor) element.style.setProperty("--jdp-scrollbar-thumb-hover-color", scrollbarThumbHoverColor);
        if (scrollbarTrackColor) element.style.setProperty("--jdp-scrollbar-track-color", scrollbarTrackColor);
        if (scrollbarBorderRadius) element.style.setProperty("--jdp-scrollbar-border-radius", scrollbarBorderRadius);
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
      scrollbarWidth,
      scrollbarThumbColor,
      scrollbarThumbHoverColor,
      scrollbarTrackColor,
      scrollbarBorderRadius,
      ...Object.values(restProps)
    ]);
    return /* @__PURE__ */ import_react.default.createElement("div", { ref: containerRef, className, style });
  }
);

// src/index.tsx
var index_default = PersianDatepicker;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PersianDatepicker
});
