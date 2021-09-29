import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamItemRelatedSongItemComponent } from './stream-item-related-song-item.component';

describe('StreamItemRelatedSongItemComponent', () => {
  let component: StreamItemRelatedSongItemComponent;
  let fixture: ComponentFixture<StreamItemRelatedSongItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamItemRelatedSongItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamItemRelatedSongItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
