import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WilayahKabupatenComponent } from './wilayah-kabupaten.component';

describe('WilayahKabupatenComponent', () => {
  let component: WilayahKabupatenComponent;
  let fixture: ComponentFixture<WilayahKabupatenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WilayahKabupatenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WilayahKabupatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
