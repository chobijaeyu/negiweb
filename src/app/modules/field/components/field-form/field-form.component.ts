import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { negifield } from 'src/app/models/field.model';

@Component({
  selector: 'negi-field-form',
  templateUrl: './field-form.component.html',
  styleUrls: ['./field-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FieldFormComponent implements OnInit {
  negifield: negifield = new negifield()
  fieldForm: FormGroup = new FormGroup({})

  @Input() title: string = ""

  @Output() negifieldData: EventEmitter<negifield> = new EventEmitter()

  constructor(
    private fb: RxFormBuilder
  ) { }

  ngOnInit(): void {
    this.fieldForm = this.fb.formGroup(this.negifield)
  }

  onSubmit() {
    this.negifieldData.emit(this.fieldForm.value)
  }
}
