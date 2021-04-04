import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesTaskFormComponent } from './series-task-form.component';

describe('SeriesTaskFormComponent', () => {
  let component: SeriesTaskFormComponent;
  let fixture: ComponentFixture<SeriesTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesTaskFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
