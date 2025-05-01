import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEditarModalComponent } from './formulario-editar-modal.component';

describe('FormularioEditarModalComponent', () => {
  let component: FormularioEditarModalComponent;
  let fixture: ComponentFixture<FormularioEditarModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioEditarModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioEditarModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
