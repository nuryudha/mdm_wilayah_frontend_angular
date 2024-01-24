import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProvinsiComponent } from './edit-provinsi.component';

describe('EditProvinsiComponent', () => {
  let component: EditProvinsiComponent;
  let fixture: ComponentFixture<EditProvinsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProvinsiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProvinsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
