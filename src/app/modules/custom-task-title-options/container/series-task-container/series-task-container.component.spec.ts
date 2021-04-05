import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesTaskContainerComponent } from './series-task-container.component';

describe('SeriesTaskContainerComponent', () => {
  let component: SeriesTaskContainerComponent;
  let fixture: ComponentFixture<SeriesTaskContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesTaskContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesTaskContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
