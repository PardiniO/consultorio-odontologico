import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OdontologosPageComponent } from './features/odontologos/pages/odontologos-page/odontologos-page.component';
import { TurnosPageComponent } from './features/turnos/pages/turnos-page/turnos-page.component';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { PacientesPageComponent } from './features/pacientes/pages/pacientes-page/pacientes-page.component';
import { OdontologoAltaComponent } from './features/odontologos/components/odontologo-alta/odontologo-alta.component';

const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'odontologos', component: OdontologosPageComponent},
  {path: 'odontologos-alta', component: OdontologoAltaComponent},
  {path: 'pacientes', component: PacientesPageComponent},
  {path: 'turnos', component: TurnosPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
