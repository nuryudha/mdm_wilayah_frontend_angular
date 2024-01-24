import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilayahNegaraComponent } from './wilayah-negara.component';

describe('WilayahNegaraComponent', () => {
  let component: WilayahNegaraComponent;
  let fixture: ComponentFixture<WilayahNegaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WilayahNegaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WilayahNegaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
