import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CalendarView } from 'angular-calendar';

@Component({
  selector: 'negi-calendar-header',
  templateUrl: './calendar-header.component.html',
  styleUrls: ['./calendar-header.component.sass']
})
export class CalendarHeaderComponent implements OnInit {
  @Input() view: CalendarView = CalendarView.Month;

  @Input() viewDate: Date = new Date();

  @Input() locale: string = 'ja';

  @Output() viewChange = new EventEmitter<CalendarView>();

  @Output() viewDateChange = new EventEmitter<Date>();

  @Output() _onRefresh = new EventEmitter()
  @Output() onNewJourney = new EventEmitter()
  @Output() onAddEvent = new EventEmitter()
  CalendarView = CalendarView;
  constructor() { }

  ngOnInit(): void {
  }
  onRefresh() {
    this._onRefresh.emit()
  }

}
