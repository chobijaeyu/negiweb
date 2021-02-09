import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { calev } from 'src/app/models/calendar.model';
import { negifield } from 'src/app/models/field.model';

@Component({
  selector: 'negi-calendar-event-add-dialog',
  templateUrl: './calendar-event-add-dialog.component.html',
  styleUrls: ['./calendar-event-add-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventAddDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CalendarEventAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: negifield
  ) { }

  ngOnInit(): void {
  }

  onAddEvent(eventData: calev) {
    this.dialogRef.close(eventData)
  }


}
