import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilayahNegaraAuthComponent } from './wilayah-negara-auth.component';

describe('WilayahNegaraAuthComponent', () => {
  let component: WilayahNegaraAuthComponent;
  let fixture: ComponentFixture<WilayahNegaraAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WilayahNegaraAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WilayahNegaraAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
