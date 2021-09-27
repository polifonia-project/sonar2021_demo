import { TestBed } from '@angular/core/testing';

import { AnnotationGraphicsService } from './annotation-graphics.service';

describe('AnnotationGraphicsService', () => {
  let service: AnnotationGraphicsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnotationGraphicsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
