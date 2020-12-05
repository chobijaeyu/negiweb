import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'negi-calendar-event-add-dialog',
  templateUrl: './calendar-event-add-dialog.component.html',
  styleUrls: ['./calendar-event-add-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventAddDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
