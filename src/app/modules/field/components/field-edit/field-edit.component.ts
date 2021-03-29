import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { negifield } from 'src/app/models/field.model';

@Component({
  selector: 'negi-field-edit',
  templateUrl: './field-edit.component.html',
  styleUrls: ['./field-edit.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldEditComponent implements OnInit {
  title: string = "圃場を編集"
  constructor(
    public dialogRef: MatDialogRef<FieldEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: negifield
  ) { }

  ngOnInit(): void {
  }

  editNegi(field: negifield) {
    this.dialogRef.close(field)
  }
}
