import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OdontologosPageComponent } from './features/odontologos/pages/odontologos-page/odontologos-page.component';
import { TurnosPageComponent } from './features/turnos/pages/turnos-page/turnos-page.component';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { PacientesPageComponent } from './features/pacientes/pages/pacientes-page/pacientes-page.component';
import { OdontologoAltaComponent } from './features/odontologos/components/odontologo-alta/odontologo-alta.component';
import { PacienteAltaComponent } from './features/pacientes/components/paciente-alta/paciente-alta.component';
import { TurnoAltaComponent } from './features/turnos/components/turno-alta/turno-alta.component';
import { RegisterPageComponent } from './features/register/pages/register-page/register-page.component';
import { LoginPageComponent } from './features/login/pages/login-page/login-page.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  // {path: '', component: RegisterPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'odontologos', component: OdontologosPageComponent},
  {path: 'pacientes', component: PacientesPageComponent},
  {path: 'turnos', component: TurnosPageComponent},
  {path: 'turnos-alta', component: TurnoAltaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
