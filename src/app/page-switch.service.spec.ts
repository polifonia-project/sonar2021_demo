import { TestBed } from '@angular/core/testing';

import { PageSwitchService } from './page-switch.service';

describe('PageSwitchService', () => {
  let service: PageSwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
