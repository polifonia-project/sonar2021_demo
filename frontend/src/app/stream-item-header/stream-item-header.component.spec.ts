import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamItemHeaderComponent } from './stream-item-header.component';

describe('StreamItemHeaderComponent', () => {
  let component: StreamItemHeaderComponent;
  let fixture: ComponentFixture<StreamItemHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamItemHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamItemHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
