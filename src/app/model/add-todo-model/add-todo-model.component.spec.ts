import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoModelComponent } from './add-todo-model.component';

describe('AddTodoModelComponent', () => {
  let component: AddTodoModelComponent;
  let fixture: ComponentFixture<AddTodoModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTodoModelComponent]
    });
    fixture = TestBed.createComponent(AddTodoModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
