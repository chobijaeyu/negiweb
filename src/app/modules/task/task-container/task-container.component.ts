import { Component, OnInit } from '@angular/core';
import { neigiCalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'negi-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.sass']
})
export class TaskContainerComponent implements OnInit {

  constructor(public negiCalendarService: neigiCalendarService) { }

  ngOnInit(): void {
    this.negiCalendarService.getWithQuery({ confirmed: "false" })
  }

}
