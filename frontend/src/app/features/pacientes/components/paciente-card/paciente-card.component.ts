import { Component, Input } from '@angular/core';
import { Paciente } from '../../../../core/models/paciente.interface';

@Component({
  selector: 'app-paciente-card',
  templateUrl: './paciente-card.component.html',
  styleUrl: './paciente-card.component.css'
})
export class PacienteCardComponent {
  @Input({required: true}) paciente!: Paciente;
}
