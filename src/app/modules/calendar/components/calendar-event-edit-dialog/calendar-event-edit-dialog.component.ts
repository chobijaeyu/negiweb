import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { calev } from 'src/app/models/calendar.model';

@Component({
  selector: 'negi-calendar-event-edit-dialog',
  templateUrl: './calendar-event-edit-dialog.component.html',
  styleUrls: ['./calendar-event-edit-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventEditDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CalendarEventEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public calevdata: calev,
  ) { }

  ngOnInit(): void {
  }

  onEditEvent(eventData: calev) {
    this.dialogRef.close(eventData)
  }

}
