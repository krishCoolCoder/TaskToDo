import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamModelComponent } from './edit-team-model.component';

describe('EditTeamModelComponent', () => {
  let component: EditTeamModelComponent;
  let fixture: ComponentFixture<EditTeamModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTeamModelComponent]
    });
    fixture = TestBed.createComponent(EditTeamModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
