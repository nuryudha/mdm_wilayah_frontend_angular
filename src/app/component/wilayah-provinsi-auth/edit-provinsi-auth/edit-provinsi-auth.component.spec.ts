import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProvinsiAuthComponent } from './edit-provinsi-auth.component';

describe('EditProvinsiAuthComponent', () => {
  let component: EditProvinsiAuthComponent;
  let fixture: ComponentFixture<EditProvinsiAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProvinsiAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProvinsiAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
