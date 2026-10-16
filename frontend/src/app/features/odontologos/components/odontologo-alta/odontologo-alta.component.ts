import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Doctor } from '../../../../core/models/doctor.interface';
import { DoctoresService } from '../../../../core/services/doctores.service';

@Component({
  selector: 'app-odontologo-alta',
  templateUrl: './odontologo-alta.component.html',
  styleUrl: './odontologo-alta.component.css'
})
export class OdontologoAltaComponent {
  private doctoresService = inject(DoctoresService);

  doctor: Omit<Doctor, 'id_doctor'> = {
    nombre: '',
    apellido: '',
    rol: 'Endodoncista',
    es_admin: false
  };

  create(): void {
    if (!this.doctor.nombre || !this.doctor.apellido) {
      alert('Faltan campos');
      return;
    };

    this.doctoresService.create(this.doctor).subscribe({
      next: () => {
        console.log(this.doctor);
      },
      error: (e) => {
        console.error(e);
      } 
    });
  }
}
