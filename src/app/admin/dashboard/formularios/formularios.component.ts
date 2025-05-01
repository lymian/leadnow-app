import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulariosService, Formulario, Lead } from '../../../services/formularios.service';
import { FormularioDetalleComponent } from '../formulario-detalle/formulario-detalle.component';
import { CrearFormularioModalComponent } from '../../../components/crear-formulario-modal/crear-formulario-modal.component';

@Component({
  selector: 'app-formularios',
  imports: [CommonModule, FormularioDetalleComponent, CrearFormularioModalComponent],
  templateUrl: './formularios.component.html',
  styleUrl: './formularios.component.css'
})
export class FormulariosComponent implements OnInit {
  formularios: Formulario[] = [];
  formularioSeleccionado: Formulario | null = null;

  constructor(private formulariosService: FormulariosService) { }

  ngOnInit(): void {
    this.cargarFormularios();
  }

  cargarFormularios(): void {
    this.formulariosService.getMisFormularios().subscribe({
      // ordeanr por fecha de creacion
      next: (data) => this.formularios = data.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()),
      error: (err) => console.error('Error al cargar formularios', err)
    });
  }

  seleccionarFormulario(formulario: Formulario): void {
    this.formularioSeleccionado = formulario;
  }

  cerrarDetalle(): void {
    this.formularioSeleccionado = null;
  }
  modalVisible = false;

  abrirModal(): void {
    this.modalVisible = true;
  }

  cerrarModal(): void {
    this.modalVisible = false;
  }

  crearFormulario(dto: { nombre: string, descripcion: string }): void {
    this.formulariosService.crearFormulario(dto).subscribe({
      next: () => {
        this.cargarFormularios();
        this.cerrarModal();
      },
      error: err => console.error('Error al crear formulario', err)
    });
  }
  recargar(): void {
    this.cerrarDetalle();
    this.cargarFormularios();
  }
}