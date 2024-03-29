import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { titleOption } from 'src/app/models/task-options.model';

@Component({
  selector: 'negi-edit-title-dialog',
  templateUrl: './edit-title-dialog.component.html',
  styleUrls: ['./edit-title-dialog.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTitleDialogComponent implements OnInit {
  title: string = "タスクタイトルを修正"
  constructor(
    public dialogRef: MatDialogRef<EditTitleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: titleOption
  ) { }

  ngOnInit(): void {
  }

  editTitleOption(to: titleOption) {
    this.dialogRef.close(to)
  }

}
