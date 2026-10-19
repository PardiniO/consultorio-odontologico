import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.interface';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private apiUrl: string = 'http://localhost:3000/api/pacientes';

  private http = inject(HttpClient);

  private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJFbmRvZG9uY2lzdGEiLCJlc0FkbWluIjoxLCJpYXQiOjE3OTI0NDkwMDEsImV4cCI6MTc5MjQ1NjIwMX0.DKVtn7yrZZP2Asz80_9D8NCVpk1U3Oqf51aw92n_fPM';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  getAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl, { headers: this.headers });
  }

  getById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  getPacientes(searchTerm: string): Observable<Paciente[]> {
    const params = new HttpParams().set('q', searchTerm);
    return this.http.get<Paciente[]>(this.apiUrl, { headers: this.headers });
  }

  getByName(name: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/by-names/${name}`, { headers: this.headers });
  }

  register(paciente: Omit<Paciente, 'id_paciente'>): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.apiUrl}/registrar-paciente`, paciente, { headers: this.headers });
  }

  update(id: number, paciente: Omit<Paciente, 'id_paciente'>): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente, { headers: this.headers });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
