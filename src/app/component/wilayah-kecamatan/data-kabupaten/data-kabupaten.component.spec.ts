import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataKabupatenComponent } from './data-kabupaten.component';

describe('DataKabupatenComponent', () => {
  let component: DataKabupatenComponent;
  let fixture: ComponentFixture<DataKabupatenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataKabupatenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataKabupatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
