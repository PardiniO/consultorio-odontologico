import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno.interface';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private apiUrl: string = 'http://localhost:3000/api/turnos';
  
    private http = inject(HttpClient);
  
    getAll(): Observable<Turno[]> {
      return this.http.get<Turno[]>(this.apiUrl);
    }
  
    getById(id: number): Observable<Turno> {
      return this.http.get<Turno>(`${this.apiUrl}/${id}`);
    }

    getTurnos(searchTerm: string): Observable<string[]> {
      const params = new HttpParams().set('q', searchTerm);
      return this.http.get<string[]>(this.apiUrl, { params });
    }
  
    create(turno: Omit<Turno, 'id_turno'>): Observable<Turno> {
      return this.http.post<Turno>(this.apiUrl, turno);
    }
  
    update(id: number, turno: Omit<Turno, 'id_turno'>): Observable<Turno> {
      return this.http.put<Turno>(`${this.apiUrl}/${id}`, turno);
    }
  
    remove(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
