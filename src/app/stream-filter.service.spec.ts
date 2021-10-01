import { TestBed } from '@angular/core/testing';

import { StreamFilterService } from './stream-filter.service';

describe('StreamFilterService', () => {
  let service: StreamFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StreamFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
