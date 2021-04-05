import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskOptionsContainerComponent } from './task-container.component';

describe('ContainerComponent', () => {
  let component: TaskOptionsContainerComponent;
  let fixture: ComponentFixture<TaskOptionsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskOptionsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskOptionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
