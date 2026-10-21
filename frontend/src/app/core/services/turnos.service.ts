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

  private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJFbmRvZG9uY2lzdGEiLCJlc0FkbWluIjoxLCJpYXQiOjE3OTI2MDU4MjAsImV4cCI6MTc5MjYxMzAyMH0.As7tCyWdKcNO7hY1yJCWG00ck2qM2ECC8Q5kbrI7-YA';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  getAll(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl, { headers: this.headers });
  }

  getById(id: number): Observable<Turno> {
    return this.http.get<Turno>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  create(turno: Omit<Turno, 'id'>): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno, { headers: this.headers });
  }

  update(id: number, turno: Omit<Turno, 'id'>): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}/${id}`, turno, { headers: this.headers });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
    
  getTurnos(searchTerm: string): Observable<string[]> {
    const params = new HttpParams().set('q', searchTerm);
    return this.http.get<string[]>(this.apiUrl, { headers: this.headers });
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

    return this.http.get<Turno[]>(`${this.apiUrl}/filters`, { params, headers: this.headers });
  }
}
