import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Paciente } from '../../../../core/models/paciente.interface';

@Component({
  selector: 'app-paciente-modificar',
  templateUrl: './paciente-modificar.component.html',
  styleUrls: ['./paciente-modificar.component.css']
})
export class PacienteModificarComponent {
  @Input({ required: true }) pacienteSeleccionado!: Paciente;

  @Output() salir = new EventEmitter<boolean>();
  @Output() modificar = new EventEmitter<Paciente>();

  cerrar(): void {
    this.salir.emit();
  }

  enviarModificacion(): void {
    console.log(this.pacienteSeleccionado);
    this.modificar.emit(this.pacienteSeleccionado);
    this.salir.emit();
  }
}
