import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTodoModelComponent } from './view-todo-model.component';

describe('ViewTodoModelComponent', () => {
  let component: ViewTodoModelComponent;
  let fixture: ComponentFixture<ViewTodoModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTodoModelComponent]
    });
    fixture = TestBed.createComponent(ViewTodoModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
