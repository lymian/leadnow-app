import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CrearFormularioDTO, Formulario } from '../../services/formularios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-editar-modal',
  imports: [ CommonModule, FormsModule],
  templateUrl: './formulario-editar-modal.component.html',
  styleUrl: './formulario-editar-modal.component.css'
})
export class FormularioEditarModalComponent {
  @Input() formulario!: Formulario;
  @Output() guardar = new EventEmitter<CrearFormularioDTO>();
  @Output() cerrar = new EventEmitter<void>();
  @Input() visible: boolean = false;

  dto: CrearFormularioDTO = { nombre: '', descripcion: '' };

  ngOnInit() {
    if (this.formulario) {
      this.dto = {
        nombre: this.formulario.nombre,
        descripcion: this.formulario.descripcion
      };
    }
  }

  onGuardar() {
    this.guardar.emit(this.dto);
  }

  onCerrar() {
    this.cerrar.emit();
  }
}