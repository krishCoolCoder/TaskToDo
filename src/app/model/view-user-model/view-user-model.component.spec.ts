import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserModelComponent } from './view-user-model.component';

describe('ViewUserModelComponent', () => {
  let component: ViewUserModelComponent;
  let fixture: ComponentFixture<ViewUserModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUserModelComponent]
    });
    fixture = TestBed.createComponent(ViewUserModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
