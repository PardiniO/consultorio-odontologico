import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Doctor } from '../../../../core/models/doctor.interface';
import { DoctoresService } from '../../../../core/services/doctores.service';

@Component({
  selector: 'app-odontologo-alta',
  templateUrl: './odontologo-alta.component.html',
  styleUrls: ['./odontologo-alta.component.css']
})
export class OdontologoAltaComponent {
  private doctoresService = inject(DoctoresService);


  @Output() crearDoctor = new EventEmitter<Omit<Doctor, 'id_doctor'>>();
  @Output() salir = new EventEmitter<void>();

  doctor: Omit<Doctor, 'id_doctor'> = {
    nombre: '',
    apellido: '',
    rol: 'Endodoncista',
    es_admin: false
  };

  crear(): void {
    this.crearDoctor.emit(this.doctor);
  }

  salirDelMenuAlta(): void {
    this.salir.emit();
  }
}
