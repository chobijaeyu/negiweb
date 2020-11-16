import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldRoutingModule } from './field-routing.module';
import { FieldContainerComponent } from './field-container/field-container.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [FieldContainerComponent],
  imports: [
    CommonModule,
    ShareModule,
    FieldRoutingModule
  ]
})
export class FieldModule { }
