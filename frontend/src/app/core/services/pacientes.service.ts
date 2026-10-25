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

  private getHeaders(): HttpHeaders {
    const token: string | null = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log(headers.get('Authorization'));
    return headers;
  }

  getAll(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getPacientes(searchTerm: string): Observable<Paciente[]> {
    const params = new HttpParams().set('q', searchTerm);
    return this.http.get<Paciente[]>(this.apiUrl, { headers: this.getHeaders() });
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

    return this.http.get<Paciente[]>(`${this.apiUrl}/filters`, { params, headers: this.getHeaders() });
  }

  getByName(name: string): Observable<Paciente> {
    return this.http.get<Paciente>(`${this.apiUrl}/by-names/${name}`, { headers: this.getHeaders() });
  }

  register(paciente: Omit<Paciente, 'id_paciente'>): Observable<Paciente> {
    return this.http.post<Paciente>(`${this.apiUrl}/registrar-paciente`, paciente, { headers: this.getHeaders() });
  }

  update(id: number, paciente: Omit<Paciente, 'id_paciente'>): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/${id}`, paciente, { headers: this.getHeaders() });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
