import { defineComponent as A, ref as m, computed as p, watch as o, nextTick as i, onMounted as S, createElementBlock as b, openBlock as D, normalizeStyle as F, normalizeClass as k, createElementVNode as T } from "vue";
const x = ["value", "placeholder", "format", "show-holidays", "rtl", "min-date", "max-date", "disabled-dates", "holiday-types", "range-mode", "range-start", "range-end", "default-date", "show-time", "time-format", "default-time", "minute-step"], c = /* @__PURE__ */ A({
  __name: "PersianDatepicker",
  props: {
    modelValue: {
      type: [Array, String],
      default: void 0
    },
    placeholder: {
      type: String,
      default: ""
    },
    format: {
      type: String,
      default: "YYYY/MM/DD"
    },
    showEvents: {
      type: Boolean,
      default: !0
    },
    rtl: {
      type: Boolean,
      default: !0
    },
    minDate: {
      type: Array,
      default: void 0
    },
    maxDate: {
      type: Array,
      default: void 0
    },
    disabledDates: {
      type: [String, Function],
      default: void 0
    },
    eventTypes: {
      type: [String, Array],
      default: void 0
    },
    className: {
      type: String,
      default: ""
    },
    style: {
      type: Object,
      default: () => ({})
    },
    rangeMode: {
      type: Boolean,
      default: !1
    },
    rangeStart: {
      type: Array,
      default: void 0
    },
    rangeEnd: {
      type: Array,
      default: void 0
    },
    defaultDate: {
      type: Array,
      default: void 0
    },
    showTime: {
      type: Boolean,
      default: !1
    },
    timeFormat: {
      type: String,
      default: ""
    },
    defaultTime: {
      type: Array,
      default: void 0
    },
    minuteStep: {
      type: Number,
      default: void 0
    }
  },
  emits: ["update:modelValue", "change"],
  setup(l, { expose: f, emit: y }) {
    const a = l, s = y, v = m(null), t = m(null), g = p(() => a.modelValue ? Array.isArray(a.modelValue) ? a.modelValue.join("/") : String(a.modelValue) : ""), h = (e) => {
      const r = e.detail;
      s("update:modelValue", r.jalali), s("change", r);
    };
    return o(() => a.modelValue, (e) => {
      i(() => {
        if (t.value)
          if (Array.isArray(e) && e.length === 3)
            try {
              t.value.setValue(e[0], e[1], e[2]);
            } catch (r) {
              console.error("Failed to set value:", r);
            }
          else typeof e == "string" && t.value.setAttribute("value", e);
      });
    }, { immediate: !1 }), o(() => a.minDate, (e) => {
      i(() => {
        t.value && e && t.value.setAttribute("min-date", JSON.stringify(e));
      });
    }), o(() => a.maxDate, (e) => {
      i(() => {
        t.value && e && t.value.setAttribute("max-date", JSON.stringify(e));
      });
    }), o(() => a.disabledDates, (e) => {
      i(() => {
        t.value && (e ? t.value.setAttribute("disabled-dates", JSON.stringify(e)) : t.value.removeAttribute("disabled-dates"));
      });
    }), o(() => a.rangeMode, (e) => {
      i(() => {
        t.value && t.value.setAttribute("range-mode", String(e));
      });
    }), o(() => a.rangeStart, (e) => {
      i(() => {
        t.value && e && t.value.setAttribute("range-start", JSON.stringify(e));
      });
    }), o(() => a.rangeEnd, (e) => {
      i(() => {
        t.value && e && t.value.setAttribute("range-end", JSON.stringify(e));
      });
    }), o(() => a.showTime, (e) => {
      i(() => {
        t.value && t.value.setAttribute("show-time", String(e));
      });
    }), o(() => a.timeFormat, (e) => {
      i(() => {
        t.value && e && t.value.setAttribute("time-format", e);
      });
    }), o(() => a.defaultTime, (e) => {
      i(() => {
        t.value && (e ? t.value.setAttribute("default-time", JSON.stringify(e)) : t.value.removeAttribute("default-time"));
      });
    }), o(() => a.minuteStep, (e) => {
      i(() => {
        t.value && e !== void 0 && t.value.setAttribute("minute-step", String(e));
      });
    }), S(() => {
      i(() => {
        if (a.modelValue && t.value)
          if (Array.isArray(a.modelValue) && a.modelValue.length === 3)
            try {
              t.value.setValue(a.modelValue[0], a.modelValue[1], a.modelValue[2]);
            } catch (e) {
              console.error("Failed to set initial value:", e);
            }
          else typeof a.modelValue == "string" && t.value.setAttribute("value", a.modelValue);
      });
    }), f({
      getValue: () => {
        var e;
        try {
          return (e = t.value) == null ? void 0 : e.getValue();
        } catch (r) {
          return console.error("Failed to get value:", r), null;
        }
      },
      setValue: (e, r, u) => {
        var n;
        try {
          (n = t.value) == null || n.setValue(e, r, u);
        } catch (d) {
          console.error("Failed to set value:", d);
        }
      },
      open: () => {
        var e;
        try {
          (e = t.value) == null || e.open();
        } catch (r) {
          console.error("Failed to open datepicker:", r);
        }
      },
      close: () => {
        var e;
        try {
          (e = t.value) == null || e.close();
        } catch (r) {
          console.error("Failed to close datepicker:", r);
        }
      },
      setRange: (e, r) => {
        var u;
        try {
          (u = t.value) == null || u.setRange(e, r);
        } catch (n) {
          console.error("Failed to set range:", n);
        }
      },
      getRange: () => {
        var e;
        try {
          return ((e = t.value) == null ? void 0 : e.getRange()) || { start: null, end: null };
        } catch (r) {
          return console.error("Failed to get range:", r), { start: null, end: null };
        }
      },
      clear: () => {
        var e;
        try {
          (e = t.value) == null || e.clear();
        } catch (r) {
          console.error("Failed to clear datepicker:", r);
        }
      },
      setTime: (e, r, u = 0) => {
        var n;
        try {
          (n = t.value) == null || n.setTime(e, r, u);
        } catch (d) {
          console.error("Failed to set time:", d);
        }
      },
      getTime: () => {
        var e;
        try {
          return ((e = t.value) == null ? void 0 : e.getTime()) || { hour: 0, minute: 0, second: 0 };
        } catch (r) {
          return console.error("Failed to get time:", r), { hour: 0, minute: 0, second: 0 };
        }
      }
    }), (e, r) => (D(), b("div", {
      ref_key: "container",
      ref: v,
      class: k(l.className),
      style: F(l.style)
    }, [
      T("persian-datepicker-element", {
        ref_key: "elementRef",
        ref: t,
        value: g.value,
        placeholder: l.placeholder,
        format: l.format,
        "show-holidays": l.showEvents,
        rtl: l.rtl,
        "min-date": l.minDate,
        "max-date": l.maxDate,
        "disabled-dates": l.disabledDates,
        "holiday-types": l.eventTypes,
        "range-mode": l.rangeMode,
        "range-start": l.rangeStart,
        "range-end": l.rangeEnd,
        "default-date": l.defaultDate,
        "show-time": l.showTime,
        "time-format": l.timeFormat,
        "default-time": l.defaultTime,
        "minute-step": l.minuteStep,
        onChange: h
      }, null, 40, x)
    ], 6));
  }
}), V = {
  PersianDatepicker: c,
  install: (l) => {
    l.component("PersianDatepicker", c);
  }
};
export {
  c as PersianDatepicker,
  V as default
};
