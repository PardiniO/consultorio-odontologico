import { Component, inject, OnInit } from '@angular/core';
import { Turno } from '../../../../core/models/turno.interface';
import { TurnosService } from '../../../../core/services/turnos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-turnos-page',
  templateUrl: './turnos-page.component.html',
  styleUrls: ['./turnos-page.component.css']
})
export class TurnosPageComponent implements OnInit {
  turnos: Turno[] = [];
  turnoSeleccionado: Turno | null = null;
  turnosFiltrados: string[] = [];

  private turnosSub!: Subscription;
  private turnosService = inject(TurnosService);

  panelModificarTurnoVisible: boolean = false;
  panelCrearTurnoVisible: boolean = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.turnosSub = this.turnosService.getAll().subscribe({
      next: (data) => {
        this.turnos = data;
        console.log(this.turnos);
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  update(t: Turno): void {
    const turnoMOD: Omit<Turno, 'id_turno'> = {
      horario: t.horario,
      sala: t.sala,
      razon: t.razon,
      descripcion: t.descripcion,
      estado: t.estado,
      id_paciente: t.id_paciente,
      id_doctor: t.id_doctor
    };

    this.turnosService.update(t.id_turno, turnoMOD).subscribe({
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

    this.turnosService.getById(id_).subscribe({
      next: (data) => {
        this.turnos = [data];
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  create(t: Omit<Turno, 'id_turno'>): void {
    this.turnosService.create(t).subscribe({
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
    this.turnosService.remove(id).subscribe({
      next: () => {
        this.load();
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  selectTurno(value: Turno): void {
    this.togglePannel();

    this.turnoSeleccionado = value;
    console.log(this.turnoSeleccionado);
  }
  
  handleSearch(term: string): void {
    this.turnosService.getTurnos(term).subscribe({
      next: (data) => {
        this.turnosFiltrados = data;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  togglePannel(): void {
    this.panelModificarTurnoVisible = !this.panelModificarTurnoVisible;
  }

  togglePannel2(): void {
    this.panelCrearTurnoVisible = !this.panelCrearTurnoVisible;
  }

  ngOnDestroy(): void {
    this.turnosSub.unsubscribe();
  }
}
