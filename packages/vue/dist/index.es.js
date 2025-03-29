import { defineComponent as p, ref as n, computed as g, watch as r, nextTick as d, onMounted as b, createElementBlock as A, openBlock as D, normalizeStyle as V, normalizeClass as x, createElementVNode as S } from "vue";
const k = ["value", "placeholder", "format", "show-holidays", "rtl", "disabled", "min-date", "max-date", "disabled-dates", "holiday-types"], u = /* @__PURE__ */ p({
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
    }
  },
  emits: ["update:modelValue", "change"],
  setup(l, { expose: m, emit: f }) {
    const a = l, o = f, c = n(null), t = n(null), y = g(() => a.modelValue ? Array.isArray(a.modelValue) ? a.modelValue.join("/") : String(a.modelValue) : ""), v = (e) => {
      const i = e.detail;
      o("update:modelValue", i.jalali), o("change", i);
    };
    return r(() => a.modelValue, (e) => {
      d(() => {
        if (t.value)
          if (Array.isArray(e) && e.length === 3)
            try {
              t.value.setValue(e[0], e[1], e[2]);
            } catch (i) {
              console.error("Failed to set value:", i);
            }
          else typeof e == "string" && t.value.setAttribute("value", e);
      });
    }, { immediate: !1 }), r(() => a.minDate, (e) => {
      d(() => {
        t.value && e && t.value.setAttribute("min-date", JSON.stringify(e));
      });
    }), r(() => a.maxDate, (e) => {
      d(() => {
        t.value && e && t.value.setAttribute("max-date", JSON.stringify(e));
      });
    }), r(() => a.disabledDates, (e) => {
      d(() => {
        t.value && (e ? t.value.setAttribute("disabled-dates", JSON.stringify(e)) : t.value.removeAttribute("disabled-dates"));
      });
    }), b(() => {
      d(() => {
        if (a.modelValue && t.value)
          if (Array.isArray(a.modelValue) && a.modelValue.length === 3)
            try {
              t.value.setValue(a.modelValue[0], a.modelValue[1], a.modelValue[2]);
            } catch (e) {
              console.error("Failed to set initial value:", e);
            }
          else typeof a.modelValue == "string" && t.value.setAttribute("value", a.modelValue);
      });
    }), m({
      getValue: () => {
        var e;
        return (e = t.value) == null ? void 0 : e.getValue();
      },
      setValue: (e, i, h) => {
        var s;
        (s = t.value) == null || s.setValue(e, i, h);
      },
      open: () => {
        var e;
        return (e = t.value) == null ? void 0 : e.open();
      },
      close: () => {
        var e;
        return (e = t.value) == null ? void 0 : e.close();
      }
    }), (e, i) => (D(), A("div", {
      ref_key: "container",
      ref: c,
      class: x(l.className),
      style: V(l.style)
    }, [
      S("persian-datepicker-element", {
        ref_key: "elementRef",
        ref: t,
        value: y.value,
        placeholder: l.placeholder,
        format: l.format,
        "show-holidays": l.showHolidays,
        rtl: l.rtl,
        disabled: l.disabled,
        "min-date": l.minDate,
        "max-date": l.maxDate,
        "disabled-dates": l.disabledDates,
        "holiday-types": l.holidayTypes,
        onChange: v
      }, null, 40, k)
    ], 6));
  }
}), B = {
  PersianDatepicker: u,
  install: (l) => {
    l.component("PersianDatepicker", u);
  }
};
export {
  u as PersianDatepicker,
  B as default
};
