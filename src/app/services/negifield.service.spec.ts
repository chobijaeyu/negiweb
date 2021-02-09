import { TestBed } from '@angular/core/testing';

import { NegifieldService } from './negifield.service';

describe('NegifieldService', () => {
  let service: NegifieldService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegifieldService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
