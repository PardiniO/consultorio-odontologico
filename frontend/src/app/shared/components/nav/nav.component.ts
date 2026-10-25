import { Component, inject, OnInit } from '@angular/core';
import { LoginDemoService } from '../../../core/services/login-demo.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  haIniciadoSesion: boolean = false;

  private loginService = inject(LoginDemoService);

  u = {
    usuario: 'root23',
    contrasena: 'root23'
  }

  ngOnInit(): void {
    const token: string | null = sessionStorage.getItem('token');

    if (token) {
      this.haIniciadoSesion = true;
    }
  }

  iniciarSesion(): void {
    this.loginService.login(this.u).subscribe({
      next: (log) => {
        console.log('EL LOGIN TIRA ESTO:', log);
        this.haIniciadoSesion = true;
        
        sessionStorage.setItem('token', log.token);
        console.log(log.token);
        console.log('ACA ESTA EL TOKEN:', sessionStorage.getItem('token'));
      }
    });
  }
}
