import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

import { FieldRoutingModule } from './field-routing.module';
import { FieldContainerComponent } from './field-container/field-container.component';
import { ShareModule } from '../share/share.module';
import { FieldEditComponent } from './components/field-edit/field-edit.component';
import { FieldAddComponent } from './components/field-add/field-add.component';
import { FieldFormComponent } from './components/field-form/field-form.component';
import { FieldCalendarComponent } from './components/field-calendar/field-calendar.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';


@NgModule({
  declarations: [FieldContainerComponent, FieldEditComponent, FieldAddComponent, FieldFormComponent, FieldCalendarComponent, TaskDetailComponent],
  imports: [
    CommonModule,
    ShareModule,
    ZXingScannerModule,
    FieldRoutingModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
  ]
})
export class FieldModule { }
