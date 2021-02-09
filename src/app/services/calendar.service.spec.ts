import { TestBed } from '@angular/core/testing';

import { neigiCalendarService } from './calendar.service';

describe('CalendarService', () => {
  let service: neigiCalendarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(neigiCalendarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
