import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKabupatenComponent } from './create-kabupaten.component';

describe('CreateKabupatenComponent', () => {
  let component: CreateKabupatenComponent;
  let fixture: ComponentFixture<CreateKabupatenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateKabupatenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKabupatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
