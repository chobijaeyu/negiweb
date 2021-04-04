import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomTaskTitleOptionsRoutingModule } from './custom-task-title-options-routing.module';
import { TaskOptionsContainerComponent } from './container/task-container.component';
import { TitleFormComponent } from './components/title-form/title-form.component';
import { AddTitleDialogComponent } from './components/add-title-dialog/add-title-dialog.component';
import { EditTitleDialogComponent } from './components/edit-title-dialog/edit-title-dialog.component';
import { ShareModule } from '../share/share.module';
import { SeriesTaskFormComponent } from './components/series-task-form/series-task-form.component';
import { AddSeriesTaskComponent } from './components/add-series-task/add-series-task.component';
import { EditSeriesTaskComponent } from './components/edit-series-task/edit-series-task.component';
import { SeriesTaskSingleTaskFormComponent } from './components/series-task-single-task-form/series-task-single-task-form.component';
import { TitleOptionContainerComponent } from './container/title-option-container/title-option-container.component';
import { SeriesTaskContainerComponent } from './container/series-task-container/series-task-container.component';


@NgModule({
  declarations: [TaskOptionsContainerComponent, TitleFormComponent, AddTitleDialogComponent, EditTitleDialogComponent, SeriesTaskFormComponent, AddSeriesTaskComponent, EditSeriesTaskComponent, SeriesTaskSingleTaskFormComponent, TitleOptionContainerComponent, SeriesTaskContainerComponent],
  imports: [
    CommonModule,
    ShareModule,

    CustomTaskTitleOptionsRoutingModule
  ]
})
export class CustomTaskTitleOptionsModule { }
