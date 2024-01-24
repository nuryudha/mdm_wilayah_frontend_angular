import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKecamatanComponent } from './create-kecamatan.component';

describe('CreateKecamatanComponent', () => {
  let component: CreateKecamatanComponent;
  let fixture: ComponentFixture<CreateKecamatanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateKecamatanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKecamatanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
