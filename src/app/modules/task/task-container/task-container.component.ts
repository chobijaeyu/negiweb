import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'negi-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.sass']
})
export class TaskContainerComponent implements OnInit {
  todo = [
    '#2フィールド　成長率をチェックする',
    '#1フィールド　雑草を刈り',
    '#5フィールド　成長率をチェックする',
    '#3フィールド　収穫'
  ];

  done = [
    '#2フィールド　雑草を刈り',
    '#1フィールド　収穫',
    '#5フィールド　雑草を刈り',
    '#4フィールド　成長率をチェックする',
    '#4フィールド　雑草を刈り'
  ];

  constructor() { }

  ngOnInit(): void {
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
