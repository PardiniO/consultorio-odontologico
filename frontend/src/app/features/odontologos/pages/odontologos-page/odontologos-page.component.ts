import { Component, inject, OnInit } from '@angular/core';
import { Doctor } from '../../../../core/models/doctor.interface';
import { Subscription } from 'rxjs';
import { DoctoresService } from '../../../../core/services/doctores.service';

@Component({
  selector: 'app-odontologos-page',
  templateUrl: './odontologos-page.component.html',
  styleUrls: ['./odontologos-page.component.css']
})
export class OdontologosPageComponent implements OnInit {
  doctores: Doctor[] = [];
  doctorSeleccionado: Doctor | null = null;

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
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  update(d: Doctor): void {
    const doctorMOD: Omit<Doctor, 'id_doctor'> = {
      nombre: d.nombre,
      apellido: d.apellido,
      rol: d.rol,
      es_admin: d.es_admin
    };

    this.doctoresService.update(d.id_doctor, doctorMOD).subscribe({
      next: () => {
        this.load();
      },
      error: (e) => {
        console.error(e);
      }
    });
  }

  getById(id: string): void {
    let id_:number = Number(id);

    this.doctoresService.getById(id_).subscribe({
      next: (data) => {
        this.doctores = [data];
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
      this.doctoresService.getByName(name).subscribe({
        next: (data) => {
          this.doctores = [data];
        },
        error: (e) => {
          console.error(e);
        }
      });
    }
  }

  create(d: Omit<Doctor, 'id_doctor'>): void {
    this.doctoresService.create(d).subscribe({
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
    this.doctoresService.remove(id).subscribe({
      next: () => {
        this.load();
      },
      error: (e) => {
        console.error(e);
      }
    });

    // CREO QUE NO FUNCIONA PORQUE EN LA PARTE DE LAS FKS FALTO PONER ON DELETE CASCADE PARA QUE NO SALTE EL ERROR DE QUE NO SE PUEDEN BORRAR FILAS PADRES
  }

  selectDoctor(value: Doctor): void {
    this.togglePannel();

    this.doctorSeleccionado = value;
    console.log(this.doctorSeleccionado); 
  }
  
  handleSearch(term: string): void {
    this.doctoresService.getDoctores(term).subscribe({
      next: (data) => {
        /** Ehhhhhhhhh */
      },
      error: (err) => {
        console.error(err);
      },
    });
  }


  togglePannel(): void {
    this.panelModificarDoctorVisible = !this.panelModificarDoctorVisible;
  }

  togglePannel2(): void {
    this.panelCrearDoctorVisible = !this.panelCrearDoctorVisible;
  }

  ngOnDestroy(): void {
    this.doctoresSub.unsubscribe();
  }
}
