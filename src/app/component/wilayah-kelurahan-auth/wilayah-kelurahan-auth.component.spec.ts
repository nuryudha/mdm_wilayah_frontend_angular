import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilayahKelurahanAuthComponent } from './wilayah-kelurahan-auth.component';

describe('WilayahKelurahanAuthComponent', () => {
  let component: WilayahKelurahanAuthComponent;
  let fixture: ComponentFixture<WilayahKelurahanAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WilayahKelurahanAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WilayahKelurahanAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
