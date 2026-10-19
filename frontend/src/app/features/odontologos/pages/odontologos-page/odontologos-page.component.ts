import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Doctor } from '../../../../core/models/doctor.interface';
import { Subscription } from 'rxjs';
import { DoctoresService } from '../../../../core/services/doctores.service';

@Component({
  selector: 'app-odontologos-page',
  templateUrl: './odontologos-page.component.html',
  styleUrls: ['./odontologos-page.component.css']
})
export class OdontologosPageComponent implements OnInit, OnDestroy {
  doctores: Doctor[] = [];
  doctorSeleccionado: Doctor | null = null;

  private doctoresSub: Subscription = new Subscription();
  private doctoresService = inject(DoctoresService);

  panelModificarDoctorVisible: boolean = false;
  panelCrearDoctorVisible: boolean = false;

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    const sub = this.doctoresService.getAll().subscribe({
      next: (data) => {
        this.doctores = data;
        console.log(this.doctores);
      },
      error: (e) => {
        console.error('Error al cargar doctores:', e);
      }
    });
    this.doctoresSub.add(sub);
  }

  update(d: Doctor): void {
    const doctorMOD: Omit<Doctor, 'id_doctor'> = {
      nombre: d.nombre,
      apellido: d.apellido,
      rol: d.rol,
      es_admin: d.es_admin
    };

    const sub = this.doctoresService.update(d.id_doctor, doctorMOD).subscribe({
      next: () => {
        this.load();
      },
      error: (e) => {
        console.error('Error al actualizar doctores:', e);
      }
    });
    this.doctoresSub.add(sub);
  }

  create(d: Omit<Doctor, 'id_doctor'>): void {
    const sub = this.doctoresService.create(d).subscribe({
      next: () => {
        this.load();
        this.toggleCrearPanel();
      },
      error: (e) => {
        console.error('Error al crear doctor:', e);
      }
    });
    this.doctoresSub.add(sub);
  }

  remove(id: number): void {
    console.log(id);
    const sub = this.doctoresService.remove(id).subscribe({
      next: () => {
        this.load();
      },
      error: (e) => {
        console.error('Error al eliminar doctores. Verifique si tiene turnos asignados:', e);
      }
    });
    this.doctoresSub.add(sub);

    // CREO QUE NO FUNCIONA PORQUE EN LA PARTE DE LAS FKS FALTO PONER ON DELETE CASCADE PARA QUE NO SALTE EL ERROR DE QUE NO SE PUEDEN BORRAR FILAS PADRES
  }

  selectDoctor(value: Doctor): void {
    this.toggleModificarPanel();

    this.doctorSeleccionado = value;
    console.log(this.doctorSeleccionado); 
  }
  
  handleSearch(term: string): void {
    const sub = this.doctoresService.getDoctores(term).subscribe({
      next: (data) => {
        this.doctores = data;
      },
      error: (err) => {
        console.error('Error al buscar doctores:', err);
      },
    });
    this.doctoresSub.add(sub);
  }

  toggleModificarPanel(): void {
    this.panelModificarDoctorVisible = !this.panelModificarDoctorVisible;
  }

  toggleCrearPanel(): void {
    this.panelCrearDoctorVisible = !this.panelCrearDoctorVisible;
  }

  ngOnDestroy(): void {
    this.doctoresSub?.unsubscribe();
  }
}