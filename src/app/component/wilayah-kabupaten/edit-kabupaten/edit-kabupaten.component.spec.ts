import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKabupatenComponent } from './edit-kabupaten.component';

describe('EditKabupatenComponent', () => {
  let component: EditKabupatenComponent;
  let fixture: ComponentFixture<EditKabupatenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditKabupatenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditKabupatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
