import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamItemDetailsComponent } from './stream-item-details.component';

describe('StreamItemDetailsComponent', () => {
  let component: StreamItemDetailsComponent;
  let fixture: ComponentFixture<StreamItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
