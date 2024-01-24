import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKelurahanAuthComponent } from './edit-kelurahan-auth.component';

describe('EditKelurahanAuthComponent', () => {
  let component: EditKelurahanAuthComponent;
  let fixture: ComponentFixture<EditKelurahanAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditKelurahanAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKelurahanAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
