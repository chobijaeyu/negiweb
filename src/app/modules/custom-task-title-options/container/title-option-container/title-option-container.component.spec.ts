import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleOptionContainerComponent } from './title-option-container.component';

describe('TitleOptionContainerComponent', () => {
  let component: TitleOptionContainerComponent;
  let fixture: ComponentFixture<TitleOptionContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitleOptionContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleOptionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
