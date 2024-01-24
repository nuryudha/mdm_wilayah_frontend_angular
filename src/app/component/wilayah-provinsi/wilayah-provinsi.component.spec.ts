import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilayahProvinsiComponent } from './wilayah-provinsi.component';

describe('WilayahProvinsiComponent', () => {
  let component: WilayahProvinsiComponent;
  let fixture: ComponentFixture<WilayahProvinsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WilayahProvinsiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WilayahProvinsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
