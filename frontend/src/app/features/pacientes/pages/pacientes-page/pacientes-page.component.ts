import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Paciente } from '../../../../core/models/paciente.interface';
import { Subscription } from 'rxjs';
import { PacientesService } from '../../../../core/services/pacientes.service';
import { FiltroPacientes } from '../../../../core/models/filtro-pacientes.interface';

@Component({
  selector: 'app-pacientes-page',
  templateUrl: './pacientes-page.component.html',
  styleUrls: ['./pacientes-page.component.css']
})
export class PacientesPageComponent implements OnInit, OnDestroy {
  pacientes: Paciente[] = [];
  nombresPacientes: string[] = [];
  apellidosPacientes: string[] = [];
  fechasDeNacimientoPacientes: string[] = [];
  usuariosPacientes: string[] = [];
  pacienteSeleccionado: Paciente | null = null;

  terminoBusqueda: string = '';

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

        this.nombresPacientes = this.pacientes.map(p => p.nombre);
        this.apellidosPacientes = this.pacientes.map(p => p.apellido);
        this.fechasDeNacimientoPacientes = this.pacientes.map(p => p.fecha_nacimiento);
        this.usuariosPacientes = this.pacientes.map(p => p.usuario);

        console.log(this.nombresPacientes, this.apellidosPacientes, this.fechasDeNacimientoPacientes, this.usuariosPacientes);
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
      usuario: p.usuario,
      contrasena: p.contrasena,
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

  register(p: Omit<Paciente, 'id_paciente'>): void {
    const sub = this.pacientesService.register(p).subscribe({
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

  aplicarFiltros(nombre: string, apellido: string, fecha_nacimiento: string, usuario: string): void {
      const queryParams: FiltroPacientes = {};
  
      if (this.terminoBusqueda.trim()) queryParams.termino = this.terminoBusqueda;
      if (nombre) queryParams.nombre = nombre;
      if (apellido) queryParams.apellido = apellido;
      if (fecha_nacimiento) queryParams.fecha_nacimiento = fecha_nacimiento;
      if (usuario) queryParams.usuario = usuario;
  
      this.pacientesSub = this.pacientesService.getPacientesFiltrados(queryParams).subscribe({
        next: (data) => {
          this.pacientes = data;
        },
        error: (err) => {
          console.error('Error al filtrar doctores:', err);
        }
      });
    }

  ngOnDestroy(): void {
    this.pacientesSub.unsubscribe();
  }
}