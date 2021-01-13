import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'negi-field-edit',
  templateUrl: './field-edit.component.html',
  styleUrls: ['./field-edit.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldEditComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
