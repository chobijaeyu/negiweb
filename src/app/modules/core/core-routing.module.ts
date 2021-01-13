import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', loadChildren: () => import('../task/task.module').then(m => m.TaskModule) },
      { path: 'task', loadChildren: () => import('../calendar/calendar.module').then(m => m.NegiCalendarModule) },
      // { path: 'task', loadChildren: () => import('../task/task.module').then(m => m.TaskModule) },
      { path: 'field', loadChildren: () => import('../field/field.module').then(m => m.FieldModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
