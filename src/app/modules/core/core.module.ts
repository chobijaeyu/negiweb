import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { MainComponent } from './main/main.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    CoreRoutingModule,
    ShareModule,
  ]
})
export class CoreModule { }
