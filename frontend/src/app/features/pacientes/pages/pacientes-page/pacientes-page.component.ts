import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Paciente } from '../../../../core/models/paciente.interface';
import { Subscription } from 'rxjs';
import { PacientesService } from '../../../../core/services/pacientes.service';

@Component({
  selector: 'app-pacientes-page',
  templateUrl: './pacientes-page.component.html',
  styleUrls: ['./pacientes-page.component.css']
})
export class PacientesPageComponent implements OnInit, OnDestroy {
  pacientes: Paciente[] = [];
  pacienteSeleccionado: Paciente | null = null;


  private pacientesSub: Subscription = new Subscription();
  private pacientesService = inject(PacientesService);

  panelModificarPacienteVisible: boolean = false;
  panelCrearPacienteVisible: boolean = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    const sub = this.pacientesService.getAll().subscribe({
      next: (data) => {
        this.pacientes = data;
        console.log(this.pacientes);
      },
      error: (e) => {
        console.error('Error al cargar pacientes:', e);
      }
    });
    this.pacientesSub.add(sub);
  }

  update(p: Paciente): void {
    const pacienteMOD: Omit<Paciente, 'id_paciente'> = {
      nombre: p.nombre,
      apellido: p.apellido,
      fecha_nacimiento: p.fecha_nacimiento
    };

    const sub = this.pacientesService.update(p.id_paciente, pacienteMOD).subscribe({
      next: () => {
        this.load();
      },
      error: (e) => {
        console.error('Error al actualizar:', e);
      }
    });
    this.pacientesSub.add(sub);
  }

  create(p: Omit<Paciente, 'id_paciente'>): void {
    const sub = this.pacientesService.create(p).subscribe({
      next: () => {
        this.load();
        this.toggleCrearPanel();
      },
      error: (e) => {
        console.error('Error al crear:', e);
      }
    });
    this.pacientesSub.add(sub);
  }
  
  remove(id: number): void {
    console.log(id);
    const sub = this.pacientesService.remove(id).subscribe({
      next: () => {
        this.load();
      },
      error: (e) => {
        console.error('Error al eliminar', e);
      }  
    });
    this.pacientesSub.add(sub);
  }  
  
  selectPatient(value: Paciente): void {
    this.pacienteSeleccionado = value;
    this.toggleModificarPanel();
  }
  
  toggleModificarPanel(): void {
    this.panelModificarPacienteVisible = !this.panelModificarPacienteVisible;
  }

  toggleCrearPanel(): void {
    this.panelCrearPacienteVisible = !this.panelCrearPacienteVisible;
  }  
  
  handleSearch(term: string): void {
    if (!term.trim()) {
      this.load();
      return;
    }

    const sub = this.pacientesService.getPacientes(term).subscribe({
      next: (data) => {
        this.pacientes = Array.isArray(data) ? data : [data];
      },
      error: (err) => {
        console.error('Error de búsqueda:', err);
      },
    });
    this.pacientesSub.add(sub);
  }

  ngOnDestroy(): void {
    this.pacientesSub.unsubscribe();
  }
}