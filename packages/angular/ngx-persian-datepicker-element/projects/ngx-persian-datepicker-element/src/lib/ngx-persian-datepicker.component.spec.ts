import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxPersianDatepickerComponent } from './ngx-persian-datepicker.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NgxPersianDatepickerComponent', () => {
  let component: NgxPersianDatepickerComponent;
  let fixture: ComponentFixture<NgxPersianDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxPersianDatepickerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxPersianDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
