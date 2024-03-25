import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskModelComponent } from './edit-task-model.component';

describe('EditTaskModelComponent', () => {
  let component: EditTaskModelComponent;
  let fixture: ComponentFixture<EditTaskModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaskModelComponent]
    });
    fixture = TestBed.createComponent(EditTaskModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
