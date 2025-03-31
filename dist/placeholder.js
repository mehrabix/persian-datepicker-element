!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.PersianDatePickerElement=e():t.PersianDatePickerElement=e()}("undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:this,()=>(()=>{"use strict";var t={};t.d=(e,a)=>{for(var r in a)t.o(a,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:a[r]})},t.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);var e={};t.d(e,{default:()=>v});let a={g_days_in_month:[31,28,31,30,31,30,31,31,30,31,30,31],j_days_in_month:[31,31,31,31,31,31,30,30,30,30,30,29],jalaliToGregorian:function(t,e,a){t=parseInt(t.toString()),e=parseInt(e.toString()),a=parseInt(a.toString());let r=t-979,i=e-1,o=a-1,n=365*r+8*Math.floor(r/33)+Math.floor((r%33+3)/4);for(let t=0;t<i;++t)n+=this.j_days_in_month[t];let s=(n+=o)+79,d=1600+400*Math.floor(s/146097),l=!0;(s%=146097)>=36525&&(d+=100*Math.floor(--s/36524),(s%=36524)>=365?s++:l=!1),d+=4*Math.floor(s/1461),(s%=1461)>=366&&(l=!1,d+=Math.floor(--s/365),s%=365);let h=0;for(;s>=this.g_days_in_month[h]+(1===h&&l?1:0);h++)s-=this.g_days_in_month[h]+(1===h&&l?1:0);return[d,h+1,s+1]},gregorianToJalali:function(t,e,a){t=parseInt(t.toString()),e=parseInt(e.toString()),a=parseInt(a.toString());let r=t-1600,i=e-1,o=a-1,n=365*r+Math.floor((r+3)/4)-Math.floor((r+99)/100)+Math.floor((r+399)/400);for(let t=0;t<i;++t)n+=this.g_days_in_month[t];i>1&&(r%4==0&&r%100!=0||r%400==0)&&n++;let s=(n+=o)-79,d=979+33*Math.floor(s/12053)+4*Math.floor((s%=12053)/1461);(s%=1461)>=366&&(d+=Math.floor((s-1)/365),s=(s-1)%365);let l=0;for(;l<11&&s>=this.j_days_in_month[l];++l)s-=this.j_days_in_month[l];return[d,l+1,s+1]},isLeapJalaliYear:function(t){return[1,5,9,13,17,22,26,30].includes(t%33)},getDaysInMonth:function(t,e){return e<1||e>12?0:e<=6?31:e<=11?30:this.isLeapJalaliYear(t)?30:29},getMonthName:function(t){return["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"][t-1]},getDayOfWeek:function(t,e,a){let r=this.jalaliToGregorian(t,e,a);return new Date(r[0],r[1]-1,r[2]).getDay()},getDaysInYear:function(t){return this.isLeapJalaliYear(t)?366:365},isValidDate:function(t,e,a){return!(t<0)&&!(e<1)&&!(e>12)&&!(a<1)&&a<=this.getDaysInMonth(t,e)}},r={hijriToJalali:function(t,e,a){let[r,i,o]=function(t,e,a){if(e<1||e>12||a<1||a>30)throw Error("Invalid Hijri date");return function(t){let e=Math.floor(t+.5),a=Math.floor((e-1867216.25)/36524.25),r=e+1+a-Math.floor(a/4)+1524,i=Math.floor((r-122.1)/365.25),o=Math.floor(365.25*i),n=Math.floor((r-o)/30.6001),s=Math.floor(r-o-Math.floor(30.6001*n)),d=n-1-12*Math.floor(n/14),l=i-4715-Math.floor((7+d)/10);return d<1&&(d+=12,l-=1),[l,d,s]}(Math.floor((t-1)*354.367)+Math.floor((e-1)*29.5)+(a-1)+1948439.5)}(t,e,a);return function(t,e,a){let r=[31,28,31,30,31,30,31,31,30,31,30,31],i=[31,31,31,31,31,31,30,30,30,30,30,29];t=parseInt(t.toString()),e=parseInt(e.toString()),a=parseInt(a.toString());let o=t%4==0&&t%100!=0||t%400==0;r[1]=o?29:28;for(let t=0;t<e-1;t++)r[t];let n=Math.floor((t+Math.floor((e-8)/6)+100100)*1461/4)+Math.floor(((e+9)%12+1)*153/5)+a-0x2139f58,s=Math.floor(n/1461)-2820+474,d=n%1461;d>=366&&(d-=366,d%=365);let l=0,h=d;for(;h>=i[l];)h-=i[l],l++;return[s,l+1,h+1]}(r,i,o)}},i=[],o=[...i],n={"Persian Calendar":[],"Hijri Calendar":[],Source:{name:"Fallback Data",url:""}},s=!1,d=null,l=null;async function h(){if(s)return l;let t=new Date,e=a.gregorianToJalali(t.getFullYear(),t.getMonth()+1,t.getDate())[0];if(d!==e){s=!0;try{let t=await fetch("data/events.json");if(!t.ok)throw Error(`HTTP error! status: ${t.status}`);n=await t.json(),o=[...function(){try{let t=[];if(n&&Array.isArray(n["Persian Calendar"])&&(t=[...n["Persian Calendar"].map(t=>({title:t.title,month:t.month,day:t.day,type:t.type,holiday:t.holiday}))]),n&&Array.isArray(n["Hijri Calendar"])){let e=n["Hijri Calendar"].map(t=>{let e=r.hijriToJalali(t.year,t.month,t.day);return{title:t.title,month:e[1],day:e[2],type:t.type,holiday:t.holiday,hijri:{year:t.year,month:t.month,day:t.day}}});t=[...t,...e]}return t}catch(t){return console.error("Error mapping calendar events:",t),[...i]}}()],d=e}catch(t){console.error("Error loading events data:",t),o=[...i]}finally{s=!1,l=null}}}class c{static async initialize(){await h()}static getEvents(t,e,a,r=!1){return this.getAllEvents(a,r).filter(a=>a.month===t&&a.day===e)}static getEvent(t,e){return o.find(a=>a.month===t&&a.day===e)}static getEventsForMonth(t){return o.filter(e=>e.month===t)}static getEventsForYear(){return o}static isHoliday(t,e,a,r=!1){return this.getEvents(t,e,a,r).some(t=>!0===t.holiday)}static getHolidayTitles(t,e,a,r=!1){return this.getEvents(t,e,a,r).filter(t=>!0===t.holiday).map(t=>t.title)}static getAllEventTitles(t,e,a,r=!1){return this.getEvents(t,e,a,r).map(t=>t.title)}static getAllEvents(t,e=!1){return e?[...o]:o.filter(e=>t?.includes(e.type)??!0)}static getEventsByType(t,e=!1,a=!1){let r=e?o:o.filter(e=>e.type===t);return a?r.filter(t=>!0===t.holiday):r}static getAllHolidays(t,e=!1){return this.getAllEvents(t,e).filter(t=>!0===t.holiday)}static getEventTypes(){let t=new Set;return o.forEach(e=>t.add(e.type)),Array.from(t)}static getSourceMetadata(){return n.Source||{}}static async refreshEvents(){let t=new Date,e=a.gregorianToJalali(t.getFullYear(),t.getMonth()+1,t.getDate())[0];return d!==e&&await h(),[...o]}}let p=`:host {
  /* Color scheme */
  --jdp-primary: #0891b2;
  --jdp-primary-hover: #0e7490;
  --jdp-primary-foreground: #ffffff;
  
  /* Neutral colors */
  --jdp-background: #ffffff;
  --jdp-foreground: #1e293b;
  --jdp-muted: #f1f5f9;
  --jdp-muted-foreground: #64748b;
  --jdp-border: #e2e8f0;
  --jdp-ring: #0284c7;
  
  /* Holiday colors */
  --jdp-holiday-color: #ef4444;
  --jdp-holiday-bg: #fee2e2;
  --jdp-holiday-hover-bg: #fecaca;
  
  /* Range selection colors */
  --jdp-range-bg: rgba(8, 145, 178, 0.1);
  --jdp-range-color: var(--jdp-foreground);
  --jdp-range-start-bg: var(--jdp-primary);
  --jdp-range-start-color: var(--jdp-primary-foreground);
  --jdp-range-end-bg: var(--jdp-primary);
  --jdp-range-end-color: var(--jdp-primary-foreground);
  
  /* Typography */
  --jdp-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --jdp-font-size: 14px;
  --jdp-line-height: 1.5;
  --jdp-font-weight: 400;
  --jdp-font-weight-medium: 500;
  --jdp-day-name-font-size: 12px;
  --jdp-day-name-font-weight: 400;
  --jdp-day-font-size: 13px;
  --jdp-day-font-weight: 400;
  --jdp-month-year-font-size: 14px;
  --jdp-month-year-font-weight: 500;
  
  /* Spacing */
  --jdp-spacing-xs: 4px;
  --jdp-spacing-sm: 8px;
  --jdp-spacing-md: 16px;
  --jdp-spacing-lg: 24px;
  
  /* Input field */
  --jdp-input-padding-x: 14px;
  --jdp-input-padding-y: 10px;
  --jdp-input-border-width: 1px;
  --jdp-input-border-color: var(--jdp-border);
  --jdp-input-border-radius: var(--jdp-border-radius);
  --jdp-input-focus-ring-width: 2px;
  --jdp-input-focus-ring-color: rgba(2, 132, 199, 0.25);
  
  /* Calendar popup */
  --jdp-calendar-width: 280px;
  --jdp-calendar-padding: var(--jdp-spacing-md);
  --jdp-calendar-border-width: 1px;
  --jdp-calendar-border-color: var(--jdp-border);
  --jdp-calendar-border-radius: var(--jdp-border-radius);
  --jdp-calendar-shadow: 0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2);
  --jdp-calendar-z-index: 10;
  
  /* Navigation buttons */
  --jdp-nav-button-size: 30px;
  --jdp-nav-button-bg: var(--jdp-muted);
  --jdp-nav-button-bg-hover: var(--jdp-border);
  --jdp-nav-button-border-radius: var(--jdp-border-radius);
  --jdp-nav-arrow-size: 8px;
  --jdp-nav-arrow-thickness: 2px;
  --jdp-nav-arrow-color: var(--jdp-foreground);
  
  /* Day grid */
  --jdp-day-cell-size: 32px;
  --jdp-day-cell-margin: 1px;
  --jdp-day-cell-border-radius: var(--jdp-border-radius);
  
  /* States */
  --jdp-day-hover-bg: var(--jdp-muted);
  --jdp-day-selected-bg: var(--jdp-primary);
  --jdp-day-selected-color: var(--jdp-primary-foreground);
  --jdp-day-today-border-color: var(--jdp-primary);
  --jdp-day-today-border-width: 1px;
  --jdp-day-disabled-opacity: 0.4;
  
  /* Animations */
  --jdp-transition-duration: 0.2s;
  --jdp-fade-from-y: -4px;
  --jdp-fade-from-y-reverse: 4px;
  --jdp-month-transition-duration: 0.3s;
  
  /* Layout */
  --jdp-border-radius: 0.5rem;
  --jdp-direction: rtl;
  --jdp-header-gap: var(--jdp-spacing-xs);

  /* Select boxes - default values that can be overridden */
  --jdp-select-container-gap: 8px;
  --jdp-select-trigger-height: var(--jdp-nav-button-size);
  --jdp-select-trigger-bg: var(--jdp-muted);
  --jdp-select-trigger-max-width: 110px;
  --jdp-select-month-trigger-max-width: var(--jdp-select-trigger-max-width);
  --jdp-select-year-trigger-max-width: var(--jdp-select-trigger-max-width);
  --jdp-select-dropdown-width: auto;
  --jdp-select-text-overflow: ellipsis;
  
  /* Scrollbar styling - thin and subtle */
  --jdp-scrollbar-width: 4px;
  --jdp-scrollbar-track: transparent;
  --jdp-scrollbar-thumb: rgba(0, 0, 0, 0.15);
  --jdp-scrollbar-thumb-hover: rgba(0, 0, 0, 0.25);
  --jdp-scrollbar-border-radius: 4px;
}

