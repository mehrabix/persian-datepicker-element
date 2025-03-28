import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { NgxPersianDatepickerComponent } from './ngx-persian-datepicker.component';

// Import is handled by index.ts to ensure it's only registered once
// The comment is kept for documentation purposes

/**
 * Module for the Persian DatePicker Angular wrapper component.
 *
 * This module can be imported in traditional Angular applications that use modules.
 * For standalone components, you can import the NgxPersianDatepickerComponent directly.
 *
 * The persian-datepicker web component is bundled directly with this package, so you
 * don't need to add any extra scripts to your angular.json file.
 *
 * @example
 * ```typescript
 * // In your app.module.ts or feature module
 * import { NgxPersianDatepickerModule } from 'ngx-persian-datepicker-element';
 *
 * @NgModule({
 *   imports: [
 *     // ... other imports
 *     NgxPersianDatepickerModule
 *   ],
 *   // ... declarations, providers, etc.
 * })
 * export class AppModule { }
 * ```
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPersianDatepickerComponent, // Import as a standalone component
  ],
  exports: [NgxPersianDatepickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Required for using custom elements in Angular templates
})
export class NgxPersianDatepickerModule {}
