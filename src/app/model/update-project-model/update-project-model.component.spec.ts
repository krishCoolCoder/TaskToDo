import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjectModelComponent } from './update-project-model.component';

describe('UpdateProjectModelComponent', () => {
  let component: UpdateProjectModelComponent;
  let fixture: ComponentFixture<UpdateProjectModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateProjectModelComponent]
    });
    fixture = TestBed.createComponent(UpdateProjectModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
