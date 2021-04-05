import { TestBed } from '@angular/core/testing';

import { CustomTaskTitleOptionService } from './custom-task.service';

describe('CustomTaskService', () => {
  let service: CustomTaskTitleOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomTaskTitleOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
