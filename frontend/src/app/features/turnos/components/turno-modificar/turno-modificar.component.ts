import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Turno } from '../../../../core/models/turno.interface';

@Component({
  selector: 'app-turno-modificar',
  templateUrl: './turno-modificar.component.html',
  styleUrl: './turno-modificar.component.css'
})
export class TurnoModificarComponent {
  @Input({ required: true }) turnoSeleccionado!: Turno;

  @Output() salir = new EventEmitter<boolean>();
  @Output() modificar = new EventEmitter<Turno>();

  cerrar(): void {
    this.salir.emit();
  }

  enviarModificacion(): void {
    console.log(this.turnoSeleccionado);
    this.modificar.emit(this.turnoSeleccionado);
    this.salir.emit();
  }
}
