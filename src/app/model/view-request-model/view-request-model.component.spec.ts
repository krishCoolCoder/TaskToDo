import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRequestModelComponent } from './view-request-model.component';

describe('ViewRequestModelComponent', () => {
  let component: ViewRequestModelComponent;
  let fixture: ComponentFixture<ViewRequestModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewRequestModelComponent]
    });
    fixture = TestBed.createComponent(ViewRequestModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
