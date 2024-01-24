import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateKecamatanAuthComponent } from './create-kecamatan-auth.component';

describe('CreateKecamatanAuthComponent', () => {
  let component: CreateKecamatanAuthComponent;
  let fixture: ComponentFixture<CreateKecamatanAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateKecamatanAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateKecamatanAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
