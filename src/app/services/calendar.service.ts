import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { calev } from '../models/calendar.model';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  calendaerUrl = `${environment.baseUrl}/v1/calendar`
  constructor(
    public h: HttpClient
  ) { }

  newCalEvent(calev: calev) {
    return this.h.post(this.calendaerUrl, calev)
  }

  updateCalEvent(calev: calev) {
    return this.h.put(`${this.calendaerUrl}/${calev.id}`, calev)
  }

  deleteCalEvent(calev: calev) {
    return this.h.delete(`${this.calendaerUrl}/${calev.id}`)
  }
}
