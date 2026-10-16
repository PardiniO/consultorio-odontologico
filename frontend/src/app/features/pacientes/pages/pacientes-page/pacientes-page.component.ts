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

  private pacientesService = inject(PacientesService);
  private pacientesSub!: Subscription;

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
}
