import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamItemSocialButtonsComponent } from './stream-item-social-buttons.component';

describe('StreamItemSocialButtonsComponent', () => {
  let component: StreamItemSocialButtonsComponent;
  let fixture: ComponentFixture<StreamItemSocialButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamItemSocialButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamItemSocialButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
