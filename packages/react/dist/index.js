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
  import("persian-datepicker-element/dist/persian-datepicker-element.min.js");
}
var PersianDatepicker = (0, import_react.forwardRef)(
  (props, ref) => {
    const {
      value,
      onChange,
      placeholder,
      format,
      showEvents,
      rtl,
      minDate,
      maxDate,
      disabledDates,
      disabled,
      className,
      style,
      darkMode,
      rangeMode,
      rangeStart,
      rangeEnd,
      ...rest
    } = props;
    const elementRef = (0, import_react.useRef)(null);
    const handleChange = (0, import_react.useRef)(null);
    (0, import_react.useImperativeHandle)(ref, () => ({
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
      getElement: () => elementRef.current,
      // Range picker methods
      setRange: (start, end) => {
        elementRef.current?.setRange?.(start, end);
      },
      getRange: () => {
        return elementRef.current?.getRange?.() || { start: null, end: null };
      },
      clear: () => {
        elementRef.current?.clear?.();
      },
      // Disabled dates method
      setDisabledDatesFn: (fn) => {
        elementRef.current?.setDisabledDatesFn?.(fn);
      }
    }));
    (0, import_react.useEffect)(() => {
      if (onChange) {
        handleChange.current = (e) => {
          const customEvent = e;
          onChange(customEvent.detail);
        };
      }
    }, [onChange]);
    (0, import_react.useEffect)(() => {
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
    (0, import_react.useEffect)(() => {
      if (elementRef.current) {
        if (value) elementRef.current.setAttribute("value", Array.isArray(value) ? value.join("/") : String(value));
        if (placeholder) elementRef.current.setAttribute("placeholder", placeholder);
        if (format) elementRef.current.setAttribute("format", format);
        if (showEvents !== void 0) elementRef.current.setAttribute("show-holidays", String(showEvents));
        if (rtl !== void 0) elementRef.current.setAttribute("rtl", String(rtl));
        if (minDate) elementRef.current.setAttribute("min-date", convertDateTupleToString(minDate));
        if (maxDate) elementRef.current.setAttribute("max-date", convertDateTupleToString(maxDate));
        if (disabledDates) {
          if (typeof disabledDates === "function") {
            elementRef.current.setDisabledDatesFn?.(disabledDates);
          } else {
            elementRef.current.setAttribute("disabled-dates", disabledDates);
          }
        } else {
          elementRef.current.setDisabledDatesFn?.((_y, _m, _d) => false);
        }
        if (disabled !== void 0) elementRef.current.setAttribute("disabled", String(disabled));
        if (rangeMode !== void 0) elementRef.current.setAttribute("range-mode", String(rangeMode));
        if (rangeStart) elementRef.current.setAttribute("range-start", convertDateTupleToString(rangeStart));
        if (rangeEnd) elementRef.current.setAttribute("range-end", convertDateTupleToString(rangeEnd));
      }
    }, [value, placeholder, format, showEvents, rtl, minDate, maxDate, disabledDates, disabled, rangeMode, rangeStart, rangeEnd]);
    const minDateStr = convertDateTupleToString(minDate);
    const maxDateStr = convertDateTupleToString(maxDate);
    const rangeStartStr = convertDateTupleToString(rangeStart);
    const rangeEndStr = convertDateTupleToString(rangeEnd);
    const elementProps = {
      value,
      placeholder,
      format,
      "show-holidays": showEvents,
      rtl,
      "min-date": minDateStr,
      "max-date": maxDateStr,
      "disabled-dates": disabledDates,
      disabled,
      "range-mode": rangeMode,
      "range-start": rangeStartStr,
      "range-end": rangeEndStr,
      ...rest
    };
    return /* @__PURE__ */ import_react.default.createElement("div", { className, style }, /* @__PURE__ */ import_react.default.createElement(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PersianDatepicker
});
