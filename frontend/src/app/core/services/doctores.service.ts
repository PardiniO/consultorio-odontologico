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

  private getHeaders(): HttpHeaders {
    const token: string | null = sessionStorage.getItem('token') || '';
    const headers = new HttpHeaders ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log(headers.get('Authorization'));
    return headers;
  }

  getAll(): Observable<Doctor[]> {
    console.log(this.getHeaders());
    return this.http.get<Doctor[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getById(id: number): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  
  getDoctores(searchTerm: string): Observable<Doctor[]> {
    const params = new HttpParams().set('q', searchTerm);
    return this.http.get<Doctor[]>(this.apiUrl, { headers: this.getHeaders() });
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

    return this.http.get<Doctor[]>(`${this.apiUrl}/filters`, { params, headers: this.getHeaders() });
  }

  getByName(name: string): Observable<Doctor> {
    return this.http.get<Doctor>(`${this.apiUrl}/by-user/${name}`, { headers: this.getHeaders() });
  }

  register(doctor: Omit<Doctor, 'id_doctor'>): Observable<Doctor> {
    return this.http.post<Doctor>(`${this.apiUrl}/registrar-doctor`, doctor, { headers: this.getHeaders() });
  }

  update(id: number, doctor: Omit<Doctor, 'id_doctor'>): Observable<Doctor> {
    return this.http.put<Doctor>(`${this.apiUrl}/${id}`, doctor, { headers: this.getHeaders() });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
