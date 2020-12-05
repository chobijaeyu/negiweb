import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventAddDialogComponent } from './calendar-event-add-dialog.component';

describe('CalendarEventAddDialogComponent', () => {
  let component: CalendarEventAddDialogComponent;
  let fixture: ComponentFixture<CalendarEventAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarEventAddDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
