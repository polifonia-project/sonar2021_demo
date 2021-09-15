import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamItemRelatedSongsComponent } from './stream-item-related-songs.component';

describe('StreamItemRelatedSongsComponent', () => {
  let component: StreamItemRelatedSongsComponent;
  let fixture: ComponentFixture<StreamItemRelatedSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamItemRelatedSongsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamItemRelatedSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
