import { EntityMetadataMap, EntityDataModuleConfig, DefaultDataServiceConfig } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { calev } from './models/calendar.model';
import { negifield } from './models/field.model';

const entityMetadata: EntityMetadataMap = {
 negifield:{
   selectId:(f:negifield)=>f.ID,
   noChangeTracking:true
 } ,
 negiCalEvent:{
   selectId:(c:calev)=>c.ID,
 }
};

const pluralNames = { 
  negifield:"negifields",
  negiCalEvent:"negiCalEvents"
 };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: `${environment.baseUrl}/v1/`,
  timeout: 50000, // request timeout 
}