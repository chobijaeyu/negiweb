import { EntityMetadataMap, EntityDataModuleConfig, DefaultDataServiceConfig } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { calev } from './models/calendar.model';
import { negifield } from './models/field.model';
import { seriesTaskOption, titleOption } from './models/task-options.model';

const entityMetadata: EntityMetadataMap = {
  negifield: {
    selectId: (f: negifield) => f.ID,
    noChangeTracking: true
  },
  negiCalEvent: {
    selectId: (c: calev) => c.ID,
  },
  negiCustomTaskTitleOption: {
    selectId: (to: titleOption) => to.ID
  },
  negiCustomSeriesTaskOption: {
    selectId: (sto: seriesTaskOption) => sto.ID
  }
};

const pluralNames = {
  negifield: "negifields",
  negiCalEvent: "negiCalEvents",
  negiCustomTaskTitleOption: "negiCustomTaskTitleOptions"
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
  pluralNames
};

export const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: `${environment.baseUrl}/v1/`,
  timeout: 50000, // request timeout 
}