import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserModelComponent } from './add-user-model.component';

describe('AddUserModelComponent', () => {
  let component: AddUserModelComponent;
  let fixture: ComponentFixture<AddUserModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUserModelComponent]
    });
    fixture = TestBed.createComponent(AddUserModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
