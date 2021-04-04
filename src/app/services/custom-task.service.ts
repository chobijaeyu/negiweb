import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { seriesTaskOption, titleOption } from '../models/task-options.model';

@Injectable({
  providedIn: 'root'
})
export class CustomTaskTitleOptionService extends EntityCollectionServiceBase<titleOption> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("negiCustomTaskTitleOption", serviceElementsFactory)
  }
}
@Injectable({
  providedIn: 'root'
})
export class CustomSeriesTaskOptionService extends EntityCollectionServiceBase<seriesTaskOption> {

  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super("negiCustomSeriesTaskOption", serviceElementsFactory)
  }
}
