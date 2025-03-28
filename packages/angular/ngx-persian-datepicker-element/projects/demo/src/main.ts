import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// The persian-datepicker-element is loaded from the scripts array in angular.json

bootstrapApplication(AppComponent, appConfig).catch(err => console.error(err));
