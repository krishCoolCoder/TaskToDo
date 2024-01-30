import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrganisationModelComponent } from './add-organisation-model.component';

describe('AddOrganisationModelComponent', () => {
  let component: AddOrganisationModelComponent;
  let fixture: ComponentFixture<AddOrganisationModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddOrganisationModelComponent]
    });
    fixture = TestBed.createComponent(AddOrganisationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
