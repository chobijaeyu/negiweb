import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { CalendarEvent } from 'angular-calendar';
import { Observable, of } from 'rxjs';
import { calev } from 'src/app/models/calendar.model';
import { negifield } from 'src/app/models/field.model';
import { NegifieldService } from 'src/app/services/negifield.service';

@Component({
  selector: 'negi-calendar-event-form',
  templateUrl: './calendar-event-form.component.html',
  styleUrls: ['./calendar-event-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventFormComponent implements OnInit {

  @Input() calEventData: calev = new calev()
  @Output() calEventFormData = new EventEmitter<calev>()
  cv!: calev; 
  calEventForm: FormGroup = new FormGroup({})

  disabled = false;
  showSpinners = true;
  showSeconds = false;
  touchUi = false;
  enableMeridian = false;
  color:ThemePalette = 'primary';

  nfields$!: Observable<negifield[]>;

  constructor(
    public fb: RxFormBuilder,
    // public uuid: UuidGeneratorService,
    public fs:NegifieldService,
  ) { }

  ngOnInit(): void {
    this.cv = new calev()
    this.calEventForm = this.fb.formGroup(this.cv)


    if (this.calEventData) {
      this.calEventForm.patchValue(this.calEventData)
    } else {
      // this.cv.id = this.uuid.getUniqueId(4)
    }


    this.nfields$ = this.fs.entities$
  }

  onSubmit() {
    this.calEventFormData.emit(this.calEventForm.value)
  }
}
