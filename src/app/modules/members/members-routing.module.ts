import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberContainerComponent } from './member-container/member-container.component';

const routes: Routes = [
  { path: '', component: MemberContainerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
