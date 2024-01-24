import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNegaraAuthComponent } from './create-negara-auth.component';

describe('CreateNegaraAuthComponent', () => {
  let component: CreateNegaraAuthComponent;
  let fixture: ComponentFixture<CreateNegaraAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNegaraAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNegaraAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
