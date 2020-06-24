import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DjangoChatComponent } from './django-chat.component';

describe('DjangoChatComponent', () => {
  let component: DjangoChatComponent;
  let fixture: ComponentFixture<DjangoChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DjangoChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DjangoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
