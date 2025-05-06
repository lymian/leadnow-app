import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Formulario, Lead, FormulariosService } from '../../../services/formularios.service';
import { CommonModule } from '@angular/common';
import { LeadsService } from '../../../services/leads.service';
import { FormsModule } from '@angular/forms';
import { EditarLeadModalComponent } from '../../../components/editar-lead-modal/editar-lead-modal.component';
import { FormularioEditarModalComponent } from '../../../components/formulario-editar-modal/formulario-editar-modal.component';
import { CrearFormularioDTO } from '../../../services/formularios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-detalle',
  imports: [CommonModule, FormsModule, EditarLeadModalComponent, FormularioEditarModalComponent],
  templateUrl: './formulario-detalle.component.html',
  styleUrl: './formulario-detalle.component.css'
})
export class FormularioDetalleComponent {

  constructor(private leadsService: LeadsService,
    private formulariosService: FormulariosService
  ) { }
  @Input() formulario!: Formulario;
  @Output() cerrar = new EventEmitter<void>();

  nuevoLead = {
    nombre: '',
    email: '',
    estado: 'NUEVO',
    idFormulario: 0
  };

  agregarLead(): void {
    this.nuevoLead.idFormulario = this.formulario.id;

    this.leadsService.crearLead(this.nuevoLead).subscribe({
      next: (response) => {
        // Agregamos el nuevo lead a la lista del formulario para que se vea en pantalla
        this.formulario.leads.push({
          id: response.id, // asumimos que el backend retorna el id del lead creado
          nombre: this.nuevoLead.nombre,
          email: this.nuevoLead.email,
          estado: 'NUEVO',
          fechaEnvio: new Date().toISOString()
        });

        // Limpiar el formulario
        this.nuevoLead.nombre = '';
        this.nuevoLead.email = '';
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Lead creado',
          text: 'El lead se ha creado correctamente.',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (err) => {
        console.error('Error al crear lead:', err);
      }
    });
  }
  // Método para eliminar un lead del formulario
  eliminarLead(lead: Lead): void {
    // Confirmar la eliminación del lead
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar este lead después de eliminarlo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.leadsService.eliminarLead(lead.id).subscribe({
          next: () => {
            // Eliminar el lead de la lista del formulario
            this.formulario.leads = this.formulario.leads.filter(l => l.id !== lead.id);
            Swal.fire('Eliminado', 'El lead ha sido eliminado.', 'success');
          },
          error: (err) => {
            console.error('Error al eliminar lead:', err);
          }
        });
      }
    });

  }
  // Método para actualizar un lead del formulario
  actualizarLead(lead: Lead): void {
    this.leadsService.actualizarLead(lead.id, lead).subscribe({
      next: () => {
        // Aquí podrías manejar la respuesta si es necesario
        console.log('Lead actualizado:', lead);
      },
      error: (err) => {
        console.error('Error al actualizar lead:', err);
      }
    });
  }

  leadModalVisible = false;
  leadSeleccionado: any = null;

  mostrarModalEdicion(lead: any): void {
    this.leadSeleccionado = lead;
    this.leadModalVisible = true;
  }

  ocultarModal(): void {
    this.leadModalVisible = false;
    this.leadSeleccionado = null;
  }

  guardarCambiosLead(leadEditado: any): void {
    const dto = {
      nombre: leadEditado.nombre,
      email: leadEditado.email,
      estado: leadEditado.estado,
      idFormulario: this.formulario.id
    };

    this.leadsService.actualizarLead(leadEditado.id, dto).subscribe({
      next: () => {
        const index = this.formulario.leads.findIndex(l => l.id === leadEditado.id);
        if (index !== -1) this.formulario.leads[index] = leadEditado;
        this.ocultarModal();
        Swal.fire({
          icon: 'success',
          title: 'Lead actualizado',
          text: 'El lead se ha actualizado correctamente.',
          confirmButtonText: 'Aceptar'
        });
      },
      error: err => console.error('Error al actualizar lead', err)
    });
  }

  eliminarFormulario(): void {

    // Confirmar la eliminación del formulario
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar este formulario después de eliminarlo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.formulariosService.eliminarFormulario(this.formulario.id).subscribe({
          next: () => {
            console.log('Formulario eliminado:', this.formulario.id);
            this.cerrarDetalle(); // Cerrar el detalle del formulario después de eliminarlo
            Swal.fire({
              icon: 'success',
              title: 'Formulario eliminado',
              text: 'El formulario se ha eliminado correctamente.',
              confirmButtonText: 'Aceptar'
            });
          },
          error: (err) => {
            console.error('Error al eliminar formulario:', err);
          }
        });
      }
    });
  }
  cerrarDetalle(): void {
    this.cerrar.emit();
  }
  mostrarModalEditar = false;
  abrirModalEditar() {
    this.mostrarModalEditar = true;
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
  }

  actualizarFormulario(dto: CrearFormularioDTO) {
    this.formulariosService.actualizarFormulario(this.formulario.id, dto).subscribe({
      next: (formActualizado) => {
        this.formulario.nombre = formActualizado.nombre;
        this.formulario.descripcion = formActualizado.descripcion;
        this.cerrarModalEditar();
        Swal.fire({
          icon: 'success',
          title: 'Formulario actualizado',
          text: 'El formulario se ha actualizado correctamente.',
          confirmButtonText: 'Aceptar'
        });
      },
      error: (err) => console.error('Error al actualizar formulario', err)
    });
  }
}