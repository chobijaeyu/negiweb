import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSeriesTaskComponent } from './edit-series-task.component';

describe('EditSeriesTaskComponent', () => {
  let component: EditSeriesTaskComponent;
  let fixture: ComponentFixture<EditSeriesTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSeriesTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSeriesTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
