import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKecamatanComponent } from './edit-kecamatan.component';

describe('EditKecamatanComponent', () => {
  let component: EditKecamatanComponent;
  let fixture: ComponentFixture<EditKecamatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditKecamatanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKecamatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
