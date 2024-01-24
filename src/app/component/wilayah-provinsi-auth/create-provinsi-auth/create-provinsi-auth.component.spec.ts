import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProvinsiAuthComponent } from './create-provinsi-auth.component';

describe('CreateProvinsiAuthComponent', () => {
  let component: CreateProvinsiAuthComponent;
  let fixture: ComponentFixture<CreateProvinsiAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProvinsiAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProvinsiAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
