import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { titleOption } from '../models/title-options.model';

@Injectable({
  providedIn: 'root'
})
export class CustomTaskTitleOptionService extends EntityCollectionServiceBase<titleOption> {

  constructor(serviceElementsFactory:EntityCollectionServiceElementsFactory) {
    super("negiCustomTaskTitleOption", serviceElementsFactory)
   }
}
