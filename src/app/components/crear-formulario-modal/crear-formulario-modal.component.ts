import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-formulario-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-formulario-modal.component.html',
  styleUrl: './crear-formulario-modal.component.css'
})
export class CrearFormularioModalComponent {
  @Input() visible: boolean = false;
  @Output() onCrear = new EventEmitter<{ nombre: string, descripcion: string }>();
  @Output() onCancelar = new EventEmitter<void>();

  formulario = {
    nombre: '',
    descripcion: ''
  };

  crear() {
    if (!this.formulario.nombre.trim()) return;
    this.onCrear.emit(this.formulario);
    this.formulario = { nombre: '', descripcion: '' };
  }

  cancelar() {
    this.onCancelar.emit();
    this.formulario = { nombre: '', descripcion: '' };
  }
}
