import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from '../../../../core/models/doctor.interface';

@Component({
  selector: 'app-odontologo-card',
  templateUrl: './odontologo-card.component.html',
  styleUrl: './odontologo-card.component.css'
})
export class OdontologoCardComponent {
  @Input({required: true}) doctor!: Doctor;

  @Output() modificar = new EventEmitter<Doctor>();
  @Output() eliminar = new EventEmitter<number>();

  modificarCard(): void {
    this.modificar.emit(this.doctor);
  }

  eliminarDoctor(id: number): void {
    this.eliminar.emit(id);
  }
}
