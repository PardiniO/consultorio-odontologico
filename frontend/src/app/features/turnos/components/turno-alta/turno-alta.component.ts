import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { TurnosService } from '../../../../core/services/turnos.service';
import { Turno } from '../../../../core/models/turno.interface';
import { PacientesService } from '../../../../core/services/pacientes.service';
import { DoctoresService } from '../../../../core/services/doctores.service';
import { Paciente } from '../../../../core/models/paciente.interface';
import { Doctor } from '../../../../core/models/doctor.interface';

@Component({
  selector: 'app-turno-alta',
  templateUrl: './turno-alta.component.html',
  styleUrl: './turno-alta.component.css'
})
export class TurnoAltaComponent implements OnInit {
  private pacientesService = inject(PacientesService);
  private doctoresService = inject(DoctoresService);

  @Output() salir = new EventEmitter<void>();
  @Output() crear = new EventEmitter<Omit<Turno, 'id'>>();

  pacientes: Paciente[] = [];
  doctores: Doctor[] = [];

  ngOnInit(): void {
    this.pacientesService.getAll().subscribe({
      next: (data) => {
        this.pacientes = data;
      },
      error: (e) => {
        console.error(e);
      }
    });

    this.doctoresService.getAll().subscribe({
      next: (data) => {
        this.doctores = data;
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  turno: Omit<Turno, 'id'> = {
    horario: '',
    sala: 'A17',
    razon: '',
    descripcion: '',
    estado: 'pendiente',
    id_paciente: 0,
    id_doctor: 0
  };

  create(): void {
    this.turno.id_doctor = Number(this.turno.id_doctor);
    this.turno.id_paciente = Number(this.turno.id_paciente);

    console.log(this.turno, this.turno.estado);
    this.crear.emit(this.turno);
  }

  salirDelMenuAlta(): void {
    this.salir.emit();
  }
}
