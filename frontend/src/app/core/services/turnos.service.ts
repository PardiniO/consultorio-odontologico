import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Turno } from '../models/turno.interface';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private apiUrl: string = 'http://localhost:3000/api/turnos';
  
  private http = inject(HttpClient);
  
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciJJJOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJFbmRvZG9uY2lzdGEiLCJlc0FkbWluIjowLCJpYXQiOjE3OTIzNTE4MDksImV4cCI6MTc5MjM1OTAwOX0.vo8jVDi31pvZi_F-Xl9tLBhdjgQPYB1L89rd67-k1ns'
  });

  getAll(): Observable<Turno[]> {
    return this.http.get<Turno[]>(this.apiUrl, { headers: this.headers });
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
