import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleOptionsContainerComponent } from './container/container.component';

const routes: Routes = [
  { path: "", component: TitleOptionsContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomTaskTitleOptionsRoutingModule { }
