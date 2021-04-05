import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { seriesTaskOption } from 'src/app/models/task-options.model';

@Component({
  selector: 'negi-add-series-task',
  templateUrl: './add-series-task.component.html',
  styleUrls: ['./add-series-task.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSeriesTaskComponent implements OnInit {
  title: string = "シリーズタスクを登録"
  constructor(
    public dialogRef: MatDialogRef<AddSeriesTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: seriesTaskOption
  ) { }

  ngOnInit(): void {
  }

  addSeriesOption(seriesTaskOption: seriesTaskOption) {
    this.dialogRef.close(seriesTaskOption)
  }

}
