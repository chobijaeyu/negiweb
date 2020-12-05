import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'negi-calendar-event-form',
  templateUrl: './calendar-event-form.component.html',
  styleUrls: ['./calendar-event-form.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarEventFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
