import { Component, inject, OnInit } from '@angular/core';
import { Paciente } from '../../../../core/models/paciente.interface';
import { Subscription } from 'rxjs';
import { PacientesService } from '../../../../core/services/pacientes.service';

@Component({
  selector: 'app-pacientes-page',
  templateUrl: './pacientes-page.component.html',
  styleUrl: './pacientes-page.component.css'
})
export class PacientesPageComponent implements OnInit {
  pacientes: Paciente[] = [];
  pacienteSeleccionado: Paciente | null = null;

  private pacientesSub!: Subscription;
  private pacientesService = inject(PacientesService);

  panelModificarPacienteVisible: boolean = false;
  panelCrearPacienteVisible: boolean = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.pacientesSub = this.pacientesService.getAll().subscribe({
      next: (data) => {
        this.pacientes = data;
        console.log(this.pacientes);
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  update(p: Paciente): void {
    const pacienteMOD: Omit<Paciente, 'id_paciente'> = {
      nombre: p.nombre,
      apellido: p.apellido,
      fecha_nacimiento: p.fecha_nacimiento
    };

    this.pacientesService.update(p.id_paciente, pacienteMOD).subscribe({
      next: () => {
        this.load();
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  getById(id: string): void {
    let id_: number = Number(id);

    this.pacientesService.getById(id_).subscribe({
      next: (data) => {
        this.pacientes = [data];
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  getByName(name: string): void {
    if (name === '') {
      this.load();

    } else {
      this.pacientesService.getByName(name).subscribe({
        next: (data) => {
          this.pacientes = [data];
        },
        error: (e) => {
          console.error(e);
        }
      });
    }
  }

  create(p: Omit<Paciente, 'id_paciente'>): void {
    this.pacientesService.create(p).subscribe({
      next: () => {
        this.load();
        this.togglePannel2();
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  remove(id: number): void {
    console.log(id);
    this.pacientesService.remove(id).subscribe({
      next: () => {
        this.load();
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  selectPatient(value: Paciente): void {
    this.togglePannel();

    this.pacienteSeleccionado = value;
    console.log(this.pacienteSeleccionado);
  }

  togglePannel(): void {
    this.panelModificarPacienteVisible = !this.panelModificarPacienteVisible;
  }

  togglePannel2(): void {
    this.panelCrearPacienteVisible = !this.panelCrearPacienteVisible;
  }

  ngOnDestroy(): void {
    this.pacientesSub.unsubscribe();
  }
}
