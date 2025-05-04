import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulariosTrabajadorComponent } from './formularios-trabajador.component';

describe('FormulariosTrabajadorComponent', () => {
  let component: FormulariosTrabajadorComponent;
  let fixture: ComponentFixture<FormulariosTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulariosTrabajadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormulariosTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