* {
  box-sizing: border-box;
  direction: var(--jdp-direction);
}

.picker-container {
  position: relative;
  display: inline-block;
  width: 100%;
  font-family: var(--jdp-font-family);
  font-size: var(--jdp-font-size);
  line-height: var(--jdp-line-height);
  font-weight: var(--jdp-font-weight);
}

input {
  width: 100%;
  padding: var(--jdp-input-padding-y) var(--jdp-input-padding-x);
  border-radius: var(--jdp-input-border-radius);
  border: var(--jdp-input-border-width) solid var(--jdp-input-border-color);
  font-size: var(--jdp-font-size);
  line-height: var(--jdp-line-height);
  font-family: inherit;
  background-color: var(--jdp-background);
  color: var(--jdp-foreground);
  cursor: pointer;
  outline: none;
  transition: all var(--jdp-transition-duration) ease;
  text-align: right;
}

input:focus {
  border-color: var(--jdp-ring);
  box-shadow: 0 0 0 var(--jdp-input-focus-ring-width) var(--jdp-input-focus-ring-color);
}

.calendar {
  display: none;
  position: absolute;
  right: 0;
  width: var(--jdp-calendar-width);
  background: var(--jdp-background);
  border: var(--jdp-calendar-border-width) solid var(--jdp-calendar-border-color);
  border-radius: var(--jdp-calendar-border-radius);
  box-shadow: var(--jdp-calendar-shadow);
  padding: var(--jdp-calendar-padding);
  text-align: center;
  z-index: var(--jdp-calendar-z-index);
  touch-action: manipulation;
  -webkit-user-select: none;
  user-select: none;
  transform: translateZ(0);
  will-change: transform;
  backface-visibility: hidden;
  contain: layout style;
}

.calendar.position-bottom {
  top: calc(100% + 5px);
  animation: fadeInFromTop var(--jdp-transition-duration) ease;
}

.calendar.position-top {
  bottom: calc(100% + 5px);
  animation: fadeInFromBottom var(--jdp-transition-duration) ease;
}

.calendar.visible {
  display: block;
}

