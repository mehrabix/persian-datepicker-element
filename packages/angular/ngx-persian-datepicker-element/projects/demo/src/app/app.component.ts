import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPersianDatepickerComponent } from '../../../ngx-persian-datepicker-element/src/lib/ngx-persian-datepicker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxPersianDatepickerComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Persian DatePicker Demo';
  dateForm: FormGroup;
  selectedDate: any;
  selectedHolidayTypes: Record<string, boolean> = {
    Iran: true,
    Religious: false,
    National: false,
    Afghanistan: false
  };
  currentHolidayTypes: string[] = ['Iran']; // Default holiday type

  constructor(private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      date: [null]
    });
  }

  onDateChange(event: any) {
    console.log('Date changed:', event);
    this.selectedDate = event;
  }

  updateHolidayTypes() {
    this.currentHolidayTypes = Object.entries(this.selectedHolidayTypes)
      .filter(([_, selected]) => selected)
      .map(([type]) => type);
      
    if (this.currentHolidayTypes.length === 0) {
      this.currentHolidayTypes = ['none']; // Use 'none' if no types selected
    }
    
    console.log('Holiday types updated:', this.currentHolidayTypes);
  }
  
  toggleHolidayType(type: string) {
    this.selectedHolidayTypes[type] = !this.selectedHolidayTypes[type];
    this.updateHolidayTypes();
  }
}
