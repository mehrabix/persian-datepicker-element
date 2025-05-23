import { defineComponent as p, ref as s, computed as A, watch as o, nextTick as n, onMounted as b, createElementBlock as D, openBlock as S, normalizeStyle as k, normalizeClass as V, createElementVNode as x } from "vue";
const F = ["value", "placeholder", "format", "show-holidays", "rtl", "min-date", "max-date", "disabled-dates", "holiday-types", "range-mode", "range-start", "range-end", "default-date"], c = /* @__PURE__ */ p({
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
    }
  },
  emits: ["update:modelValue", "change"],
  setup(l, { expose: f, emit: m }) {
    const a = l, u = m, y = s(null), t = s(null), g = A(() => a.modelValue ? Array.isArray(a.modelValue) ? a.modelValue.join("/") : String(a.modelValue) : ""), v = (e) => {
      const r = e.detail;
      u("update:modelValue", r.jalali), u("change", r);
    };
    return o(() => a.modelValue, (e) => {
      n(() => {
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
      n(() => {
        t.value && e && t.value.setAttribute("min-date", JSON.stringify(e));
      });
    }), o(() => a.maxDate, (e) => {
      n(() => {
        t.value && e && t.value.setAttribute("max-date", JSON.stringify(e));
      });
    }), o(() => a.disabledDates, (e) => {
      n(() => {
        t.value && (e ? t.value.setAttribute("disabled-dates", JSON.stringify(e)) : t.value.removeAttribute("disabled-dates"));
      });
    }), o(() => a.rangeMode, (e) => {
      n(() => {
        t.value && t.value.setAttribute("range-mode", String(e));
      });
    }), o(() => a.rangeStart, (e) => {
      n(() => {
        t.value && e && t.value.setAttribute("range-start", JSON.stringify(e));
      });
    }), o(() => a.rangeEnd, (e) => {
      n(() => {
        t.value && e && t.value.setAttribute("range-end", JSON.stringify(e));
      });
    }), b(() => {
      n(() => {
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
      setValue: (e, r, i) => {
        var d;
        try {
          (d = t.value) == null || d.setValue(e, r, i);
        } catch (h) {
          console.error("Failed to set value:", h);
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
        var i;
        try {
          (i = t.value) == null || i.setRange(e, r);
        } catch (d) {
          console.error("Failed to set range:", d);
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
      }
    }), (e, r) => (S(), D("div", {
      ref_key: "container",
      ref: y,
      class: V(l.className),
      style: k(l.style)
    }, [
      x("persian-datepicker-element", {
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
        onChange: v
      }, null, 40, F)
    ], 6));
  }
}), E = {
  PersianDatepicker: c,
  install: (l) => {
    l.component("PersianDatepicker", c);
  }
};
export {
  c as PersianDatepicker,
  E as default
};
