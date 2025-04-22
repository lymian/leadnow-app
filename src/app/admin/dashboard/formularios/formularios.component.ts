import { Component, OnInit } from '@angular/core';
import { Formulario, FormulariosService } from '../../../services/formularios.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Modal } from 'bootstrap';
import { LeadsService } from '../../../services/leads.service';

@Component({
  selector: 'app-formularios',
  imports: [CommonModule, FormsModule],
  templateUrl: './formularios.component.html',
  styleUrl: './formularios.component.css'
})
export class FormulariosComponent implements OnInit {

  formularios: Formulario[] = [];
  nuevoLead = {
    nombre: '',
    email: ''
  };
  formularioSeleccionado: number | null = null;

  constructor(private formulariosService: FormulariosService,
    private leadsService: LeadsService) { }

  ngOnInit(): void {
    this.formulariosService.getMisFormularios().subscribe({
      next: (res) => this.formularios = res,
      error: (err) => console.error('Error al cargar formularios', err)
    });
  }

  nuevoFormulario = {
    nombre: '',
    descripcion: ''
  };

  crearFormulario() {
    if (!this.nuevoFormulario.nombre || !this.nuevoFormulario.descripcion) return;

    this.formulariosService.crearFormulario(this.nuevoFormulario).subscribe({
      next: (res) => {
        this.nuevoFormulario = { nombre: '', descripcion: '' };
        // Recargar lista (asumiendo que tienes esta función)
        this.cargarFormularios();
        alert('Formulario creado con éxito!');
      },
      error: (err) => {
        console.error('Error al crear formulario:', err);
      }
    });
  }
  cargarFormularios() {
    this.formulariosService.getMisFormularios().subscribe({
      next: (res) => {
        this.formularios = res;
      },
      error: (err) => {
        console.error('Error al cargar formularios:', err);
      }
    });
  }
  // Función para mostrar el formulario de crear un lead
  abrirFormularioLead(idFormulario: number) {
    this.formularioSeleccionado = this.formularioSeleccionado === idFormulario ? null : idFormulario;
  }
  // Función para crear un nuevo lead
  crearLead(idFormulario: number) {
    if (!this.nuevoLead.nombre || !this.nuevoLead.email) return;

    const leadData = {
      nombre: this.nuevoLead.nombre,
      email: this.nuevoLead.email,
      estado: 'NUEVO',
      idFormulario: idFormulario
    };

    this.leadsService.crearLead(leadData).subscribe({
      next: (res) => {
        console.log('Lead creado con éxito:', res);
        // Limpia los campos después de la creación
        this.nuevoLead = { nombre: '', email: '' };
        // Recargar la lista de formularios
        this.formulariosService.getMisFormularios().subscribe({
          next: (res) => this.formularios = res,
          error: (err) => console.error('Error al cargar formularios', err)
        });
      },
      error: (err) => {
        console.error('Error al crear lead:', err);
      }
    });
  }
}