@keyframes fadeInFromTop {
  from { opacity: 0; transform: translateY(var(--jdp-fade-from-y)); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInFromBottom {
  from { opacity: 0; transform: translateY(var(--jdp-fade-from-y-reverse)); }
  to { opacity: 1; transform: translateY(0); }
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--jdp-spacing-md);
  gap: var(--jdp-header-gap, var(--jdp-spacing-xs));
}

.month-year {
  font-weight: var(--jdp-month-year-font-weight);
  font-size: var(--jdp-month-year-font-size);
  color: var(--jdp-foreground);
  transition: opacity var(--jdp-transition-duration) ease;
}

.month-year.fade {
  opacity: 0;
}

.days-wrapper {
  position: relative;
  touch-action: pan-y;
  overflow: visible;
  z-index: 1;
  contain: layout;
  isolation: isolate;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  transition: transform var(--jdp-month-transition-duration) ease, opacity var(--jdp-month-transition-duration) ease;
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
  position: relative;
  contain: layout;
}

.days.slide-left {
  animation: slideInLeft var(--jdp-month-transition-duration) ease;
}

.days.slide-right {
  animation: slideInRight var(--jdp-month-transition-duration) ease;
}

@keyframes slideInLeft {
  from { 
    opacity: 0; 
    transform: translateX(-10%) translateZ(0);
    pointer-events: none;
  }
  to { 
    opacity: 1; 
    transform: translateX(0) translateZ(0);
    pointer-events: auto;
  }
}

@keyframes slideInRight {
  from { 
    opacity: 0; 
    transform: translateX(10%) translateZ(0); 
    pointer-events: none;
  }
  to { 
    opacity: 1; 
    transform: translateX(0) translateZ(0);
    pointer-events: auto;
  }
}

.day {
  position: relative;
  z-index: 1;
  touch-action: manipulation;
  isolation: isolate;
}

.day:hover {
  z-index: 2;
}

.nav-button {
  background: var(--jdp-nav-button-bg);
  border: none;
  border-radius: var(--jdp-nav-button-border-radius);
  width: var(--jdp-nav-button-size);
  height: var(--jdp-nav-button-size);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--jdp-transition-duration) ease;
  position: relative;
  touch-action: manipulation;
  will-change: transform, background-color;
}

.nav-button:hover {
  background: var(--jdp-nav-button-bg-hover);
}

.nav-button:active {
  transform: translateY(1px);
}

.nav-button::before {
  content: '';
  display: block;
  width: var(--jdp-nav-arrow-size);
  height: var(--jdp-nav-arrow-size);
  border-top: var(--jdp-nav-arrow-thickness) solid var(--jdp-nav-arrow-color);
  border-right: var(--jdp-nav-arrow-thickness) solid var(--jdp-nav-arrow-color);
  position: absolute;
}

.nav-button.prev::before {
  transform: rotate(45deg);
  right: 11px;
  left: auto;
}

.nav-button.next::before {
  transform: rotate(225deg);
  left: 11px;
  right: auto;
}

.day-names {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: var(--jdp-spacing-sm);
}

.day-name {
  font-size: var(--jdp-day-name-font-size);
  font-weight: var(--jdp-day-name-font-weight);
  color: var(--jdp-muted-foreground);
  padding: var(--jdp-spacing-xs) 0;
  text-align: center;
}

.day {
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--jdp-day-cell-border-radius);
  font-size: var(--jdp-day-font-size);
  font-weight: var(--jdp-day-font-weight);
  cursor: pointer;
  transition: var(--jdp-transition-duration) ease;
  margin: var(--jdp-day-cell-margin);
  position: relative;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  -webkit-user-select: none;
  user-select: none;
}

.day:hover:not(.empty):not(.disabled) {
  background: var(--jdp-day-hover-bg);
}

.day.selected {
  background: var(--jdp-day-selected-bg);
  color: var(--jdp-day-selected-color);
}

.day.today:not(.selected) {
  border: var(--jdp-day-today-border-width) solid var(--jdp-day-today-border-color);
}

.day.empty {
  cursor: default;
}

.day.disabled {
  opacity: var(--jdp-day-disabled-opacity);
  cursor: not-allowed;
}

/* Holiday styles */
.day.holiday:not(.selected) {
  color: var(--jdp-holiday-color);
  background-color: var(--jdp-holiday-bg);
  font-weight: var(--jdp-font-weight-medium);
}

.day.holiday:hover:not(.selected):not(.disabled) {
  background-color: var(--jdp-holiday-hover-bg);
}

/* Special styling for holidays within a range */
.day.holiday.in-range {
  background-color: var(--jdp-range-bg);
  color: var(--jdp-range-color);
}

.day.holiday.range-start,
.day.holiday.range-end {
  background-color: var(--jdp-range-start-bg);
  color: var(--jdp-range-start-color);
}

.day.friday {
  color: var(--jdp-holiday-color);
}

.event-tooltip {
  position: absolute;
  background: var(--jdp-background);
  border: 1px solid var(--jdp-border);
  border-radius: var(--jdp-border-radius);
  padding: var(--jdp-spacing-sm);
  width: 200px;
  box-shadow: var(--jdp-calendar-shadow);
  text-align: right;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
  transition: opacity var(--jdp-transition-duration) ease, visibility var(--jdp-transition-duration) ease;
  pointer-events: none;
  bottom: 120%;
  right: 0;
  transform: translateY(-5px);
  z-index: 9999;
}

.event-tooltip.tooltip-visible {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  background: var(--jdp-background);
}

/* Mobile-specific tooltip positioning */
@media (max-width: 768px) {
  .event-tooltip {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 300px;
    max-height: 80vh;
    overflow-y: auto;
    bottom: auto;
    right: auto;
    background: var(--jdp-background);
    z-index: 9999;
  }

  .event-tooltip::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
}

.event-item {
  margin-bottom: 4px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--jdp-border);
  color: var(--jdp-foreground);
  background: var(--jdp-background);
}

.event-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.event-item.holiday {
  color: var(--jdp-holiday-color);
}

.event-type-label {
  display: inline-block;
  font-size: 10px;
  padding: 1px 4px;
  border-radius: 3px;
  margin-right: 4px;
  background-color: var(--jdp-muted);
  color: var(--jdp-muted-foreground);
}

/* Today button styling */
.footer {
  margin-top: var(--jdp-spacing-md);
  display: flex;
  justify-content: space-between;
}

