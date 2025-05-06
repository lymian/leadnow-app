import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrabajadorService, Trabajador } from '../../services/trabajador.service';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cuenta',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './cuenta.component.html',
  styleUrl: './cuenta.component.css'
})
export class CuentaComponent implements OnInit {
  form: FormGroup;
  user: string = "";
  trabajador: Trabajador | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: TrabajadorService
  ) {
    this.form = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.user = localStorage.getItem('user') || '';
    this.usuarioService.obtenerTrabajadorPorUsername(this.user).subscribe(
      (trabajador: Trabajador) => {
        this.trabajador = trabajador;
      },
      (error) => {
        console.error('Error fetching trabajador:', error);
      }
    );

  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.usuarioService.cambiarContrasena(this.form.value).subscribe({
      next: () => {
        Swal.fire('Éxito', 'La contraseña se cambió correctamente.', 'success');
        this.form.reset();
      },
      error: (err) => {
        Swal.fire('Error', err.error || 'No se pudo cambiar la contraseña.', 'error');
      }
    });
  }
}
