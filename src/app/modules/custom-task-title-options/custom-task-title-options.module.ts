import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomTaskTitleOptionsRoutingModule } from './custom-task-title-options-routing.module';
import { TitleOptionsContainerComponent } from './container/container.component';
import { TitleFormComponent } from './components/title-form/title-form.component';
import { AddTitleDialogComponent } from './components/add-title-dialog/add-title-dialog.component';
import { EditTitleDialogComponent } from './components/edit-title-dialog/edit-title-dialog.component';
import { ShareModule } from '../share/share.module';


@NgModule({
  declarations: [TitleOptionsContainerComponent, TitleFormComponent, AddTitleDialogComponent, EditTitleDialogComponent],
  imports: [
    CommonModule,
    ShareModule,
    CustomTaskTitleOptionsRoutingModule
  ]
})
export class CustomTaskTitleOptionsModule { }
