import { App } from 'vue';

import PersianDatepicker from './PersianDatepicker.vue';

export { PersianDatepicker };

// Also default export for backwards compatibility
export default {
  PersianDatepicker,
  install: (app: App) => {
    app.component('PersianDatepicker', PersianDatepicker);
  },
};
