import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQueryModelComponent } from './add-query-model.component';

describe('AddQueryModelComponent', () => {
  let component: AddQueryModelComponent;
  let fixture: ComponentFixture<AddQueryModelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQueryModelComponent]
    });
    fixture = TestBed.createComponent(AddQueryModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
