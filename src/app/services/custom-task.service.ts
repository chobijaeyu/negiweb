import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { seriesTaskOption, seriesTaskSingleTask, titleOption } from '../models/task-options.model';

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

@Injectable({
  providedIn: 'root'
})
export class seriesTaskSingleTaskService {
  seriesTaskSingleTaskUrl = `${environment.baseUrl}/v1/`;
  constructor(
    private H: HttpClient
  ) { }

  deleteSingleTaskOption(taskoption: seriesTaskSingleTask): Observable<any> {
    return this.H.delete(`${this.seriesTaskSingleTaskUrl}seriestasksingletask/${taskoption.ID}`,);

  }
}