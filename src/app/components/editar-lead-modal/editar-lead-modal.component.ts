import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-lead-modal',
  imports: [ CommonModule, FormsModule ],
  templateUrl: './editar-lead-modal.component.html',
  styleUrl: './editar-lead-modal.component.css'
})
export class EditarLeadModalComponent {
  @Input() lead: any = {};
  @Input() visible: boolean = false;
  @Output() onGuardar = new EventEmitter<any>();
  @Output() onCancelar = new EventEmitter<void>();

  leadEditado: any = {};

  ngOnChanges() {
    this.leadEditado = { ...this.lead };
  }

  guardar() {
    this.onGuardar.emit(this.leadEditado);
  }

  cancelar() {
    this.onCancelar.emit();
  }
}