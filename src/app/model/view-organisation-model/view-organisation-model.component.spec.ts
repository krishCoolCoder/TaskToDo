import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrganisationModelComponent } from './view-organisation-model.component';

describe('ViewOrganisationModelComponent', () => {
  let component: ViewOrganisationModelComponent;
  let fixture: ComponentFixture<ViewOrganisationModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOrganisationModelComponent]
    });
    fixture = TestBed.createComponent(ViewOrganisationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
