import { ChangeDetectorRef, Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { isSameDay, isSameMonth, } from 'date-fns';
import { MatDialog } from '@angular/material/dialog';
import { CalendarView, CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarMonthViewDay } from 'angular-calendar';

import { calev } from 'src/app/models/calendar.model';
import { neigiCalendarService } from 'src/app/services/calendar.service';
import { CalendarEventAddDialogComponent } from '../components/calendar-event-add-dialog/calendar-event-add-dialog.component';
import { CalendarEventEditDialogComponent } from '../components/calendar-event-edit-dialog/calendar-event-edit-dialog.component';
import { NegifieldService } from 'src/app/services/negifield.service';
import { NewJourneyDialogComponent } from '../components/new-journey-dialog/new-journey-dialog.component';
import { ConfirmDialogComponent } from '../../share/components/confirm-dialog/confirm-dialog.component';
import { TaskDetailComponent } from '../../field/components/task-detail/task-detail.component';
import { map, tap } from 'rxjs/operators';
import { member } from 'src/app/models/User.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAuth } from '@angular/fire/auth';

const colors: any = {
  red: {
    primary: '#FF6756',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#2A6AF2',
    secondary: '#D1E8FF',
  },
  green: {
    primary: '#7ED321',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'negi-calendar-container',
  templateUrl: './calendar-container.component.html',
  styleUrls: ['./calendar-container.component.sass']
})
export class CalendarContainerComponent implements OnInit {

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

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


  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = false;

  @Input() locale!: string;
  @Input() date!: Date;
  @Input() eventActionsTemplate!: TemplateRef<any>;
  @Input() eventTitleTemplate!: TemplateRef<any>;

  currentUser: any
  isAdmin: boolean = false

  constructor(
    public _dialog: MatDialog,
    // public calService: CalendarService,
    public afa: AngularFireAuth,
    public negifieldservice: NegifieldService,
    public snackbar: MatSnackBar,
    private neigiCalEventService: neigiCalendarService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.negifieldservice.getAll()
    this.afa.idTokenResult.subscribe(r => {
      this.isAdmin = r?.claims.role <= 3
    })
    this.afa.currentUser.then(user => {
      this.currentUser = user
    })
    this.neigiCalEventService.getWithQuery({ confirmed: "true" })
    this.neigiCalEventService.entities$.pipe(
      map(entities => entities.filter(v => v.confirmed === true))
    ).subscribe(r => {
      this.events = r.map(ev => {
        let _e = {
          ...ev,
          actions: this.actions,
          start: new Date(ev.start),
          color: this.priorityColor(ev.priority!)
        }
        if (ev.end) {
          _e = {
            ..._e,
            end: new Date(ev.end)
          }
        }
        return _e
      })

    })
  }

  priorityColor(p: number) {
    switch (p) {
      case 1:
        return colors.red
      case 2:
        return colors.green
      case 3:
        return colors.blue
      default:
        return colors.blue
    }
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

  eventClicked(ev: any) {
    this._dialog.open(TaskDetailComponent, { data: ev.event }).afterClosed().subscribe((r: calev) => {
      if (r) {
        this.neigiCalEventService.update(r)
      }
    })
  }

  onAddEvent() {
    this._dialog.open(CalendarEventAddDialogComponent)
      .afterClosed()
      .subscribe((r: calev) => {
        if (r) {
          r.actions = this.actions
          r.operator = this.currentUser.displayName
          if (this.isAdmin) {
            r.confirmed = true
          }
          // r.resizable = {}
          // r.resizable.afterEnd = true
          // r.resizable.beforeStart = true
          // this.calService.newCalEvent(r).subscribe(r => console.log(r))
          this.neigiCalEventService.add(r)
          this.cdr.markForCheck();
          if (!this.isAdmin) {
            window.alert("タスクを新規追加する場合、担当者の確認が必要です。")
          }
          this.snackbar.open(r.title + ">>> 登録しました", "X", { duration: 5000 })
        }
      },
        err => {
          console.error(err)
          this.snackbar.open("登録失敗", "X", { duration: 5000 })
        }
      )
  }


  onEditEvent(evdata: CalendarEvent) {
    this._dialog.open(CalendarEventEditDialogComponent, { data: evdata })
      .afterClosed()
      .subscribe((r: calev) => {
        if (r) {
          r.actions = this.actions
          r.operator = this.currentUser.displayName
          // r.resizable = {}
          // r.resizable.afterEnd = true
          // r.resizable.beforeStart = true
          // evdata = r
          // console.log(evdata)
          // this.cdr.markForCheck();
          // this.refresh.next()
          // this.calService.updateCalEvent(evdata).subscribe(r => console.log(r))
          this.neigiCalEventService.update(r)
        }
      })
  }

  onDeleteEvent(eventToDelete: calev) {
    // this.events = this.events.filter((event) => event !== eventToDelete);
    // this.calService.deleteCalEvent(eventToDelete).subscribe(r => console.log(r))
    // this.neigiCalEventService.delete(eventToDelete)
    this._dialog.open(ConfirmDialogComponent, { data: { title: "タスクを削除する" } }).afterClosed().subscribe(r => {
      if (r) {
        this.neigiCalEventService.delete(eventToDelete)
      }
    })
  }

  onNewJourney() {
    this._dialog.open(NewJourneyDialogComponent,)
      .afterClosed()
      .subscribe((cs: calev[]) => {
        if (cs) {
          cs.forEach(cv => {
            this.neigiCalEventService.add(cv).pipe(tap(
              r => {
                this.snackbar.open(r.title + " >>> 登録しました", "X", { duration: 5000 })
              },
              err => {
                console.error(err)
                this.snackbar.open("登録失敗", "X", { duration: 5000 })
              }))
          });
        }
      })
  }


  onRefresh() {
    this.neigiCalEventService.getWithQuery({ confirmed: "true" })
  }

  beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
    body.forEach((day) => {
      // day.badgeTotal = day.events.filter(
      //   (event) => event.meta.incrementsBadgeTotal
      // ).length;
      console.log(day.events)
    });
  }
  
}
