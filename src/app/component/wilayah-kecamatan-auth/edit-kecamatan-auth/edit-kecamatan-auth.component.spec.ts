import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKecamatanAuthComponent } from './edit-kecamatan-auth.component';

describe('EditKecamatanAuthComponent', () => {
  let component: EditKecamatanAuthComponent;
  let fixture: ComponentFixture<EditKecamatanAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditKecamatanAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKecamatanAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
