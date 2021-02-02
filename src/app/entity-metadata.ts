import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
 negifield:{} ,
 negiCalEvent:{}
};

const pluralNames = { 
  negifield:"negifields",
  negiCalEvent:"negiCalEvents"
 };

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};
