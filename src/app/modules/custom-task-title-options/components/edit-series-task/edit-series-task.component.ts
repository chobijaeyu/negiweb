import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { seriesTaskOption } from 'src/app/models/task-options.model';

@Component({
  selector: 'negi-edit-series-task',
  templateUrl: './edit-series-task.component.html',
  styleUrls: ['./edit-series-task.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSeriesTaskComponent implements OnInit {
  title: string = "シリーズタスクを修正"
  constructor(
    public dialogRef: MatDialogRef<EditSeriesTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: seriesTaskOption
  ) { }

  ngOnInit(): void {
  }

  editSeriesTask(seriestask:seriesTaskOption){
    
  }

}
