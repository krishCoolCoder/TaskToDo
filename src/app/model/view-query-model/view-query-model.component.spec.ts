import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQueryModelComponent } from './view-query-model.component';

describe('ViewQueryModelComponent', () => {
  let component: ViewQueryModelComponent;
  let fixture: ComponentFixture<ViewQueryModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewQueryModelComponent]
    });
    fixture = TestBed.createComponent(ViewQueryModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
