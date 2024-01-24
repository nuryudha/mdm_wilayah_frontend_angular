import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNegaraComponent } from './edit-negara.component';

describe('EditNegaraComponent', () => {
  let component: EditNegaraComponent;
  let fixture: ComponentFixture<EditNegaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditNegaraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNegaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
