import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FiltroTurnos } from "../../../../core/models/filtro-turnos";
import { Turno } from '../../../../core/models/turno.interface';
import { TurnosService } from '../../../../core/services/turnos.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-turnos-page',
  templateUrl: './turnos-page.component.html',
  styleUrls: ['./turnos-page.component.css']
})
export class TurnosPageComponent implements OnInit, OnDestroy {
  turnos: Turno[] = [];
  turnoSeleccionado: Turno | null = null;

  terminoBusqueda: string = '';

  private turnosSub: Subscription = new Subscription();
  private turnosService = inject(TurnosService);

  panelModificarTurnoVisible: boolean = false;
  panelCrearTurnoVisible: boolean = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    const sub = this.turnosService.getAll().subscribe({
      next: (data) => {
        this.turnos = data;
      },
      error: (e) => console.error('Error al cargar turnos:', e)
    });
    this.turnosSub.add(sub);
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

    const sub = this.turnosService.update(t.id_turno, turnoMOD).subscribe({
      next: () => this.load(),
      error: (e) => console.error('Error al actualizar turno:', e)
    });
    this.turnosSub.add(sub);
  }

  create(t: Omit<Turno, 'id_turno'>): void {
    const sub = this.turnosService.create(t).subscribe({
      next: () => {
        this.load();
        this.toggleCrearPanel();
      },
      error: (e) => console.error('Error al crear turno:', e)
    });
    this.turnosSub.add(sub);
  }

  remove(id: number): void {
    const sub = this.turnosService.remove(id).subscribe({
      next: () => this.load(),
      error: (e) => console.error('Error al eliminar turno:', e)
    });
    this.turnosSub.add(sub);
  }

  selectTurno(value: Turno): void {
    this.turnoSeleccionado = value;
    this.toggleModificarPanel();
  }
  
  handleSearch(term: string, estado: string, sala: string, desde: string, hasta: string): void {
    this.terminoBusqueda = term;
    this.aplicarFiltros(estado, sala, desde, hasta);
  }

  aplicarFiltros(estado: string, sala: string, desde: string, hasta: string): void {
    const queryParams: FiltroTurnos = {};
    
    if (this.terminoBusqueda.trim()) queryParams.termino = this.terminoBusqueda;
    if (estado) queryParams.estado = estado;
    if (sala) queryParams.sala = sala;
    if (desde) queryParams.fechaDesde = desde;
    if (hasta) queryParams.fechaHasta = hasta;
    
    const sub = this.turnosService.getTurnosFiltrados(queryParams).subscribe({
      next: (data: Turno[]) => {
        this.turnos = data;
      },  
      error: (err) => {
        console.error('Error al filtrar turnos:', err);
      }  
    });  
    this.turnosSub.add(sub);
  }    
  toggleModificarPanel(): void {
    this.panelModificarTurnoVisible = !this.panelModificarTurnoVisible;
  }

  toggleCrearPanel(): void {
    this.panelCrearTurnoVisible = !this.panelCrearTurnoVisible;
  }

  ngOnDestroy(): void {
    this.turnosSub.unsubscribe();
  }
}
