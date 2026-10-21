import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from '../models/doctor.interface';
import { FiltroDoctores } from '../models/filtro-doctores.interface';

@Injectable({
  providedIn: 'root'
})
export class DoctoresService {
  private apiUrl = 'http://localhost:3000/api/doctores';

  private http = inject(HttpClient);

  private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJFbmRvZG9uY2lzdGEiLCJlc0FkbWluIjoxLCJpYXQiOjE3OTI2MDU4MjAsImV4cCI6MTc5MjYxMzAyMH0.As7tCyWdKcNO7hY1yJCWG00ck2qM2ECC8Q5kbrI7-YA';

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
  
  getDoctores(searchTerm: string): Observable<Doctor[]> {
    const params = new HttpParams().set('q', searchTerm);
    return this.http.get<Doctor[]>(this.apiUrl, { headers: this.headers });
  }

  getDoctoresFiltrados(filtros: FiltroDoctores): Observable<Doctor[]> {
    let params = new HttpParams();
    const claves = Object.keys(filtros) as Array<keyof FiltroDoctores>;

    claves.forEach(key => {
      const valor = filtros[key];
      if (valor !== undefined && valor !== null && valor !== '') {
        params = params.set(key, valor);
      }
    });

    return this.http.get<Doctor[]>(`${this.apiUrl}/filters`, { params, headers: this.headers });
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
