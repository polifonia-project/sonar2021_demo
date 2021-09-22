import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSwitchComponent } from './page-switch.component';

describe('PageSwitchComponent', () => {
  let component: PageSwitchComponent;
  let fixture: ComponentFixture<PageSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