.date-nav-button {
  background: var(--jdp-muted);
  border: none;
  border-radius: var(--jdp-border-radius);
  padding: var(--jdp-spacing-xs) var(--jdp-spacing-md);
  font-family: inherit;
  font-size: var(--jdp-font-size);
  color: var(--jdp-foreground);
  cursor: pointer;
  transition: all var(--jdp-transition-duration) ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.date-nav-button:hover {
  background: var(--jdp-nav-button-bg-hover);
}

.date-nav-button:active {
  transform: translateY(1px);
}

/* Month/Year selectors - scoped to the component */
:host .selectors-container {
  display: flex;
  gap: var(--jdp-select-container-gap, 8px);
  position: relative;
  align-items: var(--jdp-select-container-align, center);
  justify-content: var(--jdp-select-container-justify, space-between);
  width: 100%;
  max-width: calc(100% - var(--jdp-nav-button-size) * 2 - var(--jdp-spacing-sm));
  margin: 0 var(--jdp-spacing-xs);
}

:host .custom-select {
  position: relative;
  user-select: none;
  width: 100%;
  margin: 0 var(--jdp-spacing-xs, 2px);
}

:host .month-select {
  margin-left: var(--jdp-month-select-margin-left, 0);
  margin-right: var(--jdp-month-select-margin-right, 0);
}

:host .year-select {
  margin-left: var(--jdp-year-select-margin-left, 0);
  margin-right: var(--jdp-year-select-margin-right, 0);
}

:host .select-trigger {
  display: flex;
  align-items: center;
  justify-content: var(--jdp-select-trigger-justify, center);
  gap: 0 4px;
  width: 100%;
  height: var(--jdp-select-trigger-height, var(--jdp-nav-button-size));
  min-height: var(--jdp-nav-button-size);
  background-color: var(--jdp-select-trigger-bg, var(--jdp-muted));
  border: var(--jdp-select-trigger-border-width, 1px) solid var(--jdp-select-trigger-border-color, var(--jdp-border));
  border-radius: var(--jdp-select-trigger-border-radius, var(--jdp-border-radius));
  color: var(--jdp-select-trigger-color, var(--jdp-foreground));
  font-family: inherit;
  font-size: var(--jdp-select-trigger-font-size, var(--jdp-font-size));
  line-height: 1;
  padding: 0 var(--jdp-select-trigger-padding-x, 0);
  cursor: pointer;
  transition: all var(--jdp-transition-duration) ease;
  text-align: var(--jdp-select-trigger-text-align, center);
  min-width: var(--jdp-select-trigger-min-width, initial);
  outline: none;
  font-weight: var(--jdp-select-trigger-font-weight, 500);
  box-sizing: border-box;
  max-width: var(--jdp-select-trigger-max-width, 110px);
}

:host .month-select .select-trigger {
  max-width: var(--jdp-select-month-trigger-max-width, var(--jdp-select-trigger-max-width));
}

:host .year-select .select-trigger {
  max-width: var(--jdp-select-year-trigger-max-width, var(--jdp-select-trigger-max-width));
}

:host .select-trigger span:first-child {
  white-space: nowrap;
  overflow: var(--jdp-select-trigger-overflow, visible);
  text-overflow: var(--jdp-select-text-overflow, ellipsis);
  max-width: calc(100% - 24px);
  display: inline-block;
  text-align: center;
  flex: 1;
}

:host .select-trigger:hover {
  background-color: var(--jdp-select-trigger-bg-hover, rgba(0, 0, 0, 0.05));
  border-color: var(--jdp-select-trigger-border-hover, var(--jdp-border));
}

:host .select-trigger:focus-visible {
  outline: 2px solid var(--jdp-select-trigger-focus-ring-color, var(--jdp-ring));
  outline-offset: var(--jdp-select-trigger-focus-ring-offset, 2px);
}

:host .select-icon {
  margin-left: var(--jdp-select-icon-margin, var(--jdp-spacing-xs));
  display: var(--jdp-select-icon-display, none);
  justify-content: center;
  align-items: center;
  transition: transform 0.2s ease;
  width: var(--jdp-select-icon-size, 12px);
  height: var(--jdp-select-icon-size, 12px);
  opacity: var(--jdp-select-icon-opacity, 0.7);
  flex-shrink: 0;
}

:host .select-icon svg {
  width: var(--jdp-select-icon-size, 12px);
  height: var(--jdp-select-icon-size, 12px);
}

:host .select-content.open .select-icon {
  transform: rotate(180deg);
}

:host .select-content {
  position: var(--jdp-select-content-position, absolute);
  top: calc(100% + var(--jdp-select-content-top-offset, 5px));
  left: 0;
  width: var(--jdp-select-dropdown-width, 100%);
  min-width: 100%;
  background-color: var(--jdp-select-content-bg, var(--jdp-background));
  border: var(--jdp-select-content-border-width, 1px) solid var(--jdp-select-content-border-color, var(--jdp-border));
  border-radius: var(--jdp-select-content-border-radius, var(--jdp-border-radius));
  box-shadow: var(--jdp-select-content-shadow, 0 4px 8px rgba(0,0,0,0.1));
  z-index: var(--jdp-select-content-z-index, 20);
  overflow-y: auto;
  max-height: var(--jdp-select-content-max-height, 200px);
  display: none;
  padding: var(--jdp-select-content-padding-y, 0.25rem) var(--jdp-select-content-padding-x, 0);
  scroll-behavior: smooth;
  
  /* Custom scrollbar styling */
  scrollbar-width: var(--jdp-scrollbar-width-size, none);
  scrollbar-color: var(--jdp-scrollbar-thumb, rgba(0, 0, 0, 0.15)) var(--jdp-scrollbar-track, transparent);
}

/* Webkit-based browsers (Chrome, Safari, Edge) */
:host .select-content::-webkit-scrollbar {
  width: var(--jdp-scrollbar-width, 4px);
}

:host .select-content::-webkit-scrollbar-track {
  background: var(--jdp-scrollbar-track, transparent);
  border-radius: var(--jdp-scrollbar-border-radius, 4px);
}

:host .select-content::-webkit-scrollbar-thumb {
  background-color: var(--jdp-scrollbar-thumb, rgba(0, 0, 0, 0.15));
  border-radius: var(--jdp-scrollbar-border-radius, 4px);
}

:host .select-content::-webkit-scrollbar-thumb:hover {
  background-color: var(--jdp-scrollbar-thumb-hover, rgba(0, 0, 0, 0.25));
}

:host .select-content.open {
  display: block;
  animation: fadeInSelect var(--jdp-select-content-animation-duration, var(--jdp-transition-duration)) ease;
}

:host .month-select-content {
  width: var(--jdp-select-month-width, var(--jdp-select-dropdown-width, auto));
  min-width: 100%;
}

:host .year-select-content {
  width: var(--jdp-select-year-width, var(--jdp-select-dropdown-width, auto));
  min-width: 100%;
}

:host .select-item {
  padding: var(--jdp-select-item-padding-y, 0.5rem) var(--jdp-select-item-padding-x, 0.75rem);
  cursor: pointer;
  transition: background-color var(--jdp-transition-duration) ease;
  border-radius: var(--jdp-select-item-border-radius, var(--jdp-select-trigger-border-radius, var(--jdp-border-radius)));
  margin: var(--jdp-select-item-margin, 0 0.25rem);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: var(--jdp-select-item-max-width, 100%);
  box-sizing: border-box;
  text-align: var(--jdp-select-item-text-align, center);
}

:host .select-item:hover {
  background-color: var(--jdp-select-item-hover-bg, var(--jdp-day-hover-bg));
}

:host .select-item.selected {
  background-color: var(--jdp-select-item-selected-bg, var(--jdp-primary));
  color: var(--jdp-select-item-selected-color, var(--jdp-primary-foreground));
  font-weight: var(--jdp-select-item-selected-font-weight, var(--jdp-font-weight-medium));
  border-radius: var(--jdp-select-item-selected-border-radius, var(--jdp-select-trigger-border-radius, var(--jdp-border-radius)));
}

@keyframes fadeInSelect {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* RTL specific styles */
:host([rtl="true"]) .select-icon,
:host([dir="rtl"]) .select-icon {
  margin-left: 0;
  margin-right: var(--jdp-select-icon-margin, var(--jdp-spacing-xs));
}

:host([rtl="true"]) .select-item,
:host([dir="rtl"]) .select-item {
  text-align: var(--jdp-select-item-text-align, right);
}

/* Dark mode support using CSS media query for scrollbar */
@media (prefers-color-scheme: dark) {
  :host {
    --jdp-scrollbar-thumb: rgba(124, 124, 124, 0.15);
    --jdp-scrollbar-thumb-hover: rgba(41, 41, 41, 0.25);
  }
}

/* Allow manual dark mode toggle via class-based approach */
:host(.dark-theme) {
    --jdp-scrollbar-thumb: rgba(124, 124, 124, 0.15);
    --jdp-scrollbar-thumb-hover: rgba(41, 41, 41, 0.25);
}

/* Range selection styles */
.day.in-range {
  background-color: var(--jdp-range-bg);
  color: var(--jdp-range-color);
  position: relative;
  z-index: 1;
}

.day.range-start,
.day.range-end {
  background-color: var(--jdp-range-start-bg);
  color: var(--jdp-range-start-color);
  position: relative;
  z-index: 2;
}

.day.range-start {
  border-radius: var(--jdp-border-radius) 0 0 var(--jdp-border-radius);
}

.day.range-end {
  border-radius: 0 var(--jdp-border-radius) var(--jdp-border-radius) 0;
}

/* RTL specific range styles */
:host([rtl="true"]) .day.range-start,
:host([dir="rtl"]) .day.range-start {
  border-radius: 0 var(--jdp-border-radius) var(--jdp-border-radius) 0;
}

:host([rtl="true"]) .day.range-end,
:host([dir="rtl"]) .day.range-end {
  border-radius: var(--jdp-border-radius) 0 0 var(--jdp-border-radius);
}

/* Special handling for single day range */
.day.range-start.range-end {
  border-radius: var(--jdp-border-radius);
}

/* Ensure range styles take precedence over other styles */
.day.in-range:not(.range-start):not(.range-end) {
  background-color: var(--jdp-range-bg);
  color: var(--jdp-range-color);
}

/* Handle disabled dates in range */
.day.disabled.in-range {
  opacity: 0.4;
  background-color: var(--jdp-range-bg);
  color: var(--jdp-range-color);
}

/* Handle holidays in range */
.day.holiday.in-range:not(.range-start):not(.range-end) {
  background-color: var(--jdp-range-bg);
  color: var(--jdp-range-color);
}

.day.holiday.range-start,
.day.holiday.range-end {
  background-color: var(--jdp-range-start-bg);
  color: var(--jdp-range-start-color);
}
`,g=["Iran","AncientIran","International"];class u extends HTMLElement{toPersianNum(t){let e=["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];return t.toString().replace(/\d/g,t=>e[parseInt(t)])}static get observedAttributes(){return["placeholder","rtl","format","show-holidays","holiday-types","today-button-text","today-button-class","tomorrow-button-text","tomorrow-button-class","min-date","max-date","disabled-dates","range-mode","show-month-selector","show-year-selector","show-prev-button","show-next-button","show-today-button","show-tomorrow-button"]}constructor(t={}){super(),this.jalaliYear=0,this.jalaliMonth=0,this.jalaliDay=0,this.selectedDate=null,this.isRangeMode=!1,this.rangeStart=null,this.rangeEnd=null,this.isSelectingRange=!1,this.showHolidays=!0,this.holidayTypes=[...g],this.includeAllTypes=!1,this.isTransitioning=!1,this._documentClickHandler=()=>{},this.persianMonths=["فروردین","اردیبهشت","خرداد","تیر","مرداد","شهریور","مهر","آبان","آذر","دی","بهمن","اسفند"],this.holidayTypeLabels={Iran:"ایران",Afghanistan:"افغانستان",AncientIran:"ایران باستان",International:"بین‌المللی"},this.format="YYYY/MM/DD",this.minDate=null,this.maxDate=null,this.disabledDatesFn=null,this.handleInputClick=t=>{t.stopPropagation(),this.toggleCalendar()},this.handleDocumentClick=t=>{this.calendar&&this.calendar.classList.contains("visible")&&(t.composedPath().includes(this)||(this.closeAllDropdowns(),this.toggleCalendar()))},this.options=t;let e=this.attachShadow({mode:"open"});this.render(e),t.holidayTypes&&this.setHolidayTypes(t.holidayTypes)}async connectedCallback(){try{if(!this.shadowRoot){console.error("Shadow root not available");return}this.initializeDomReferences(),this.initializeCurrentDate(),await c.initialize(),this.initializeUIComponents(),this.addEventListeners(),this.initTouchGestures(),this.renderCalendar()}catch(t){console.error("Error in connectedCallback:",t)}}disconnectedCallback(){this._documentClickHandler&&document.removeEventListener("click",this._documentClickHandler),u.openCalendarInstance===this&&(u.openCalendarInstance=null),[this.input,this.calendar,this.daysContainer,this.dayNamesContainer].forEach(t=>{if(t){let e=t.cloneNode(!1);t.parentNode&&t.parentNode.replaceChild(e,t)}})}attributeChangedCallback(t,e,a){if(e!==a&&this.shadowRoot)switch(t){case"placeholder":this.input&&(this.input.placeholder=a||"");break;case"rtl":let r=null!==a&&"false"!==a;this.style.setProperty("--jdp-direction",r?"rtl":"ltr");break;case"show-holidays":this.showHolidays=null!==a&&"false"!==a,this.calendar&&this.renderCalendar();break;case"holiday-types":a?this.setHolidayTypes(a):(this.holidayTypes=[...g],this.includeAllTypes=!1),this.calendar&&this.renderCalendar();break;case"format":a&&this.isValidFormat(a)&&(this.format=a,this.selectedDate&&this.formatAndSetValue());break;case"min-date":if(a)try{let[t,e,r]=JSON.parse(a);this.setMinDate(t,e,r)}catch(t){console.error("Invalid min-date format")}else this.minDate=null;this.calendar&&this.renderCalendar();break;case"max-date":if(a)try{let[t,e,r]=JSON.parse(a);this.setMaxDate(t,e,r)}catch(t){console.error("Invalid max-date format")}else this.maxDate=null;this.calendar&&this.renderCalendar();break;case"disabled-dates":if(a){let t=window[a];"function"==typeof t&&(this.disabledDatesFn=t)}else this.disabledDatesFn=null;this.calendar&&this.renderCalendar();break;case"today-button-text":case"tomorrow-button-text":this.updateButtonText(t,a);break;case"today-button-class":case"tomorrow-button-class":this.updateButtonClass(t,a);break;case"range-mode":this.isRangeMode=null!==a&&"false"!==a,this.calendar&&this.renderCalendar();break;case"show-month-selector":case"show-year-selector":case"show-prev-button":case"show-next-button":case"show-today-button":case"show-tomorrow-button":this.shadowRoot&&(this.render(this.shadowRoot),this.initializeDomReferences(),this.initializeUIComponents(),this.addEventListeners(),this.renderCalendar())}}updateButtonText(t,e){if(!this.shadowRoot)return;let a=this.shadowRoot.getElementById("today-button-text"===t?"today-button":"tomorrow-button");a&&(a.textContent=e||("today-button-text"===t?"امروز":"فردا"))}updateButtonClass(t,e){if(!this.shadowRoot)return;let a=this.shadowRoot.getElementById("today-button-class"===t?"today-button":"tomorrow-button");a&&(a.className=`date-nav-button ${"today-button-class"===t?"today-button":"tomorrow-button"}`,e&&e.split(" ").forEach(t=>{t.trim()&&a.classList.add(t.trim())}))}initializeDomReferences(){if(this.shadowRoot){if(this.input=this.shadowRoot.getElementById("date-input"),this.calendar=this.shadowRoot.getElementById("calendar"),this.daysContainer=this.shadowRoot.getElementById("days-container"),this.dayNamesContainer=this.shadowRoot.getElementById("day-names"),!this.input||!this.calendar||!this.daysContainer||!this.dayNamesContainer)throw Error("Failed to initialize required elements");if(this.options.placeholder)this.input.placeholder=this.options.placeholder;else{let t=this.getAttribute("placeholder");t&&(this.input.placeholder=t)}}}initializeCurrentDate(){let t=new Date,e=a.gregorianToJalali(t.getFullYear(),t.getMonth()+1,t.getDate());this.jalaliYear=e[0],this.jalaliMonth=e[1],this.jalaliDay=e[2],this.selectedDate=null}initializeUIComponents(){this.initializeDayNames(),this.setupMonthYearSelectors(),c.refreshEvents()}initializeDayNames(){this.dayNamesContainer&&(this.dayNamesContainer.innerHTML="",["ش","ی","د","س","چ","پ","ج"].forEach(t=>{let e=document.createElement("div");e.classList.add("day-name"),e.textContent=t,this.dayNamesContainer.appendChild(e)}))}setupMonthYearSelectors(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("month-select-trigger"),e=this.shadowRoot.getElementById("year-select-trigger"),r=this.shadowRoot.getElementById("month-select-value"),i=this.shadowRoot.getElementById("year-select-value"),o=this.shadowRoot.getElementById("month-select-content"),n=this.shadowRoot.getElementById("year-select-content");if(!t||!e||!r||!i||!o||!n){console.error("Failed to initialize month/year selectors");return}o.innerHTML="",n.innerHTML="",this.persianMonths.forEach((t,e)=>{let a=e+1,i=document.createElement("div");i.classList.add("select-item"),i.textContent=t,i.dataset.value=a.toString(),a===this.jalaliMonth&&(i.classList.add("selected"),r.textContent=t),i.addEventListener("click",e=>{e.stopPropagation(),this.handleMonthChange(a,t),this.closeAllDropdowns()}),o.appendChild(i)});let s=new Date,d=a.gregorianToJalali(s.getFullYear(),s.getMonth()+1,s.getDate())[0],l=d-100,h=d+50;for(let t=l;t<=h;t++){let e=document.createElement("div");e.classList.add("select-item"),e.textContent=this.toPersianNum(t),e.dataset.value=t.toString(),t===this.jalaliYear&&(e.classList.add("selected"),i.textContent=this.toPersianNum(t)),e.addEventListener("click",e=>{e.stopPropagation(),this.handleYearChange(t),this.closeAllDropdowns()}),n.appendChild(e)}t.addEventListener("click",t=>{t.stopPropagation(),this.toggleDropdown(o)}),e.addEventListener("click",t=>{t.stopPropagation(),this.toggleDropdown(n)}),o.addEventListener("click",t=>{t.stopPropagation()}),n.addEventListener("click",t=>{t.stopPropagation()})}addEventListeners(){this.shadowRoot&&this.input&&this.calendar&&(this.input.addEventListener("click",this.handleInputClick),this.setupNavigationButtons(),this.calendar.addEventListener("click",t=>t.stopPropagation()),this.calendar.addEventListener("click",t=>{let e=t.target;e.closest(".select-trigger")||e.closest(".select-content")||this.closeAllDropdowns()}),this._documentClickHandler=this.handleDocumentClick.bind(this),document.addEventListener("click",this._documentClickHandler))}setupNavigationButtons(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("prev-month"),e=this.shadowRoot.getElementById("next-month"),a=this.shadowRoot.getElementById("today-button"),r=this.shadowRoot.getElementById("tomorrow-button"),i=(t,e)=>{t&&t.addEventListener("click",t=>{t.stopPropagation(),this.closeAllDropdowns(),e()})};i(t,()=>this.changeMonth(-1)),i(e,()=>this.changeMonth(1)),i(a,()=>this.goToToday()),i(r,()=>this.goToTomorrow())}setHolidayTypes(t){if("string"==typeof t){if("all"===t.toLowerCase()){this.includeAllTypes=!0,this.holidayTypes=[...c.getEventTypes()];return}this.holidayTypes=t.split(",").map(t=>t.trim()).filter(Boolean)}else Array.isArray(t)?this.holidayTypes=[...t]:this.holidayTypes=[...g];this.includeAllTypes=!1,this.calendar&&this.renderCalendar()}getHolidayTypes(){return[...this.holidayTypes]}isShowingAllTypes(){return this.includeAllTypes}render(t){let e=this.getAttribute("today-button-text")||"امروز",a=this.getAttribute("today-button-class")||"",r=this.getAttribute("tomorrow-button-text")||"فردا",i=this.getAttribute("tomorrow-button-class")||"",o="false"!==this.getAttribute("show-month-selector"),n="false"!==this.getAttribute("show-year-selector"),s="false"!==this.getAttribute("show-prev-button"),d="false"!==this.getAttribute("show-next-button"),l="false"!==this.getAttribute("show-today-button"),h="false"!==this.getAttribute("show-tomorrow-button"),c='<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';t.innerHTML=`
      <style>${p}</style>
      <div class="picker-container">
        <input type="text" id="date-input" readonly placeholder="انتخاب تاریخ">
        <div class="calendar" id="calendar">
          <div class="header">
            ${s?'<button id="prev-month" type="button" class="nav-button prev"></button>':""}
            <div class="selectors-container">
              ${o?`
              <div class="custom-select month-select" id="month-select-container">
                <button type="button" class="select-trigger" id="month-select-trigger">
                  <span id="month-select-value"></span>
                  <span class="select-icon">${c}</span>
                </button>
                <div class="select-content month-select-content" id="month-select-content"></div>
              </div>
              `:""}
              ${n?`
              <div class="custom-select year-select" id="year-select-container">
                <button type="button" class="select-trigger" id="year-select-trigger">
                  <span id="year-select-value"></span>
                  <span class="select-icon">${c}</span>
                </button>
                <div class="select-content year-select-content" id="year-select-content"></div>
              </div>
              `:""}
            </div>
            ${d?'<button id="next-month" type="button" class="nav-button next"></button>':""}
          </div>
          <div class="day-names" id="day-names"></div>
          <div class="days-wrapper">
            <div class="days" id="days-container"></div>
          </div>
          <div class="footer">
            ${l?`<button id="today-button" type="button" class="date-nav-button today-button ${a}">${e}</button>`:""}
            ${h?`<button id="tomorrow-button" type="button" class="date-nav-button tomorrow-button ${i}">${r}</button>`:""}
          </div>
        </div>
      </div>
    `}toggleCalendar(){this.closeAllDropdowns(),this.calendar.classList.contains("visible")?(this.calendar.classList.remove("visible","position-bottom","position-top"),u.openCalendarInstance===this&&(u.openCalendarInstance=null)):(u.openCalendarInstance&&u.openCalendarInstance!==this&&u.openCalendarInstance.toggleCalendar(),this.positionCalendar(),this.calendar.classList.add("visible"),u.openCalendarInstance=this)}positionCalendar(){if(!this.input||!this.calendar)return;this.calendar.classList.remove("position-bottom","position-top");let t=this.input.getBoundingClientRect(),e=window.innerHeight;this.calendar.classList.add("position-bottom");let a=this.calendar.style.visibility,r=this.calendar.style.display;this.calendar.style.visibility="hidden",this.calendar.style.display="block";let i=this.calendar.offsetHeight,o=e-t.bottom;if(o<i){let e=t.top;(e>o||e>=i)&&(this.calendar.classList.remove("position-bottom"),this.calendar.classList.add("position-top"))}this.calendar.style.visibility=a,this.calendar.style.display=r}changeMonth(t){if(this.isTransitioning)return;this.isTransitioning=!0;let e=this.daysContainer,a=t>0?"slide-left":"slide-right";e.classList.add(a),this.jalaliMonth=Number(this.jalaliMonth)+t,this.jalaliMonth<1?(this.jalaliMonth=12,this.jalaliYear--):this.jalaliMonth>12&&(this.jalaliMonth=1,this.jalaliYear++),requestAnimationFrame(()=>{setTimeout(()=>{this.updateMonthYearSelectors(),e.innerHTML="",this.renderCalendarContent(),requestAnimationFrame(()=>{e.classList.remove(a),setTimeout(()=>{this.isTransitioning=!1},50)})},200)})}updateMonthYearSelectors(){if(!this.shadowRoot)return;let t=this.shadowRoot.getElementById("month-select-value"),e=this.shadowRoot.getElementById("year-select-value");t&&(t.textContent=this.persianMonths[this.jalaliMonth-1]),e&&(e.textContent=this.toPersianNum(this.jalaliYear)),this.shadowRoot.querySelectorAll(".month-select-content .select-item").forEach(t=>{t.getAttribute("data-value")===this.jalaliMonth.toString()?t.classList.add("selected"):t.classList.remove("selected")}),this.shadowRoot.querySelectorAll(".year-select-content .select-item").forEach(t=>{t.getAttribute("data-value")===this.jalaliYear.toString()?t.classList.add("selected"):t.classList.remove("selected")})}renderCalendar(){this.shadowRoot&&this.daysContainer&&(this.updateMonthYearSelectors(),this.daysContainer.innerHTML="",this.renderCalendarContent())}renderCalendarContent(){if(!this.daysContainer)return;let t=a.getDayOfWeek(this.jalaliYear,this.jalaliMonth,1),e=a.getDaysInMonth(this.jalaliYear,this.jalaliMonth),r=new Date,i=a.gregorianToJalali(r.getFullYear(),r.getMonth()+1,r.getDate()),o=(t+1)%7;this.daysContainer.innerHTML="";for(let t=0;t<o;t++){let t=document.createElement("div");t.classList.add("day","empty"),this.daysContainer.appendChild(t)}for(let t=1;t<=e;t++){let e=document.createElement("div");e.classList.add("day"),e.textContent=this.toPersianNum(t);let a=this.isDateInRange(this.jalaliYear,this.jalaliMonth,t),r=this.isDateDisabled(this.jalaliYear,this.jalaliMonth,t);if(!a||r?(e.classList.add("disabled"),e.style.opacity="0.4",e.style.cursor="not-allowed"):(this.setupDayTooltips(e),this.setupDayClickHandler(e,t)),this.jalaliYear===i[0]&&this.jalaliMonth===i[1]&&t===i[2]&&e.classList.add("today"),this.isRangeMode){let a=[this.jalaliYear,this.jalaliMonth,t];if(e.classList.remove("in-range","range-start","range-end"),this.rangeStart&&this.rangeEnd){let t=this.compareDates(a,this.rangeStart)>=0&&0>=this.compareDates(a,this.rangeEnd);0===this.compareDates(a,this.rangeStart)?(e.classList.add("range-start"),0===this.compareDates(a,this.rangeEnd)&&e.classList.add("range-end")):0===this.compareDates(a,this.rangeEnd)?e.classList.add("range-end"):t&&e.classList.add("in-range")}else this.rangeStart&&!this.rangeEnd&&0===this.compareDates(a,this.rangeStart)&&e.classList.add("range-start")}else this.selectedDate&&this.jalaliYear===this.selectedDate[0]&&this.jalaliMonth===this.selectedDate[1]&&t===this.selectedDate[2]&&e.classList.add("selected");this.showHolidays&&this.addHolidayInfo(e,t),this.daysContainer.appendChild(e)}}compareDates(t,e){return t[0]!==e[0]?t[0]-e[0]:t[1]!==e[1]?t[1]-e[1]:t[2]-e[2]}setupDayTooltips(t){t.addEventListener("mouseenter",()=>{let e=t.querySelector(".event-tooltip");e&&e.classList.add("tooltip-visible")}),t.addEventListener("mouseleave",()=>{let e=t.querySelector(".event-tooltip");e&&e.classList.remove("tooltip-visible")})}setupDayClickHandler(t,e){let a=0;t.addEventListener("click",r=>{r.preventDefault(),r.stopPropagation();let i=new Date().getTime(),o=i-a;if("ontouchstart"in window||navigator.maxTouchPoints>0){if(o<500&&o>0){let e=t.querySelector(".event-tooltip");if(e){let t=this.shadowRoot?.querySelectorAll(".event-tooltip.tooltip-visible");t?.forEach(t=>t.classList.remove("tooltip-visible")),e.classList.add("tooltip-visible")}}else this.handleRangeSelection(e)}else this.handleRangeSelection(e);a=i})}addHolidayInfo(t,e){let r=!1;if(5===a.getDayOfWeek(this.jalaliYear,this.jalaliMonth,e)&&(t.classList.add("friday"),r=!0),c.isHoliday(this.jalaliMonth,e,this.holidayTypes,this.includeAllTypes)){t.classList.add("holiday"),r=!0;let a=c.getEvents(this.jalaliMonth,e,this.holidayTypes,this.includeAllTypes);if(a.length>0){let e=this.createEventTooltip(a);t.appendChild(e)}}return r}createEventTooltip(t){let e=document.createElement("div");return e.classList.add("event-tooltip"),t.forEach(t=>{let a=document.createElement("div");a.classList.add("event-item"),t.holiday&&a.classList.add("holiday");let r=document.createElement("span");r.classList.add("event-type-label"),r.textContent=this.holidayTypeLabels[t.type]||t.type,a.appendChild(r);let i=document.createElement("span");i.textContent=t.title,a.appendChild(i),e.appendChild(a)}),e}navigateToDate(t){let e=a.gregorianToJalali(t.getFullYear(),t.getMonth()+1,t.getDate()),r=this.jalaliYear;this.jalaliYear=e[0],this.jalaliMonth=e[1],r!==this.jalaliYear&&c.refreshEvents(),this.renderCalendar(),this.selectDate(e[2])}goToToday(){this.navigateToDate(new Date)}goToTomorrow(){let t=new Date;t.setDate(t.getDate()+1),this.navigateToDate(t)}selectDate(t){this.jalaliDay=t,this.selectedDate=[this.jalaliYear,this.jalaliMonth,this.jalaliDay],this.formatAndSetValue();let e=c.getEvents(this.jalaliMonth,t,this.holidayTypes,this.includeAllTypes),r=this.formatDate(this.selectedDate,this.format);this.dispatchEvent(new CustomEvent("change",{detail:{jalali:this.selectedDate,gregorian:a.jalaliToGregorian(this.jalaliYear,this.jalaliMonth,this.jalaliDay),isHoliday:c.isHoliday(this.jalaliMonth,t,this.holidayTypes,this.includeAllTypes),events:e,formattedDate:r},bubbles:!0})),this.closeAllDropdowns(),this.toggleCalendar(),this.renderCalendar()}formatAndSetValue(){if(this.isRangeMode){if(!this.rangeStart||!this.rangeEnd){this.input.value="";return}let t=t=>{let[e,a,r]=t;return this.formatDate(t,this.format)};this.input.value=`${t(this.rangeStart)} - ${t(this.rangeEnd)}`;return}if(!this.selectedDate){this.input.value="";return}this.input.value=this.formatDate(this.selectedDate,this.format)}formatDate(t,e){if(!t)return"";let[a,r,i]=t,o=this.handleSpecialFormat(e,a,r,i);return null!==o?o:this.handleGeneralFormat(e,a,r,i)}handleSpecialFormat(t,e,a,r){return({"YYYY/MM/DD":()=>`${this.toPersianNum(e)}/${this.toPersianNum(a.toString().padStart(2,"0"))}/${this.toPersianNum(r.toString().padStart(2,"0"))}`,"YYYY-MM-DD":()=>`${this.toPersianNum(e)}-${this.toPersianNum(a.toString().padStart(2,"0"))}-${this.toPersianNum(r.toString().padStart(2,"0"))}`,"YYYY/MM/DDth":()=>`${this.toPersianNum(e)}/${this.toPersianNum(a.toString().padStart(2,"0"))}/${this.toPersianNum(r)}ام`})[t]?.()||null}handleGeneralFormat(t,e,a,r){let i=t.split(/(\s+)/),o=[];for(let t=0;t<i.length;t++){let n=i[t];if(!n.trim()){o.push(n);continue}let s=this.replaceFormatTokens(n,e,a,r);o.push(s),t<i.length-1&&i[t+1].trim()&&o.push(" ")}return o.join("")}replaceFormatTokens(t,e,a,r){let i=t;return i.includes("MMMM")?i=i.replace("MMMM",this.persianMonths[a-1]):i.includes("MMM")&&(i=i.replace("MMM",this.persianMonths[a-1].substring(0,3))),(i=(i=(i=(i=i.replace("YYYY",this.toPersianNum(e))).replace("MM",this.toPersianNum(a.toString().padStart(2,"0")))).replace("DD",this.toPersianNum(r.toString().padStart(2,"0")))).replace("dddd",this.getWeekdayName(e,a,r))).includes("th")&&(i=i.replace("th","ام")),i}isValidFormat(t){let e=t.includes("YYYY"),a=t.includes("MM"),r=t.includes("DD"),i=/[^YMD\/\-\. dth]/g.test(t);return"YYYY/MM"===t||"DD/MM"===t||"DD.MM.YYYY"===t||"YYYY/MM/DDth"===t||[e,a,r].filter(Boolean).length>=2&&!i}getWeekdayName(t,e,a){return["شنبه","یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنج‌شنبه","جمعه"][new Date(t,e-1,a).getDay()]}handleMonthChange(t,e){this.jalaliMonth!==t&&(this.jalaliMonth=t,this.renderCalendar())}handleYearChange(t){if(this.jalaliYear===t)return;let e=this.jalaliYear;this.jalaliYear=t,e!==t&&c.refreshEvents(),this.renderCalendar()}setValue(t,e,a){this.selectedDate=[t,e,a],this.jalaliYear=t,this.jalaliMonth=e,this.jalaliDay=a,this.formatAndSetValue(),this.renderCalendar()}getValue(){return this.selectedDate?[...this.selectedDate]:null}isSelectedDateHoliday(){return!!this.selectedDate&&c.isHoliday(this.selectedDate[1],this.selectedDate[2],this.holidayTypes,this.includeAllTypes)}getSelectedDateEvents(){return this.selectedDate?[...c.getEvents(this.selectedDate[1],this.selectedDate[2],this.holidayTypes,this.includeAllTypes)]:[]}clear(){this.isRangeMode?(this.rangeStart=null,this.rangeEnd=null):this.selectedDate=null,this.input.value="",this.renderCalendar()}initTouchGestures(){if(!this.calendar||!this.shadowRoot)return;let t=0,e=0,a=!1,r=0,i=!1;this.calendar.addEventListener("touchstart",o=>{this.calendar?.classList.contains("visible")&&(t=o.touches[0].clientX,e=o.touches[0].clientY,a=!1,i=!1,r=Date.now(),o.stopPropagation())},{passive:!0}),this.calendar.addEventListener("touchmove",r=>{if(!this.calendar?.classList.contains("visible"))return;let o=r.touches[0].clientX,n=r.touches[0].clientY,s=o-t,d=n-e;if(i){r.preventDefault();return}Math.abs(s)>Math.abs(d)&&Math.abs(s)>20&&(r.preventDefault(),a=!0,i=!0)},{passive:!1}),this.calendar.addEventListener("touchend",o=>{if(!this.calendar?.classList.contains("visible"))return;let n=i;if(i=!1,(Date.now()-r<300||a)&&!this.isTransitioning){let a=o.changedTouches[0].clientX,r=o.changedTouches[0].clientY,i=a-t;if(Math.abs(i)>Math.abs(r-e)&&Math.abs(i)>20){let t="rtl"===getComputedStyle(this).getPropertyValue("--jdp-direction").trim();t&&i<0||!t&&i>0?(o.preventDefault(),o.stopPropagation(),this.changeMonth(1)):(t&&i>0||!t&&i<0)&&(o.preventDefault(),o.stopPropagation(),this.changeMonth(-1))}}n&&o.preventDefault()},{passive:!1}),this.calendar.addEventListener("touchcancel",()=>{i=!1,a=!1});let o=this.shadowRoot.getElementById("prev-month"),n=this.shadowRoot.getElementById("next-month");o&&o.addEventListener("touchstart",t=>t.stopPropagation(),{passive:!0}),n&&n.addEventListener("touchstart",t=>t.stopPropagation(),{passive:!0})}closeAllDropdowns(){this.shadowRoot&&this.shadowRoot.querySelectorAll(".select-content").forEach(t=>{t.classList.remove("open")})}toggleDropdown(t){if(!t)return;let e=t.classList.contains("open");this.closeAllDropdowns(),e||(t.classList.add("open"),requestAnimationFrame(()=>{let e=t.querySelector(".select-item.selected");if(e){let a=e.offsetTop-t.clientHeight/2+e.clientHeight/2;t.scrollTop=Math.max(0,a)}}))}open(){this.calendar.classList.contains("visible")||this.toggleCalendar()}close(){this.calendar.classList.contains("visible")&&this.toggleCalendar()}setMinDate(t,e,a){this.minDate=[t,e,a],this.calendar&&this.renderCalendar()}setMaxDate(t,e,a){this.maxDate=[t,e,a],this.calendar&&this.renderCalendar()}isDateInRange(t,e,a){if(!this.minDate&&!this.maxDate)return!0;let r=[t,e,a];return(!this.minDate||!(r<this.minDate))&&(!this.maxDate||!(r>this.maxDate))}isDateDisabled(t,e,a){return!!this.disabledDatesFn&&this.disabledDatesFn(t,e,a)}handleRangeSelection(t){if(!this.isRangeMode){this.selectDate(t);return}let e=[this.jalaliYear,this.jalaliMonth,t];this.isSelectingRange?(this.rangeEnd=e,this.isSelectingRange=!1,this.rangeStart&&this.rangeEnd&&this.compareDates(this.rangeStart,this.rangeEnd)>0&&([this.rangeStart,this.rangeEnd]=[this.rangeEnd,this.rangeStart]),this.formatAndSetValue(),this.dispatchEvent(new CustomEvent("change",{detail:{range:{start:this.rangeStart,end:this.rangeEnd},isRange:!0},bubbles:!0})),this.closeAllDropdowns(),this.toggleCalendar()):(this.rangeStart=e,this.rangeEnd=null,this.isSelectingRange=!0),this.renderCalendar()}setRange(t,e){this.isRangeMode&&(t>e&&([t,e]=[e,t]),this.rangeStart=[...t],this.rangeEnd=[...e],this.formatAndSetValue(),this.renderCalendar())}getRange(){return{start:this.rangeStart?[...this.rangeStart]:null,end:this.rangeEnd?[...this.rangeEnd]:null}}}if(u.openCalendarInstance=null,"undefined"!=typeof window&&"undefined"!=typeof customElements&&!customElements.get("persian-datepicker-element"))try{customElements.define("persian-datepicker-element",u),console.info("persian-datepicker-element registered successfully")}catch(t){console.error("Error registering persian-datepicker-element:",t)}let v=u;return e.default})());
//# sourceMappingURL=placeholder.js.map