import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeriesTaskComponent } from './add-series-task.component';

describe('AddSeriesTaskComponent', () => {
  let component: AddSeriesTaskComponent;
  let fixture: ComponentFixture<AddSeriesTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSeriesTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSeriesTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
