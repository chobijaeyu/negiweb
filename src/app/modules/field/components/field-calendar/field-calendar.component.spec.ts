import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldCalendarComponent } from './field-calendar.component';

describe('FieldCalendarComponent', () => {
  let component: FieldCalendarComponent;
  let fixture: ComponentFixture<FieldCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
