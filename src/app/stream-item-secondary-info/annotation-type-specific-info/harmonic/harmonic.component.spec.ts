import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarmonicComponent } from './harmonic.component';

describe('HarmonicComponent', () => {
  let component: HarmonicComponent;
  let fixture: ComponentFixture<HarmonicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HarmonicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HarmonicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
