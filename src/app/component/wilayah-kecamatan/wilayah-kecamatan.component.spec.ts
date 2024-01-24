import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilayahKecamatanComponent } from './wilayah-kecamatan.component';

describe('WilayahKecamatanComponent', () => {
  let component: WilayahKecamatanComponent;
  let fixture: ComponentFixture<WilayahKecamatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WilayahKecamatanComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WilayahKecamatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
