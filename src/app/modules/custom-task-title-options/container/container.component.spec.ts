import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleOptionsContainerComponent } from './container.component';

describe('ContainerComponent', () => {
  let component: TitleOptionsContainerComponent;
  let fixture: ComponentFixture<TitleOptionsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleOptionsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleOptionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
