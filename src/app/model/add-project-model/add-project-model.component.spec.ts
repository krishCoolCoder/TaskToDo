import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectModelComponent } from './add-project-model.component';

describe('AddProjectModelComponent', () => {
  let component: AddProjectModelComponent;
  let fixture: ComponentFixture<AddProjectModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProjectModelComponent]
    });
    fixture = TestBed.createComponent(AddProjectModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
