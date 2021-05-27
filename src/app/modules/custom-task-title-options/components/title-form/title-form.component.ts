import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { titleOption } from 'src/app/models/task-options.model';

@Component({
  selector: 'negi-title-form',
  templateUrl: './title-form.component.html',
  styleUrls: ['./title-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TitleFormComponent implements OnInit {
  titleOptionForm: FormGroup = new FormGroup({})

  @Input() title: string = ""
  @Input() titleOption: titleOption = { title: "" }

  @Output() TitleOptionData: EventEmitter<titleOption> = new EventEmitter()

  constructor(
    private fb: RxFormBuilder
  ) { }

  ngOnInit(): void {
    this.titleOptionForm = this.fb.formGroup(new titleOption)
    if (this.titleOption) {
      this.titleOptionForm.patchValue(this.titleOption)
    }

  }

  onSubmit() {
    this.TitleOptionData.emit(this.titleOptionForm.value)
  }
}
