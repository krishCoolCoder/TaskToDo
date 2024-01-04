import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestModelComponent } from './add-request-model.component';

describe('AddRequestModelComponent', () => {
  let component: AddRequestModelComponent;
  let fixture: ComponentFixture<AddRequestModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRequestModelComponent]
    });
    fixture = TestBed.createComponent(AddRequestModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
