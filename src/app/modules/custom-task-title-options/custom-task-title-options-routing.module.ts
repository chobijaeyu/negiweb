import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskOptionsContainerComponent } from './container/task-container.component';

const routes: Routes = [
  { path: "", component: TaskOptionsContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomTaskTitleOptionsRoutingModule { }
