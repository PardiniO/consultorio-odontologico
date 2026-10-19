import { HttpClient, HttpHeaders } from '@angular/common/http';
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
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJFbmRvZG9uY2lzdGEiLCJlc0FkbWluIjoxLCJpYXQiOjE3OTI0MjEzMTUsImV4cCI6MTc5MjQyODUxNX0.VW2FTc0oePZZjHchIqHuvCyUaVaAa2U6HndNHgFwrB8'
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
}
