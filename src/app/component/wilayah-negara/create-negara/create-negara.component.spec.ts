import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNegaraComponent } from './create-negara.component';

describe('CreateNegaraComponent', () => {
  let component: CreateNegaraComponent;
  let fixture: ComponentFixture<CreateNegaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNegaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNegaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
