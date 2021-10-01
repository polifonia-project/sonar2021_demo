import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamFilterComponent } from './stream-filter.component';

describe('StreamFilterComponent', () => {
  let component: StreamFilterComponent;
  let fixture: ComponentFixture<StreamFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
