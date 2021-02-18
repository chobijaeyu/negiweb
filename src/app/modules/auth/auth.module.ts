import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './auth-components/login/login.component';
import { RegisterComponent } from './auth-components/register/register.component';
import { ShareModule } from '../share/share.module';
import { CallbackComponent } from './auth-components/callback/callback.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, CallbackComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ShareModule,
  ]
})
export class AuthModule { }
