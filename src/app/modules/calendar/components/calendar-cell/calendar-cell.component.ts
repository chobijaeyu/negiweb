import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'negi-calendar-cell',
  templateUrl: './calendar-cell.component.html',
  styleUrls: ['./calendar-cell.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarCellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
