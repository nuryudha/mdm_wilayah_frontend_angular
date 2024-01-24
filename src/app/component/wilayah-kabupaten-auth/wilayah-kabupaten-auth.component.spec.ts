import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilayahKabupatenAuthComponent } from './wilayah-kabupaten-auth.component';

describe('WilayahKabupatenAuthComponent', () => {
  let component: WilayahKabupatenAuthComponent;
  let fixture: ComponentFixture<WilayahKabupatenAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WilayahKabupatenAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WilayahKabupatenAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
