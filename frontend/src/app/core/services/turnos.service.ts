import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno.interface';
import { FiltroTurnos } from "../models/filtro-turnos";

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private apiUrl: string = 'http://localhost:3000/api/turnos';

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

  getAll(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<Turno> {
    return this.http.get<Turno>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  create(turno: Omit<Turno, 'id'>): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno, { headers: this.getHeaders() });
  }

  update(id: number, turno: Omit<Turno, 'id'>): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}/${id}`, turno, { headers: this.getHeaders() });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
    
  getTurnos(searchTerm: string): Observable<string[]> {
    const params = new HttpParams().set('q', searchTerm);
    return this.http.get<string[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getTurnosFiltrados(filtros: FiltroTurnos): Observable<Turno[]> {
    let params = new HttpParams();
    const claves = Object.keys(filtros) as Array<keyof FiltroTurnos>;
    
    claves.forEach(key => {
      const valor = filtros[key];
      if (valor !== undefined && valor !== null && valor !== '') {
        params = params.set(key, valor);
      }
    });

    return this.http.get<Turno[]>(`${this.apiUrl}/filters`, { params, headers: this.getHeaders() });
  }
}
