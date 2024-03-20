import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTaskStatusModelComponent } from './update-task-status-model.component';

describe('UpdateTaskStatusModelComponent', () => {
  let component: UpdateTaskStatusModelComponent;
  let fixture: ComponentFixture<UpdateTaskStatusModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTaskStatusModelComponent]
    });
    fixture = TestBed.createComponent(UpdateTaskStatusModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
