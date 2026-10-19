import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private apiUrl: string = 'http://localhost:3000/api/pacientes';

  private http = inject(HttpClient);

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJFbmRvZG9uY2lzdGEiLCJlc0FkbWluIjoxLCJpYXQiOjE3OTI0MjEzMTUsImV4cCI6MTc5MjQyODUxNX0.VW2FTc0oePZZjHchIqHuvCyUaVaAa2U6HndNHgFwrB8'
  });

  getAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl, { headers: this.headers });
  }

  getById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  getByName(name: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/by-names/${name}`, { headers: this.headers });
    // AGREGAR LOS METODOS NECESARIOS EN EL MODELO Y LOS CONTROLLERS DEL BACKEND
  }

  create(paciente: Omit<Paciente, 'id_paciente'>): Observable<Paciente> {
    return this.http.post<Paciente>(this.apiUrl, paciente, { headers: this.headers });
  }

  update(id: number, paciente: Omit<Paciente, 'id_paciente'>): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente, { headers: this.headers });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
