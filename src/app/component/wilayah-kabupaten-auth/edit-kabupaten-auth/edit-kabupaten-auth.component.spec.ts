import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKabupatenAuthComponent } from './edit-kabupaten-auth.component';

describe('EditKabupatenAuthComponent', () => {
  let component: EditKabupatenAuthComponent;
  let fixture: ComponentFixture<EditKabupatenAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditKabupatenAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKabupatenAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
