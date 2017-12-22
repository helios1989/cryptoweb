import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingIcoComponent } from './incoming-ico.component';

describe('IncomingIcoComponent', () => {
  let component: IncomingIcoComponent;
  let fixture: ComponentFixture<IncomingIcoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingIcoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingIcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
