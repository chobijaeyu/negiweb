import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewJourneyDialogComponent } from './new-journey-dialog.component';

describe('NewJourneyDialogComponent', () => {
  let component: NewJourneyDialogComponent;
  let fixture: ComponentFixture<NewJourneyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewJourneyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewJourneyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
