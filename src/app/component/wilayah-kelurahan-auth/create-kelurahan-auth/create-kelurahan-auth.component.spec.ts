import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKelurahanAuthComponent } from './create-kelurahan-auth.component';

describe('CreateKelurahanAuthComponent', () => {
  let component: CreateKelurahanAuthComponent;
  let fixture: ComponentFixture<CreateKelurahanAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateKelurahanAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKelurahanAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
