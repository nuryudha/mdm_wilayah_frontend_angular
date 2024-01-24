import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKabupatenAuthComponent } from './create-kabupaten-auth.component';

describe('CreateKabupatenAuthComponent', () => {
  let component: CreateKabupatenAuthComponent;
  let fixture: ComponentFixture<CreateKabupatenAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateKabupatenAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKabupatenAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
