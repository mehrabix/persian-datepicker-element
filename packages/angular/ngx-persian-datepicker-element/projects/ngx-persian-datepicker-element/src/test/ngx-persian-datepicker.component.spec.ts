import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPersianDatepickerComponent } from '../lib/ngx-persian-datepicker.component';

describe('NgxPersianDatepickerComponent', () => {
  let component: NgxPersianDatepickerComponent;
  let fixture: ComponentFixture<NgxPersianDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxPersianDatepickerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxPersianDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the webComponentLoaded signal initialized to false', () => {
    // Access private property for testing
    const webComponentLoaded = (component as any)['webComponentLoaded'];
    expect(webComponentLoaded).toBeDefined();
    // Initially false until the CDN script is loaded
    expect(webComponentLoaded()).toBe(false);
  });

  it('should have a method to check and load the web component', () => {
    // Access private method for testing
    const ensureWebComponentLoaded = (component as any)['ensureWebComponentLoaded'];
    expect(ensureWebComponentLoaded).toBeDefined();
    expect(typeof ensureWebComponentLoaded).toBe('function');
  });

  it('should have a placeholder signal', () => {
    expect(component.placeholder).toBeDefined();
    expect(typeof component.placeholder).toBe('function');
  });

  it('should have a format signal', () => {
    expect(component.format).toBeDefined();
    expect(typeof component.format).toBe('function');
  });

  it('should have a showHolidays signal', () => {
    expect(component.showHolidays).toBeDefined();
    expect(typeof component.showHolidays).toBe('function');
  });

  it('should have a holidayTypes signal', () => {
    expect(component.holidayTypes).toBeDefined();
    expect(typeof component.holidayTypes).toBe('function');
  });

  it('should have a dateChange output emitter', () => {
    expect(component.dateChange).toBeDefined();
  });

  // Add more tests as needed for form control integration, etc.
});
