import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'negi-calendar-event-edit-dialog',
  templateUrl: './calendar-event-edit-dialog.component.html',
  styleUrls: ['./calendar-event-edit-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventEditDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
