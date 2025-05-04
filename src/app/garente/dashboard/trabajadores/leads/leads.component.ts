import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormulariosService } from '../../../../services/formularios.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leads',
  imports: [CommonModule],
  templateUrl: './leads.component.html',
  styleUrl: './leads.component.css'
})
export class LeadsComponent implements OnInit {
  formulario: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private formulariosService: FormulariosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.formulariosService.obtenerFormularioConLeads(id).subscribe({
      next: (data) => {
        this.formulario = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al obtener leads:', err);
        this.isLoading = false;
      },
    });
  }
  volver(): void {
    this.router.navigate(['/gerente/trabajadores', this.formulario.id, 'formularios']);
  }
}