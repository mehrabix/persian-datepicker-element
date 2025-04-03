(function(i,t){typeof exports=="object"&&typeof module<"u"?t(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],t):(i=typeof globalThis<"u"?globalThis:i||self,t(i.VuePersianDatepicker={},i.Vue))})(this,function(i,t){"use strict";const u=["value","placeholder","format","show-holidays","rtl","min-date","max-date","disabled-dates","holiday-types","range-mode","range-start","range-end","default-date"],s=t.defineComponent({__name:"PersianDatepicker",props:{modelValue:{type:[Array,String],default:void 0},placeholder:{type:String,default:""},format:{type:String,default:"YYYY/MM/DD"},showEvents:{type:Boolean,default:!0},rtl:{type:Boolean,default:!0},minDate:{type:Array,default:void 0},maxDate:{type:Array,default:void 0},disabledDates:{type:[String,Function],default:void 0},eventTypes:{type:[String,Array],default:void 0},className:{type:String,default:""},style:{type:Object,default:()=>({})},rangeMode:{type:Boolean,default:!1},rangeStart:{type:Array,default:void 0},rangeEnd:{type:Array,default:void 0},defaultDate:{type:Array,default:void 0}},emits:["update:modelValue","change"],setup(n,{expose:y,emit:m}){const r=n,c=m,g=t.ref(null),a=t.ref(null),h=t.computed(()=>r.modelValue?Array.isArray(r.modelValue)?r.modelValue.join("/"):String(r.modelValue):""),v=e=>{const l=e.detail;c("update:modelValue",l.jalali),c("change",l)};return t.watch(()=>r.modelValue,e=>{t.nextTick(()=>{if(a.value)if(Array.isArray(e)&&e.length===3)try{a.value.setValue(e[0],e[1],e[2])}catch(l){console.error("Failed to set value:",l)}else typeof e=="string"&&a.value.setAttribute("value",e)})},{immediate:!1}),t.watch(()=>r.minDate,e=>{t.nextTick(()=>{a.value&&e&&a.value.setAttribute("min-date",JSON.stringify(e))})}),t.watch(()=>r.maxDate,e=>{t.nextTick(()=>{a.value&&e&&a.value.setAttribute("max-date",JSON.stringify(e))})}),t.watch(()=>r.disabledDates,e=>{t.nextTick(()=>{a.value&&(e?a.value.setAttribute("disabled-dates",JSON.stringify(e)):a.value.removeAttribute("disabled-dates"))})}),t.watch(()=>r.rangeMode,e=>{t.nextTick(()=>{a.value&&a.value.setAttribute("range-mode",String(e))})}),t.watch(()=>r.rangeStart,e=>{t.nextTick(()=>{a.value&&e&&a.value.setAttribute("range-start",JSON.stringify(e))})}),t.watch(()=>r.rangeEnd,e=>{t.nextTick(()=>{a.value&&e&&a.value.setAttribute("range-end",JSON.stringify(e))})}),t.onMounted(()=>{t.nextTick(()=>{if(r.modelValue&&a.value)if(Array.isArray(r.modelValue)&&r.modelValue.length===3)try{a.value.setValue(r.modelValue[0],r.modelValue[1],r.modelValue[2])}catch(e){console.error("Failed to set initial value:",e)}else typeof r.modelValue=="string"&&a.value.setAttribute("value",r.modelValue)})}),y({getValue:()=>{var e;try{return(e=a.value)==null?void 0:e.getValue()}catch(l){return console.error("Failed to get value:",l),null}},setValue:(e,l,o)=>{var d;try{(d=a.value)==null||d.setValue(e,l,o)}catch(p){console.error("Failed to set value:",p)}},open:()=>{var e;try{(e=a.value)==null||e.open()}catch(l){console.error("Failed to open datepicker:",l)}},close:()=>{var e;try{(e=a.value)==null||e.close()}catch(l){console.error("Failed to close datepicker:",l)}},setRange:(e,l)=>{var o;try{(o=a.value)==null||o.setRange(e,l)}catch(d){console.error("Failed to set range:",d)}},getRange:()=>{var e;try{return((e=a.value)==null?void 0:e.getRange())||{start:null,end:null}}catch(l){return console.error("Failed to get range:",l),{start:null,end:null}}},clear:()=>{var e;try{(e=a.value)==null||e.clear()}catch(l){console.error("Failed to clear datepicker:",l)}}}),(e,l)=>(t.openBlock(),t.createElementBlock("div",{ref_key:"container",ref:g,class:t.normalizeClass(n.className),style:t.normalizeStyle(n.style)},[t.createElementVNode("persian-datepicker-element",{ref_key:"elementRef",ref:a,value:h.value,placeholder:n.placeholder,format:n.format,"show-holidays":n.showEvents,rtl:n.rtl,"min-date":n.minDate,"max-date":n.maxDate,"disabled-dates":n.disabledDates,"holiday-types":n.eventTypes,"range-mode":n.rangeMode,"range-start":n.rangeStart,"range-end":n.rangeEnd,"default-date":n.defaultDate,onChange:v},null,40,u)],6))}}),f={PersianDatepicker:s,install:n=>{n.component("PersianDatepicker",s)}};i.PersianDatepicker=s,i.default=f,Object.defineProperties(i,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
