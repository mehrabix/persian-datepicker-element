import { defineComponent as p, ref as n, computed as V, watch as u, nextTick as r, onMounted as g, createElementBlock as A, openBlock as k, normalizeStyle as x, normalizeClass as b, createElementVNode as S } from "vue";
const D = ["value", "placeholder", "format", "show-holidays", "rtl", "disabled", "min", "max", "holiday-types"], s = /* @__PURE__ */ p({
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
    min: {
      type: Array,
      default: void 0
    },
    max: {
      type: Array,
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
  setup(t, { expose: m, emit: c }) {
    const a = t, i = c, f = n(null), l = n(null), y = V(() => a.modelValue ? Array.isArray(a.modelValue) ? a.modelValue.join("/") : String(a.modelValue) : ""), h = (e) => {
      const o = e.detail;
      i("update:modelValue", o.jalali), i("change", o);
    };
    return u(
      () => a.modelValue,
      (e) => {
        r(() => {
          if (l.value)
            if (Array.isArray(e) && e.length === 3)
              try {
                l.value.setValue(e[0], e[1], e[2]);
              } catch (o) {
                console.error("Failed to set value:", o);
              }
            else typeof e == "string" && l.value.setAttribute("value", e);
        });
      },
      { immediate: !1 }
    ), u([() => a.min, () => a.max], ([e, o]) => {
      r(() => {
        l.value && (e && (l.value.min = e), o && (l.value.max = o));
      });
    }), g(() => {
      r(() => {
        if (a.modelValue && l.value)
          if (Array.isArray(a.modelValue) && a.modelValue.length === 3)
            try {
              l.value.setValue(
                a.modelValue[0],
                a.modelValue[1],
                a.modelValue[2]
              );
            } catch (e) {
              console.error("Failed to set initial value:", e);
            }
          else typeof a.modelValue == "string" && l.value.setAttribute("value", a.modelValue);
      });
    }), m({
      getValue: () => {
        var e;
        return (e = l.value) == null ? void 0 : e.getValue();
      },
      setValue: (e, o, v) => {
        var d;
        (d = l.value) == null || d.setValue(e, o, v);
      },
      open: () => {
        var e;
        return (e = l.value) == null ? void 0 : e.open();
      },
      close: () => {
        var e;
        return (e = l.value) == null ? void 0 : e.close();
      }
    }), (e, o) => (k(), A("div", {
      ref_key: "container",
      ref: f,
      class: b(t.className),
      style: x(t.style)
    }, [
      S("persian-datepicker-element", {
        ref_key: "elementRef",
        ref: l,
        value: y.value,
        placeholder: t.placeholder,
        format: t.format,
        "show-holidays": t.showHolidays,
        rtl: t.rtl,
        disabled: t.disabled,
        min: t.min,
        max: t.max,
        "holiday-types": t.holidayTypes,
        onChange: h
      }, null, 40, D)
    ], 6));
  }
}), C = {
  PersianDatepicker: s,
  install: (t) => {
    t.component("PersianDatepicker", s);
  }
};
export {
  s as PersianDatepicker,
  C as default
};
