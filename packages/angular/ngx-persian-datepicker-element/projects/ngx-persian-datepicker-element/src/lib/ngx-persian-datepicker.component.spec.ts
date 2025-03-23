import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxPersianDatepickerComponent } from './ngx-persian-datepicker-element.component';

describe('NgxPersianDatepickerComponent', () => {
  let component: NgxPersianDatepickerComponent;
  let fixture: ComponentFixture<NgxPersianDatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxPersianDatepickerComponent]
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
