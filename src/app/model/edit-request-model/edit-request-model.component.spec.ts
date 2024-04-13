import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRequestModelComponent } from './edit-request-model.component';

describe('EditRequestModelComponent', () => {
  let component: EditRequestModelComponent;
  let fixture: ComponentFixture<EditRequestModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRequestModelComponent]
    });
    fixture = TestBed.createComponent(EditRequestModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
