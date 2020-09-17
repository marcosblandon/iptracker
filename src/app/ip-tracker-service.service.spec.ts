import { TestBed } from '@angular/core/testing';

import { IpTrackerServiceService } from './ip-tracker-service.service';

describe('IpTrackerServiceService', () => {
  let service: IpTrackerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpTrackerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
