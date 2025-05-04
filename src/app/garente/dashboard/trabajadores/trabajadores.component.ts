import { Component, OnInit } from '@angular/core';
import { Trabajador, TrabajadorService } from '../../../services/trabajador.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-trabajadores',
  imports: [CommonModule],
  templateUrl: './trabajadores.component.html',
  styleUrl: './trabajadores.component.css'
})
export class TrabajadoresComponent implements OnInit {
  trabajadores: Trabajador[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private trabajadorService: TrabajadorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.trabajadorService.obtenerAdministradores().subscribe({
      next: (data) => {
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
}