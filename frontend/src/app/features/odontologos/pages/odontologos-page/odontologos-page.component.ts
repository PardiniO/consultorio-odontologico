import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Doctor } from '../../../../core/models/doctor.interface';
import { Subscription } from 'rxjs';
import { DoctoresService } from '../../../../core/services/doctores.service';
import { FiltroDoctores } from '../../../../core/models/filtro-doctores.interface';

@Component({
  selector: 'app-odontologos-page',
  templateUrl: './odontologos-page.component.html',
  styleUrls: ['./odontologos-page.component.css']
})
export class OdontologosPageComponent implements OnInit, OnDestroy {
  doctores: Doctor[] = [];
  nombresDoctores: string[] = [];
  apellidosDoctores: string[] = [];
  usuariosDoctores: string[] = [];
  doctorSeleccionado: Doctor | null = null;

  terminoBusqueda: string = '';

  private doctoresSub!: Subscription;
  private doctoresService = inject(DoctoresService);

  panelModificarDoctorVisible: boolean = false;
  panelCrearDoctorVisible: boolean = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.doctoresSub = this.doctoresService.getAll().subscribe({
      next: (data) => {
        this.doctores = data;
        console.log(this.doctores);

        this.nombresDoctores = this.doctores.map(d => d.nombre);

        this.apellidosDoctores = this.doctores.map(d => d.apellido);

        this.usuariosDoctores = this.doctores.map(d => d.usuario);

        console.log(this.nombresDoctores, this.apellidosDoctores, this.usuariosDoctores);
      },
      error: (e) => {
        console.error('Error al cargar doctores:', e);
      }
    });
  }

  update(d: Doctor): void {
    const doctorMOD: Omit<Doctor, 'id_doctor'> = {
      nombre: d.nombre,
      apellido: d.apellido,
      usuario: d.usuario,
      contrasena: d.contrasena,
      rol: d.rol,
      es_admin: d.es_admin
    };

    this.doctoresSub = this.doctoresService.update(d.id_doctor, doctorMOD).subscribe({
      next: () => {
        this.load();
      },
      error: (e) => {
        console.error('Error al actualizar doctores:', e);
      }
    });
  }

  register(d: Omit<Doctor, 'id_doctor'>): void {
    this.doctoresSub = this.doctoresService.register(d).subscribe({
      next: () => {
        this.load();
        this.toggleCrearPanel();
      },
      error: (e) => {
        console.error('Error al crear doctor:', e);
      }
    });
  }

  remove(id: number): void {
    console.log(id);
    this.doctoresSub = this.doctoresService.remove(id).subscribe({
      next: () => {
        this.load();
      },
      error: (e) => {
        console.error('Error al eliminar doctores. Verifique si tiene turnos asignados:', e);
      }
    });
  }

  selectDoctor(value: Doctor): void {
    this.toggleModificarPanel();

    this.doctorSeleccionado = value;
    console.log(this.doctorSeleccionado); 
  }
  
  handleSearch(term: string): void {
    this.doctoresSub = this.doctoresService.getByName(term).subscribe({
      next: (data) => {
        this.doctores = [data];
        this.load();
      },
      error: (err) => {
        console.error('Error al buscar doctores:', err);
      },
    });
  }

  toggleModificarPanel(): void {
    this.panelModificarDoctorVisible = !this.panelModificarDoctorVisible;
  }

  toggleCrearPanel(): void {
    this.panelCrearDoctorVisible = !this.panelCrearDoctorVisible;
  }

  aplicarFiltros(rol: string, nombre: string, apellido: string, usuario: string): void {
    const queryParams: FiltroDoctores = {};

    if (this.terminoBusqueda.trim()) queryParams.termino = this.terminoBusqueda;
    if (rol) queryParams.rol = rol;
    if (nombre) queryParams.nombre = nombre;
    if (apellido) queryParams.apellido = apellido;
    if (usuario) queryParams.usuario = usuario;

    this.doctoresSub = this.doctoresService.getDoctoresFiltrados(queryParams).subscribe({
      next: (data) => {
        this.doctores = data;
      },
      error: (err) => {
        console.error('Error al filtrar doctores:', err);
      }
    });
  }   

  ngOnDestroy(): void {
    this.doctoresSub?.unsubscribe();
  }
}