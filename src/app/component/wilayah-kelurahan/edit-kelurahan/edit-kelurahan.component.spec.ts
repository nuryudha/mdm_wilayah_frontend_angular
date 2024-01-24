import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKelurahanComponent } from './edit-kelurahan.component';

describe('EditKelurahanComponent', () => {
  let component: EditKelurahanComponent;
  let fixture: ComponentFixture<EditKelurahanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditKelurahanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKelurahanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
