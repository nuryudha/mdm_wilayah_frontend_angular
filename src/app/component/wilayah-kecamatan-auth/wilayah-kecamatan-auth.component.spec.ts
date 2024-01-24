import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilayahKecamatanAuthComponent } from './wilayah-kecamatan-auth.component';

describe('WilayahKecamatanAuthComponent', () => {
  let component: WilayahKecamatanAuthComponent;
  let fixture: ComponentFixture<WilayahKecamatanAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WilayahKecamatanAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WilayahKecamatanAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
