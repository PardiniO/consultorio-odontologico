import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {
  private apiUrl = 'http://localhost:3000/api/doctores';

  private http = inject(HttpClient);

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJFbmRvZG9uY2lzdGEiLCJlc0FkbWluIjoxLCJpYXQiOjE3OTI0MjEzMTUsImV4cCI6MTc5MjQyODUxNX0.VW2FTc0oePZZjHchIqHuvCyUaVaAa2U6HndNHgFwrB8'
  });

  getAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl, { headers: this.headers });
  }

  getById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  getByName(name: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/by-names/${name}`, { headers: this.headers });
  }

  create(doctor: Omit<Doctor, 'id_doctor'>): Observable<Doctor> {
    return this.http.post<Doctor>(this.apiUrl, doctor, { headers: this.headers });
  }

  update(id: number, doctor: Omit<Doctor, 'id_doctor'>): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, doctor, { headers: this.headers });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
