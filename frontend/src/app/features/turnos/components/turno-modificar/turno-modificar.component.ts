import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Turno } from '../../../../core/models/turno.interface';

@Component({
  selector: 'app-turno-modificar',
  templateUrl: './turno-modificar.component.html',
  styleUrls: ['./turno-modificar.component.css']
})
export class TurnoModificarComponent {
  @Input({ required: true }) turnoSeleccionado!: Turno;

  @Output() salir = new EventEmitter<boolean>();
  @Output() modificar = new EventEmitter<Turno>();

  cerrar(): void {
    this.salir.emit();
  }

  formatearHorario(): string {
    if (!this.turnoSeleccionado.horario) return '';
    const fecha = new Date(this.turnoSeleccionado.horario);

    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const dia = String(fecha.getDate()).padStart(2, '0');

    return `${año}-${mes}-${dia}`;
  }

  enviarModificacion(): void {
    console.log(this.turnoSeleccionado);
    this.turnoSeleccionado.horario = this.formatearHorario();
    this.modificar.emit(this.turnoSeleccionado);
    this.salir.emit();
  }
}
