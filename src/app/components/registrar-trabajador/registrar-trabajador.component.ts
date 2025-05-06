import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegistrarTrabajador } from '../../services/trabajador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-trabajador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './registrar-trabajador.component.html',
  styleUrl: './registrar-trabajador.component.css'
})
export class RegistrarTrabajadorComponent {
  @Input() visible: boolean = false;
  @Output() onCrear = new EventEmitter<RegistrarTrabajador>();
  @Output() onCancelar = new EventEmitter<void>();

  nuevoTrabajador: RegistrarTrabajador = {
    username: '',
    email: '',
    nombreCompleto: ''
  };
  crear() {
    if (!this.nuevoTrabajador.username.trim() || !this.nuevoTrabajador.email.trim()) {
      Swal.fire('Error', 'Por favor, complete todos los campos.', 'error');
      return;
    }
    this.onCrear.emit(this.nuevoTrabajador);
    this.nuevoTrabajador = { username: '', email: '', nombreCompleto: '' };
  }
  cancelar() {
    this.onCancelar.emit();
    this.nuevoTrabajador = { username: '', email: '', nombreCompleto: '' };
  }
}