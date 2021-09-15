import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamItemMainInfoComponent } from './stream-item-main-info.component';

describe('StreamItemMainInfoComponent', () => {
  let component: StreamItemMainInfoComponent;
  let fixture: ComponentFixture<StreamItemMainInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamItemMainInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamItemMainInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
