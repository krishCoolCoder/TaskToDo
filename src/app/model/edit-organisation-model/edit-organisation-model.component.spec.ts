import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrganisationModelComponent } from './edit-organisation-model.component';

describe('EditOrganisationModelComponent', () => {
  let component: EditOrganisationModelComponent;
  let fixture: ComponentFixture<EditOrganisationModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditOrganisationModelComponent]
    });
    fixture = TestBed.createComponent(EditOrganisationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
