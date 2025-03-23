import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPersianDatepickerComponent } from '../lib/ngx-persian-datepicker-element.component';

describe('NgxPersianDatepickerComponent', () => {
  let component: NgxPersianDatepickerComponent;
  let fixture: ComponentFixture<NgxPersianDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxPersianDatepickerComponent]
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

  it('should set placeholder when placeholderInput is provided', () => {
    const testPlaceholder = 'Test Placeholder';
    component.placeholderInput = testPlaceholder;
    expect(component.placeholder()).toBe(testPlaceholder);
  });

  it('should set format when formatInput is provided', () => {
    const testFormat = 'YYYY/MM/DD';
    component.formatInput = testFormat;
    expect(component.format()).toBe(testFormat);
  });

  it('should set showHolidays when showHolidaysInput is provided', () => {
    component.showHolidaysInput = true;
    expect(component.showHolidays()).toBe(true);
  });

  it('should set holidayTypes when holidayTypesInput is provided', () => {
    const testHolidayTypes = ['weekend', 'religious'];
    component.holidayTypesInput = testHolidayTypes;
    expect(component.holidayTypes()).toBe(testHolidayTypes);
  });

  it('should have a dateChange output emitter', () => {
    expect(component.dateChange).toBeDefined();
  });

  // Add more tests as needed for form control integration, etc.
}); 