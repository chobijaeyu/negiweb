import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, customClaims, hasCustomClaim } from '@angular/fire/auth-guard';
import { Routes, RouterModule } from '@angular/router';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { memberRoles } from 'src/app/models/User.model';
import { MainComponent } from './main/main.component';

const memberOnly = () => hasCustomClaim('role');
const adminOnly = () => pipe(customClaims, map(claims => claims.role === memberRoles.admin || claims.role === memberRoles.owner));

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: '', loadChildren: () => import('../task/task.module').then(m => m.TaskModule) },
      // { path: '', loadChildren: () => import('../calendar/calendar.module').then(m => m.NegiCalendarModule) },
      { path: 'task', loadChildren: () => import('../calendar/calendar.module').then(m => m.NegiCalendarModule) },
      // { path: 'task', loadChildren: () => import('../task/task.module').then(m => m.TaskModule) },
      { path: 'field', loadChildren: () => import('../field/field.module').then(m => m.FieldModule) },
      { path: 'titleoption', loadChildren: () => import('../custom-task-title-options/custom-task-title-options.module').then(m => m.CustomTaskTitleOptionsModule), canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly, animation: 'titleoption' } },
      { path: 'members', loadChildren: () => import('../members/members.module').then(m => m.MembersModule), canActivate: [AngularFireAuthGuard], data: { authGuardPipe: adminOnly, animation: 'members' } }
    ], canActivate: [AngularFireAuthGuard], data: { authGuardPipe: memberOnly }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
