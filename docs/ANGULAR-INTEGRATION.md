# Angular Integration Guide

This guide explains how to integrate the Persian UI components with your Angular project.

## Installation

First, install the package:

```bash
npm install @shadnext/persian-datepicker-element
```

## Using the CLI

The easiest way to integrate our components is by using the CLI:

```bash
# Use npx to run without installing
npx @shadnext/cli angular add persian-datepicker-element

# Or install globally
npm install -g @shadnext/cli
shadnext angular add persian-datepicker-element
```

### CLI Options

- `--standalone` - Generate a standalone component (Angular 14+)
- `--module` - Specify an Angular module to add the component to
- `--directory` - Specify a custom directory for the component (e.g. `--directory src/app/components/date-picker`)

## Manual Integration

If you prefer to integrate manually, follow these steps:

### 1. Create the Angular Component

Create a new Angular component that wraps the web component:

```typescript
// persian-datepicker.component.ts
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

// Import the web component
import '@shadnext/persian-datepicker-element';

@Component({
  selector: 'app-persian-datepicker',
  templateUrl: './persian-datepicker.component.html',
  styleUrls: ['./persian-datepicker.component.scss']
})
export class PersianDatepickerComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() value: string | null = null;
  @Input() placeholder: string = 'انتخاب تاریخ';
  @Input() primaryColor: string = '#3b82f6';
  @Input() rtl: boolean = true;
  @Input() theme: 'light' | 'dark' = 'light';
  @Input() className: string = '';
  
  @Output() dateSelected = new EventEmitter<string>();
  
  @ViewChild('persianDatepicker') persianDatepickerRef!: ElementRef;
  
  private dateSelectedHandler: ((e: Event) => void) | null = null;
  
  ngAfterViewInit(): void {
    this.setupWebComponent();
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.persianDatepickerRef?.nativeElement) return;
    
    const element = this.persianDatepickerRef.nativeElement;
    
    if (changes['value'] && this.value) {
      element.setAttribute('date', this.value);
    }
    
    if (changes['placeholder']) {
      element.setAttribute('placeholder', this.placeholder);
    }
    
    if (changes['theme']) {
      element.setAttribute('theme', this.theme);
    }
  }
  
  ngOnDestroy(): void {
    this.removeEventListeners();
  }
  
  private setupWebComponent(): void {
    const element = this.persianDatepickerRef.nativeElement;
    
    if (this.value) element.setAttribute('date', this.value);
    element.setAttribute('placeholder', this.placeholder);
    element.setAttribute('theme', this.theme);
    
    this.dateSelectedHandler = (e: Event) => {
      const customEvent = e as CustomEvent;
      this.value = customEvent.detail;
      this.dateSelected.emit(customEvent.detail);
    };
    
    element.addEventListener('dateSelected', this.dateSelectedHandler);
  }
  
  private removeEventListeners(): void {
    const element = this.persianDatepickerRef?.nativeElement;
    if (element && this.dateSelectedHandler) {
      element.removeEventListener('dateSelected', this.dateSelectedHandler);
      this.dateSelectedHandler = null;
    }
  }
}
```

### 2. Create the HTML Template

```html
<!-- persian-datepicker.component.html -->
<div 
  class="shadnext-persian-datepicker-wrapper {{className}}"
  [ngClass]="{
    'rtl': rtl,
    'dark-theme': theme === 'dark'
  }"
  [style.--primary-color]="primaryColor"
>
  <shadnext-persian-datepicker
    #persianDatepicker
  ></shadnext-persian-datepicker>
</div>
```

### 3. Create the SCSS Styles

```scss
/* persian-datepicker.component.scss */
:host {
  display: block;
  width: 100%;
  font-family: 'Vazirmatn', 'Tahoma', Arial, sans-serif;
}

.shadnext-persian-datepicker-wrapper {
  position: relative;
  width: 100%;
  
  // Default theme variables
  --primary-color: #3b82f6;
  --background-color: #ffffff;
  --text-color: #0f172a;
  --border-color: #e2e8f0;
  --hover-color: #f1f5f9;
  --border-radius: 0.375rem;
  
  &.rtl {
    direction: rtl;
  }
  
  &.dark-theme {
    --background-color: #1e293b;
    --text-color: #e2e8f0;
    --border-color: #475569;
    --hover-color: #334155;
  }
  
  shadnext-persian-datepicker {
    --primary-color: var(--primary-color);
    --background-color: var(--background-color);
    --text-color: var(--text-color);
    --border-color: var(--border-color);
    --hover-color: var(--hover-color);
    width: 100%;
    display: block;
  }
}
```

### 4. Register the Web Component Schema

For Angular to recognize the custom element, add this to your module:

```typescript
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PersianDatepickerComponent } from './components/persian-datepicker/persian-datepicker.component';

// Import the web component to register it
import '@shadnext/persian-datepicker-element';

@NgModule({
  declarations: [
    AppComponent,
    PersianDatepickerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this schema to allow custom elements
})
export class AppModule { }
```

## Usage in Your Angular Component

Now you can use the component in your Angular templates:

```html
<app-persian-datepicker
  [value]="selectedDate"
  [theme]="currentTheme"
  [rtl]="true"
  (dateSelected)="onDateSelected($event)"
></app-persian-datepicker>
```

And in your component:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedDate: string | null = null;
  currentTheme: 'light' | 'dark' = 'light';
  
  onDateSelected(date: string): void {
    console.log('Selected date:', date);
    this.selectedDate = date;
    // Do something with the selected date
  }
  
  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
  }
}
```

## Angular Standalone Components (Angular 14+)

If you're using Angular 14 or newer, you can use standalone components:

```typescript
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import the web component
import '@shadnext/persian-datepicker-element';

@Component({
  selector: 'app-persian-datepicker',
  templateUrl: './persian-datepicker.component.html',
  styleUrls: ['./persian-datepicker.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class PersianDatepickerComponent implements AfterViewInit, OnChanges, OnDestroy {
  // Component implementation (same as above)
}
```

Then import it directly in your app.config.ts or main.ts:

```typescript
// For Angular 16+ (app.config.ts)
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

// Import the web component to register it
import '@shadnext/persian-datepicker-element';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      // ...your routes
    ])
  ]
};
```

And use it in other standalone components:

```typescript
import { Component } from '@angular/core';
import { PersianDatepickerComponent } from './components/persian-datepicker/persian-datepicker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PersianDatepickerComponent],
  template: `
    <app-persian-datepicker
      [value]="selectedDate"
      [theme]="currentTheme"
      (dateSelected)="onDateSelected($event)"
    ></app-persian-datepicker>
  `
})
export class AppComponent {
  // Component implementation
}
``` 