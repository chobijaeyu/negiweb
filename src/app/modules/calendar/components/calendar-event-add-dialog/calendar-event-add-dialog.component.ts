import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { calev } from 'src/app/models/calendar.model';

@Component({
  selector: 'negi-calendar-event-add-dialog',
  templateUrl: './calendar-event-add-dialog.component.html',
  styleUrls: ['./calendar-event-add-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventAddDialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<CalendarEventAddDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  onAddEvent(eventData: calev) {
    this.dialogRef.close(eventData)
  }


}
