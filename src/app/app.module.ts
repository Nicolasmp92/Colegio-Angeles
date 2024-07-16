import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraComponent } from './componentes/barra/barra.component';
import { NgbModule }  from '@ng-bootstrap/ng-bootstrap';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './componentes/footer/footer.component';
import { ToastComponent } from './componentes/toast/toast.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { AgmCoreModule } from '@agm/core';
import { Pagina1Component } from './componentes/pagina1/pagina1.component';
import { MapaComponent } from './componentes/mapa/mapa.component';
import { NgxPopper } from 'angular-popper';
import { MatriculasComponent } from './componentes/matriculas/matriculas.component';




@NgModule({
  declarations: [
    AppComponent,
    BarraComponent,
    InicioComponent,
    ContactoComponent,
    FooterComponent,
    ToastComponent,
    NosotrosComponent,
    Pagina1Component,
    MapaComponent,
    MatriculasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NoopAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBwib-UdCR97vFgAv2rCmtyIq4XmQtGm90'
    }),
    NgxPopper
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
