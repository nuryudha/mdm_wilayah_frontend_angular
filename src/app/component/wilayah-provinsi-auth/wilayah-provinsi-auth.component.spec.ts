import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilayahProvinsiAuthComponent } from './wilayah-provinsi-auth.component';

describe('WilayahProvinsiAuthComponent', () => {
  let component: WilayahProvinsiAuthComponent;
  let fixture: ComponentFixture<WilayahProvinsiAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WilayahProvinsiAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WilayahProvinsiAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
