import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { environment } from 'src/environments/environment';
import { calev } from '../models/calendar.model';

@Injectable({
  providedIn: 'root'
})
export class neigiCalendarService extends EntityCollectionServiceBase<calev>{
  calendaerUrl = `${environment.baseUrl}/v1/calendar`
  constructor(
    public h: HttpClient,
    serviceElementsFactory:EntityCollectionServiceElementsFactory,
  ) { 
    super("negiCalEvent",serviceElementsFactory)
  }

  newCalEvent(calev: calev) {
    return this.h.post(this.calendaerUrl, calev)
  }

  updateCalEvent(calev: calev) {
    return this.h.put(`${this.calendaerUrl}/${calev.ID}`, calev)
  }

  deleteCalEvent(calev: calev) {
    return this.h.delete(`${this.calendaerUrl}/${calev.ID}`)
  }
}
