import { Component, OnInit } from '@angular/core';
import { Trabajador, TrabajadorService, RegistrarTrabajador } from '../../../services/trabajador.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { RegistrarTrabajadorComponent } from '../../../components/registrar-trabajador/registrar-trabajador.component';

@Component({
  selector: 'app-trabajadores',
  imports: [CommonModule, RegistrarTrabajadorComponent],
  templateUrl: './trabajadores.component.html',
  styleUrl: './trabajadores.component.css'
})
export class TrabajadoresComponent implements OnInit {
  trabajadores: Trabajador[] = [];
  isLoading = true;
  error: string | null = null;
  nuevoTrabajador!: RegistrarTrabajador;

  constructor(
    private trabajadorService: TrabajadorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.trabajadorService.obtenerAdministradores().subscribe({
      next: (data) => {
        //ordenar por fecha de registro
        data.sort((a, b) => new Date(b.fechaRegistro).getTime() - new Date(a.fechaRegistro).getTime());
        this.trabajadores = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar los trabajadores.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  seleccionarTrabajador(t: Trabajador): void {
    this.router.navigate(['/gerente/trabajadores', t.id, 'formularios']);
  }
  modalVisible = false;

  showRegistrarTrabajador(): void {
    console.log('abrir modal');
    this.modalVisible = true;
  }

  cerrarRegistrarTrabajador(): void {
    this.modalVisible = false;
  }

  // Crear un nuevo trabajador
  crearTrabajador(dto: RegistrarTrabajador): void {
    this.trabajadorService.registrarTrabajador(dto).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Trabajador creado',
          text: 'El trabajador ha sido creado exitosamente.',
        });
        this.modalVisible = false;
        this.recargar();
      },
      error: (err) => {
        const mensaje = err.error;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: mensaje || 'No se pudo crear el trabajador.',
        });
      }
    });
  }
  //recargar la lista de trabajadores
  recargar(): void {
    this.ngOnInit();
  }
  // eliminar trabajador
  eliminarTrabajador(trabajador: Trabajador): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar a ${trabajador.nombreCompleto}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.trabajadorService.eliminarTrabajador(trabajador.id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Trabajador eliminado',
              text: 'El trabajador ha sido eliminado exitosamente.',
            });
            this.recargar();
          },
          error: (err) => {
            const mensaje = err.error;
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: mensaje || 'No se pudo eliminar el trabajador.',
            });
          }
        });
      }
    });
  }
}
