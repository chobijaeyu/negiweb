import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallbackComponent } from './auth-components/callback/callback.component';
import { LoginComponent } from './auth-components/login/login.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: 'callback/:oauth', component: CallbackComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
