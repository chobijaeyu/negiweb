import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'negi-field-add',
  templateUrl: './field-add.component.html',
  styleUrls: ['./field-add.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldAddComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
