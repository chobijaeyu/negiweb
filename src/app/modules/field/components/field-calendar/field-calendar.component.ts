import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, ChangeDetectorRef, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { isSameDay, isSameMonth } from 'date-fns';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { calev, colors } from 'src/app/models/calendar.model';
import { negifield } from 'src/app/models/field.model';
import { CalendarEventAddDialogComponent } from 'src/app/modules/calendar/components/calendar-event-add-dialog/calendar-event-add-dialog.component';
import { CalendarEventEditDialogComponent } from 'src/app/modules/calendar/components/calendar-event-edit-dialog/calendar-event-edit-dialog.component';
import { neigiCalendarService } from 'src/app/services/calendar.service';
import { NegifieldService } from 'src/app/services/negifield.service';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'negi-field-calendar',
  templateUrl: './field-calendar.component.html',
  styleUrls: ['./field-calendar.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldCalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  locale: string = 'ja';

  CalendarView = CalendarView;

  @Input() nf!: negifield

  @Output() viewChange = new EventEmitter<CalendarView>();
  @Output() viewDateChange = new EventEmitter<Date>();

  actions: CalendarEventAction[] = [
    {
      label: '📝',
      a11yLabel: 'Edit',
      cssClass: "calAct",
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.onEditEvent(event)
      },
    },
    {
      label: '❌',
      a11yLabel: 'Delete',
      cssClass: "calAct",
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.onDeleteEvent(event)
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: calev[] = [];

  activeDayIsOpen: boolean = false;

  constructor(
    public _dialog: MatDialog,
    public nfs: NegifieldService,
    public neigiCalEventService: neigiCalendarService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.neigiCalEventService.getWithQuery({ nfID: this.nf.ID })
    this.neigiCalEventService.entities$.pipe(
      map(entities => entities.filter(v => v.confirmed === true))
    ).subscribe(r => {
      this.events = r.map(ev => {
        let _e = {
          ...ev,
          actions: this.actions,
          start: new Date(ev.start),
          color: ev.priority === 1 ? colors.red : {}
        }
        if (ev.end) {
          _e = {
            ..._e,
            end: new Date(ev.end)
          }
        }
        return _e
      })
      this.events = this.events.filter(v => v.NegiFieldID == this.nf.ID)
      this.cdr.markForCheck()
    })
  }


  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        let _e = {
          ...event,
          start: newStart,
          end: newEnd,
        };
        console.log(_e)
        // this.calService.updateCalEvent(_e).subscribe(r => console.log(r))
        this.neigiCalEventService.update(_e)
        return _e
      }
      return iEvent;
    });
  }



  onEditEvent(evdata: CalendarEvent) {
    this._dialog.open(CalendarEventEditDialogComponent, { data: evdata })
      .afterClosed()
      .subscribe((r: calev) => {
        if (r) {
          // this.calService.updateCalEvent(evdata).subscribe(r => console.log(r))
          this.neigiCalEventService.update(r)
        }
      })
  }

  onDeleteEvent(eventToDelete: calev) {
    // this.events = this.events.filter((event) => event !== eventToDelete);
    // this.calService.deleteCalEvent(eventToDelete).subscribe(r => console.log(r))
    this.neigiCalEventService.delete(eventToDelete)
  }

  eventClicked(ev: any) {
    this._dialog.open(TaskDetailComponent, { data: ev.event }).afterClosed().subscribe((r: calev) => {
      if (r) {
        this.neigiCalEventService.update(r)
      }
    })
  }

  onAddEvent() {
    this._dialog.open(CalendarEventAddDialogComponent, { data: this.nf })
      .afterClosed()
      .subscribe((r: calev) => {
        if (r) {
          console.log(r)
          r.actions = this.actions
          // r.resizable = {}
          // r.resizable.afterEnd = true
          // r.resizable.beforeStart = true
          this.events.push(r)
          this.cdr.markForCheck();
          this.refresh.next()
          // this.calService.newCalEvent(r).subscribe(r => console.log(r))
          this.neigiCalEventService.add(r)
        }
      })
  }

  onNewJourney() {

  }
}
