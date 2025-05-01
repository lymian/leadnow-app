import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFormularioModalComponent } from './crear-formulario-modal.component';

describe('CrearFormularioModalComponent', () => {
  let component: CrearFormularioModalComponent;
  let fixture: ComponentFixture<CrearFormularioModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearFormularioModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearFormularioModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
