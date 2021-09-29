import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamItemSecondaryInfoComponent } from './stream-item-secondary-info.component';

describe('StreamItemSecondaryInfoComponent', () => {
  let component: StreamItemSecondaryInfoComponent;
  let fixture: ComponentFixture<StreamItemSecondaryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamItemSecondaryInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamItemSecondaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
