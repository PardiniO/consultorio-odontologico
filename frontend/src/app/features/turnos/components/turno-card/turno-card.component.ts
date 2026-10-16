import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Turno } from '../../../../core/models/turno.interface';

@Component({
  selector: 'app-turno-card',
  templateUrl: './turno-card.component.html',
  styleUrl: './turno-card.component.css'
})
export class TurnoCardComponent {
  @Input({required: true}) turno!: Turno;

  @Output() modificar = new EventEmitter<Turno>();

  modificarTurno(): void {
    this.modificar.emit(this.turno);
  }
}
