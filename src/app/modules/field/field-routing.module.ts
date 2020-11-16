import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldContainerComponent } from './field-container/field-container.component';

const routes: Routes = [
  { path: '', component: FieldContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldRoutingModule { }
