import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Formulario, FormulariosService } from '../../../../services/formularios.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formularios-trabajador',
  imports: [CommonModule],
  templateUrl: './formularios-trabajador.component.html',
  styleUrl: './formularios-trabajador.component.css'
})
export class FormulariosTrabajadorComponent implements OnInit {
  formularios: Formulario[] = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private formulariosService: FormulariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.formulariosService.obtenerFormularioPorId(id).subscribe({
      next: (data) => {
        this.formularios = Array.isArray(data) ? data : [data];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener formularios:', err);
        this.isLoading = false;
      },
    });
  }
  verLeads(formularioId: number): void {
    this.router.navigate(['/gerente/formularios', formularioId, 'leads']);
  }
  volver(): void {
    this.router.navigate(['/gerente/trabajadores']);
  }
}