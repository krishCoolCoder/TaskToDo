import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectModelComponent } from './view-project-model.component';

describe('ViewProjectModelComponent', () => {
  let component: ViewProjectModelComponent;
  let fixture: ComponentFixture<ViewProjectModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProjectModelComponent]
    });
    fixture = TestBed.createComponent(ViewProjectModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
