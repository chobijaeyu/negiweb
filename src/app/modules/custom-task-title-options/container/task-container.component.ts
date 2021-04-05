import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'negi-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskOptionsContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
