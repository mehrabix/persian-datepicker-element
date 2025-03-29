import { defineComponent as h, ref as u, computed as b, watch as d, nextTick as i, onMounted as A, createElementBlock as p, openBlock as S, normalizeStyle as D, normalizeClass as V, createElementVNode as x } from "vue";
const k = ["value", "placeholder", "format", "show-holidays", "rtl", "disabled", "min-date", "max-date", "disabled-dates", "holiday-types", "range-mode", "range-start", "range-end"], f = /* @__PURE__ */ h({
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
    showHolidays: {
      type: Boolean,
      default: !0
    },
    rtl: {
      type: Boolean,
      default: !0
    },
    disabled: {
      type: Boolean,
      default: !1
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
      type: String,
      default: void 0
    },
    holidayTypes: {
      type: String,
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
    // Range picker props
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
    }
  },
  emits: ["update:modelValue", "change"],
  setup(l, { expose: m, emit: y }) {
    const t = l, o = y, c = u(null), a = u(null), g = b(() => t.modelValue ? Array.isArray(t.modelValue) ? t.modelValue.join("/") : String(t.modelValue) : ""), v = (e) => {
      const r = e.detail;
      o("update:modelValue", r.jalali), o("change", r);
    };
    return d(() => t.modelValue, (e) => {
      i(() => {
        if (a.value)
          if (Array.isArray(e) && e.length === 3)
            try {
              a.value.setValue(e[0], e[1], e[2]);
            } catch (r) {
              console.error("Failed to set value:", r);
            }
          else typeof e == "string" && a.value.setAttribute("value", e);
      });
    }, { immediate: !1 }), d(() => t.minDate, (e) => {
      i(() => {
        a.value && e && a.value.setAttribute("min-date", JSON.stringify(e));
      });
    }), d(() => t.maxDate, (e) => {
      i(() => {
        a.value && e && a.value.setAttribute("max-date", JSON.stringify(e));
      });
    }), d(() => t.disabledDates, (e) => {
      i(() => {
        a.value && (e ? a.value.setAttribute("disabled-dates", JSON.stringify(e)) : a.value.removeAttribute("disabled-dates"));
      });
    }), d(() => t.rangeMode, (e) => {
      i(() => {
        a.value && a.value.setAttribute("range-mode", String(e));
      });
    }), d(() => t.rangeStart, (e) => {
      i(() => {
        a.value && e && a.value.setAttribute("range-start", JSON.stringify(e));
      });
    }), d(() => t.rangeEnd, (e) => {
      i(() => {
        a.value && e && a.value.setAttribute("range-end", JSON.stringify(e));
      });
    }), A(() => {
      i(() => {
        if (t.modelValue && a.value)
          if (Array.isArray(t.modelValue) && t.modelValue.length === 3)
            try {
              a.value.setValue(t.modelValue[0], t.modelValue[1], t.modelValue[2]);
            } catch (e) {
              console.error("Failed to set initial value:", e);
            }
          else typeof t.modelValue == "string" && a.value.setAttribute("value", t.modelValue);
      });
    }), m({
      getValue: () => {
        var e;
        return (e = a.value) == null ? void 0 : e.getValue();
      },
      setValue: (e, r, n) => {
        var s;
        (s = a.value) == null || s.setValue(e, r, n);
      },
      open: () => {
        var e;
        return (e = a.value) == null ? void 0 : e.open();
      },
      close: () => {
        var e;
        return (e = a.value) == null ? void 0 : e.close();
      },
      // Range picker methods
      setRange: (e, r) => {
        var n;
        (n = a.value) == null || n.setRange(e, r);
      },
      getRange: () => {
        var e;
        return ((e = a.value) == null ? void 0 : e.getRange()) || { start: null, end: null };
      },
      clear: () => {
        var e;
        (e = a.value) == null || e.clear();
      }
    }), (e, r) => (S(), p("div", {
      ref_key: "container",
      ref: c,
      class: V(l.className),
      style: D(l.style)
    }, [
      x("persian-datepicker-element", {
        ref_key: "elementRef",
        ref: a,
        value: g.value,
        placeholder: l.placeholder,
        format: l.format,
        "show-holidays": l.showHolidays,
        rtl: l.rtl,
        disabled: l.disabled,
        "min-date": l.minDate,
        "max-date": l.maxDate,
        "disabled-dates": l.disabledDates,
        "holiday-types": l.holidayTypes,
        "range-mode": l.rangeMode,
        "range-start": l.rangeStart,
        "range-end": l.rangeEnd,
        onChange: v
      }, null, 40, k)
    ], 6));
  }
}), B = {
  PersianDatepicker: f,
  install: (l) => {
    l.component("PersianDatepicker", f);
  }
};
export {
  f as PersianDatepicker,
  B as default
};
