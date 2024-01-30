import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeamModelComponent } from './add-team-model.component';

describe('AddTeamModelComponent', () => {
  let component: AddTeamModelComponent;
  let fixture: ComponentFixture<AddTeamModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTeamModelComponent]
    });
    fixture = TestBed.createComponent(AddTeamModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
