import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NegiCalendarRoutingModule } from './calendar-routing.module';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarContainerComponent } from './calendar-container/calendar-container.component';
import { CalendarHeaderComponent } from './components/calendar-header/calendar-header.component';
import { CalendarCellComponent } from './components/calendar-cell/calendar-cell.component';
import { CalendarEventAddDialogComponent } from './components/calendar-event-add-dialog/calendar-event-add-dialog.component';
import { CalendarEventFormComponent } from './components/calendar-event-form/calendar-event-form.component';
import { CalendarEventEditDialogComponent } from './components/calendar-event-edit-dialog/calendar-event-edit-dialog.component';
import { ShareModule } from '../share/share.module';
import { NewJourneyDialogComponent } from './components/new-journey-dialog/new-journey-dialog.component';


@NgModule({
  declarations: [CalendarContainerComponent, CalendarHeaderComponent, CalendarCellComponent, CalendarEventAddDialogComponent, CalendarEventFormComponent, CalendarEventEditDialogComponent, NewJourneyDialogComponent],
  imports: [
    CommonModule,
    NegiCalendarRoutingModule, 
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    ShareModule
  ]
})
export class NegiCalendarModule { }
