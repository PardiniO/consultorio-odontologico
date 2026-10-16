import { Component, Input } from '@angular/core';
import { Turno } from '../../../../core/models/turno.interface';

@Component({
  selector: 'app-turno-card',
  templateUrl: './turno-card.component.html',
  styleUrl: './turno-card.component.css'
})
export class TurnoCardComponent {
  @Input({required: true}) paciente!: string;
  @Input({required: true}) horario!: string;
  @Input({required: true}) sala!: string;
  @Input({required: true}) razon!: string;
  @Input({required: true}) descripcion!: string;
  @Input({required: true}) estado!: string;

  modificarEstado(nuevoEstado: Turno['estado']): void {
    this.estado = nuevoEstado;
  }
}
