import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../models/paciente.interface';
import { FiltroPacientes } from '../models/filtro-pacientes.interface';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private apiUrl: string = 'http://localhost:3000/api/pacientes';

  private http = inject(HttpClient);

  private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJFbmRvZG9uY2lzdGEiLCJlc0FkbWluIjoxLCJpYXQiOjE3OTI2MDU4MjAsImV4cCI6MTc5MjYxMzAyMH0.As7tCyWdKcNO7hY1yJCWG00ck2qM2ECC8Q5kbrI7-YA';

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

  getPacientesFiltrados(filtros: FiltroPacientes): Observable<Paciente[]> {
    let params = new HttpParams();
    const claves = Object.keys(filtros) as Array<keyof FiltroPacientes>;

    claves.forEach(key => {
      const valor = filtros[key];
      if (valor !== undefined && valor !== null && valor !== '') {
        params = params.set(key, valor);
      }
    });

    return this.http.get<Paciente[]>(`${this.apiUrl}/filters`, { params, headers: this.headers });
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
