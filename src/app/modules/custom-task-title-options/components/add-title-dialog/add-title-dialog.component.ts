import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { titleOption } from 'src/app/models/task-options.model';

@Component({
  selector: 'negi-add-title-dialog',
  templateUrl: './add-title-dialog.component.html',
  styleUrls: ['./add-title-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTitleDialogComponent implements OnInit {
  title: string = "タスクタイトルを登録"
  constructor(
    public dialogRef: MatDialogRef<AddTitleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: titleOption
  ) { }

  ngOnInit(): void {
  }

  addTitleOption(titleOption: titleOption) {
    this.dialogRef.close(titleOption)
  }

}
