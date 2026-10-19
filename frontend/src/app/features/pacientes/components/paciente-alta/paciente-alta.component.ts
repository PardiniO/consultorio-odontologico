import { Component, EventEmitter, inject, Output } from '@angular/core';
import { PacientesService } from '../../../../core/services/pacientes.service';
import { Paciente } from '../../../../core/models/paciente.interface';

@Component({
  selector: 'app-paciente-alta',
  templateUrl: './paciente-alta.component.html',
  styleUrls: ['./paciente-alta.component.css']
})
export class PacienteAltaComponent {
  @Output() salir = new EventEmitter<void>();
  @Output() crear = new EventEmitter<Omit<Paciente, 'id_paciente'>>();

  paciente: Omit<Paciente, 'id_paciente'> = {
    nombre: '',
    apellido: '',
    usuario: '',
    contrasena: '',
    fecha_nacimiento: '2026-10-01'
  };

  create(): void {
    this.crear.emit(this.paciente);
  }

  salirDelPanelCrear(): void {
    this.salir.emit();
  }
}
