import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavtoolbarComponent } from './navtoolbar.component';

describe('NavtoolbarComponent', () => {
  let component: NavtoolbarComponent;
  let fixture: ComponentFixture<NavtoolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavtoolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavtoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
