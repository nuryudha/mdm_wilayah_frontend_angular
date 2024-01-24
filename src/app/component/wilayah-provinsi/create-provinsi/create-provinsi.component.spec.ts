import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProvinsiComponent } from './create-provinsi.component';

describe('CreateProvinsiComponent', () => {
  let component: CreateProvinsiComponent;
  let fixture: ComponentFixture<CreateProvinsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateProvinsiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProvinsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
