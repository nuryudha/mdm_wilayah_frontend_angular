import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNegaraAuthComponent } from './edit-negara-auth.component';

describe('EditNegaraAuthComponent', () => {
  let component: EditNegaraAuthComponent;
  let fixture: ComponentFixture<EditNegaraAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNegaraAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNegaraAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
