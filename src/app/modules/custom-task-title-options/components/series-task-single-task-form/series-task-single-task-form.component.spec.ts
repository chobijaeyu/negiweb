import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesTaskSingleTaskFormComponent } from './series-task-single-task-form.component';

describe('SeriesTaskSingleTaskFormComponent', () => {
  let component: SeriesTaskSingleTaskFormComponent;
  let fixture: ComponentFixture<SeriesTaskSingleTaskFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesTaskSingleTaskFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesTaskSingleTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
