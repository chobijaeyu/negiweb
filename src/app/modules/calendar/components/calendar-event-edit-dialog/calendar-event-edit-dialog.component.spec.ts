import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventEditDialogComponent } from './calendar-event-edit-dialog.component';

describe('CalendarEventEditDialogComponent', () => {
  let component: CalendarEventEditDialogComponent;
  let fixture: ComponentFixture<CalendarEventEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarEventEditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
