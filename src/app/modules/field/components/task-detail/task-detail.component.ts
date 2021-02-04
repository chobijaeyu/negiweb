import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { calev } from 'src/app/models/calendar.model';

@Component({
  selector: 'negi-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TaskDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: calev
  ) { }

  ngOnInit(): void {
  }

}
