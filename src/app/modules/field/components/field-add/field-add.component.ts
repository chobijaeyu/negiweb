import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { negifield } from 'src/app/models/field.model';

@Component({
  selector: 'negi-field-add',
  templateUrl: './field-add.component.html',
  styleUrls: ['./field-add.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldAddComponent implements OnInit {
  title:string = "圃場を登録"
  constructor(
    public dialogRef:MatDialogRef<FieldAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data:negifield
  ) { }

  ngOnInit(): void {
  }

  newField(field:negifield){
    this.dialogRef.close(field)
  }
}
