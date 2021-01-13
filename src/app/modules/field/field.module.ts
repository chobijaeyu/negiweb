import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FieldRoutingModule } from './field-routing.module';
import { FieldContainerComponent } from './field-container/field-container.component';
import { ShareModule } from '../share/share.module';
import { FieldEditComponent } from './components/field-edit/field-edit.component';
import { FieldAddComponent } from './components/field-add/field-add.component';
import { FieldFormComponent } from './components/field-form/field-form.component';


@NgModule({
  declarations: [FieldContainerComponent, FieldEditComponent, FieldAddComponent, FieldFormComponent],
  imports: [
    CommonModule,
    ShareModule,
    FieldRoutingModule
  ]
})
export class FieldModule { }
