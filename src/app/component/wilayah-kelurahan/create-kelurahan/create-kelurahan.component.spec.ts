import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKelurahanComponent } from './create-kelurahan.component';

describe('CreateKelurahanComponent', () => {
  let component: CreateKelurahanComponent;
  let fixture: ComponentFixture<CreateKelurahanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateKelurahanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKelurahanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
