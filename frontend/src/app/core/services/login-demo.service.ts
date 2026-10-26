import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Usuario {
  usuario: string;
  contrasena: string;
}

interface loginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginDemoService {
  private apiUrl: string = 'http://localhost:3000/api/doctores/login-doctor';

  private http = inject(HttpClient);

  login(u: Usuario): Observable<loginResponse> {
    return this.http.post<loginResponse>(this.apiUrl, u);
  }
}
