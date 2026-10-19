import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paciente } from '../../../../core/models/paciente.interface';

@Component({
  selector: 'app-paciente-card',
  templateUrl: './paciente-card.component.html',
  styleUrls: ['./paciente-card.component.css']
})
export class PacienteCardComponent {
  @Input({required: true}) paciente!: Paciente;

  @Output() modificar = new EventEmitter<Paciente>();
  @Output() eliminar = new EventEmitter<number>();

  modificarPaciente(): void {
    this.modificar.emit(this.paciente);
  }

  eliminarPaciente(id: number): void {
    this.eliminar.emit(id);
  }
}
