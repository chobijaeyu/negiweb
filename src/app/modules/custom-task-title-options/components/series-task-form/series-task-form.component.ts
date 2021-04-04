import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { RxFormBuilder, RxFormGroup } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { calev } from 'src/app/models/calendar.model';
import { priorities } from 'src/app/models/field.model';
import { seriesTaskOption } from 'src/app/models/task-options.model';
import { CustomSeriesTaskOptionService } from 'src/app/services/custom-task.service';

@Component({
  selector: 'negi-series-task-form',
  templateUrl: './series-task-form.component.html',
  styleUrls: ['./series-task-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesTaskFormComponent implements OnInit {

  st: seriesTaskOption = new seriesTaskOption()
  seriesTaskForm: FormGroup = new FormGroup({})

  @Input() title: string = ""
  @Input() seriestaskData: seriesTaskOption = new seriesTaskOption()
  @Output() seriestaskFormData: EventEmitter<seriesTaskOption> = new EventEmitter()

  constructor(
    public fb: RxFormBuilder,
    public sts: CustomSeriesTaskOptionService,
  ) { }

  ngOnInit(): void {
    this.st.tasklist = new Array<calev>()
    this.st.tasklist.push(new calev())
    this.seriesTaskForm = this.fb.formGroup(this.st)

    if (this.seriestaskData) {
      if (this.seriestaskData.tasklist) {
        for (let index = 0; index < this.seriestaskData.tasklist.length - 1; index++) {
          this.st.tasklist.push(new calev())
        }
      }
      this.seriesTaskForm.patchValue(this.seriestaskData)
    }
    console.log(this.seriesTaskForm)
  }

  get tasklist() {
    return this.seriesTaskForm.get('tasklist') as FormArray
  }

  getFormGroupAt(task: AbstractControl) {
    return task as RxFormGroup
  }

  onAddSingleTask() {
    this.st.tasklist.push(new calev())
  }

  onDeleteSingleTask(i: number) {
    console.log(i);
    console.log(this.st.tasklist);

    if (this.st.tasklist.length <= 1) {
      return
    }

    this.st.tasklist.splice(i,1)


    console.log(this.st.tasklist);
  }

  onSubmit() {
    this.seriestaskFormData.emit(this.seriesTaskForm.value)
  }


}
