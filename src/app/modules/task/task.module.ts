import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskContainerComponent } from './task-container/task-container.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [TaskContainerComponent],
  imports: [
    CommonModule,
    ShareModule,
    TaskRoutingModule
  ]
})
export class TaskModule { }
