import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { calev } from 'src/app/models/calendar.model';
import { negifield, priorities } from 'src/app/models/field.model';
import { titleOption } from 'src/app/models/task-options.model';
import { CustomTaskTitleOptionService } from 'src/app/services/custom-task.service';
import { NegifieldService } from 'src/app/services/negifield.service';

@Component({
  selector: 'negi-calendar-event-form',
  templateUrl: './calendar-event-form.component.html',
  styleUrls: ['./calendar-event-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventFormComponent implements OnInit {

  @Input() calEventData: calev = new calev()
  @Input() negifield!: negifield
  @Output() calEventFormData = new EventEmitter<calev>()
  cv!: calev;
  calEventForm: FormGroup = new FormGroup({})

  disabled = false;
  showSpinners = true;
  showSeconds = false;
  touchUi = false;
  enableMeridian = false;
  color: ThemePalette = 'primary';
  priorities = priorities
  titleOptions: titleOption[] = []

  filteredOptions$!: Observable<string[]>;

  nfields$!: Observable<negifield[]>;

  user: any

  constructor(
    public fb: RxFormBuilder,
    // public uuid: UuidGeneratorService,
    public fs: NegifieldService,
    public afa: AngularFireAuth,
    public taskTitleOptionService: CustomTaskTitleOptionService,
  ) { }

  ngOnInit(): void {
    this.afa.currentUser.then(user => {
      this.user = user
    })
    this.cv = new calev()
    this.calEventForm = this.fb.formGroup(this.cv)


    if (this.calEventData) {
      this.calEventForm.patchValue(this.calEventData)
    }

    if (this.negifield) {
      this.calEventForm.patchValue({ NegiFieldID: this.negifield.ID })
    }


    this.nfields$ = this.fs.entities$

    this.filteredOptions$ = this.calEventForm.controls['title'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.taskTitleOptionService.entities$.subscribe(to => {
      this.titleOptions = to
    })
  }

  onSubmit() {
    this.cv.operator = this.user.displayName
      this.calEventFormData.emit(this.calEventForm.value)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.titleOptions.filter(option => option.title.toLowerCase().includes(filterValue)).map(titleOption => titleOption.title);
  }
}
