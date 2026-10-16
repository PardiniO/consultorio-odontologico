import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TurnosPageComponent } from './features/turnos/pages/turnos-page/turnos-page.component';
import { TurnoCardComponent } from './features/turnos/components/turno-card/turno-card.component';
import { OdontologosPageComponent } from './features/odontologos/pages/odontologos-page/odontologos-page.component';
import { OdontologoAltaComponent } from './features/odontologos/components/odontologo-alta/odontologo-alta.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/components/header/header.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { RouterLink, RouterModule } from '@angular/router';
import { OdontologoCardComponent } from './features/odontologos/components/odontologo-card/odontologo-card.component';
import { OdontologoModificarComponent } from './features/odontologos/components/odontologo-modificar/odontologo-modificar.component';
import { provideHttpClient } from '@angular/common/http';
import { PacienteCardComponent } from './features/pacientes/components/paciente-card/paciente-card.component';
import { PacienteModificarComponent } from './features/pacientes/components/paciente-modificar/paciente-modificar.component';
import { PacienteAltaComponent } from './features/pacientes/components/paciente-alta/paciente-alta.component';
import { PacientesPageComponent } from './features/pacientes/pages/pacientes-page/pacientes-page.component';
import { HomeButtonComponent } from './shared/components/home-button/home-button.component';
import { TurnoAltaComponent } from './features/turnos/components/turno-alta/turno-alta.component';
import { TurnoModificarComponent } from './features/turnos/components/turno-modificar/turno-modificar.component';

@NgModule({
  declarations: [
    AppComponent,
    TurnosPageComponent,
    TurnoCardComponent,
    OdontologosPageComponent,
    OdontologoAltaComponent,
    HeaderComponent,
    NavComponent,
    HomeComponent,
    HomePageComponent,
    OdontologoCardComponent,
    OdontologoModificarComponent,
    PacienteCardComponent,
    PacienteModificarComponent,
    PacienteAltaComponent,
    PacientesPageComponent,
    HomeButtonComponent,
    TurnoAltaComponent,
    TurnoModificarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
