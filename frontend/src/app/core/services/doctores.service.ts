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

  private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJFbmRvZG9uY2lzdGEiLCJlc0FkbWluIjoxLCJpYXQiOjE3OTI0NDIzMjEsImV4cCI6MTc5MjQ0OTUyMX0.YXhajXlgBtb6js-cvYr6awINgUtw2ZHjwomHfFt_trE';

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.token}`
  });

  getAll(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl, { headers: this.headers });
  }

  getById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }

  getByName(name: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/by-user/${name}`, { headers: this.headers });
  }

  register(doctor: Omit<Doctor, 'id_doctor'>): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.apiUrl}/registrar-doctor`, doctor, { headers: this.headers });
  }

  update(id: number, doctor: Omit<Doctor, 'id_doctor'>): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, doctor, { headers: this.headers });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.headers });
  }
}
