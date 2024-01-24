import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilayahKelurahanComponent } from './wilayah-kelurahan.component';

describe('WilayahKelurahanComponent', () => {
  let component: WilayahKelurahanComponent;
  let fixture: ComponentFixture<WilayahKelurahanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WilayahKelurahanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WilayahKelurahanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
