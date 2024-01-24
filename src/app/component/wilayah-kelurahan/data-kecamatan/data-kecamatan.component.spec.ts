import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataKecamatanComponent } from './data-kecamatan.component';

describe('DataKecamatanComponent', () => {
  let component: DataKecamatanComponent;
  let fixture: ComponentFixture<DataKecamatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataKecamatanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataKecamatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
