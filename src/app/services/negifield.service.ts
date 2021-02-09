import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { negifield } from '../models/field.model';

@Injectable({
  providedIn: 'root'
})
export class NegifieldService extends EntityCollectionServiceBase<negifield>{

  constructor(serviceElementsFactory:EntityCollectionServiceElementsFactory) {
    super("negifield",serviceElementsFactory)
   }
}
