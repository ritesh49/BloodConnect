import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiTestingComponent } from './ui-testing.component';

describe('UiTestingComponent', () => {
  let component: UiTestingComponent;
  let fixture: ComponentFixture<UiTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
