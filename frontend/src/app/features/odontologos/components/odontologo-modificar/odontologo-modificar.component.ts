import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from '../../../../core/models/doctor.interface';

@Component({
  selector: 'app-odontologo-modificar',
  templateUrl: './odontologo-modificar.component.html',
  styleUrl: './odontologo-modificar.component.css'
})
export class OdontologoModificarComponent {
  @Input({required: true}) doctorSeleccionado!: Doctor;

  @Output() salir = new EventEmitter<boolean>();
  @Output() modificar = new EventEmitter<Doctor>();

  cerrar(): void {
    this.salir.emit();
  }

  enviarModificacion(): void {
    console.log(this.doctorSeleccionado);
    this.modificar.emit(this.doctorSeleccionado);
    this.salir.emit();
  }
}
