import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingSongDetailsComponent } from './playing-song-details.component';

describe('PlayingSongDetailsComponent', () => {
  let component: PlayingSongDetailsComponent;
  let fixture: ComponentFixture<PlayingSongDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayingSongDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayingSongDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
