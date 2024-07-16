import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MatriculasComponent } from './componentes/matriculas/matriculas.component';
import { NosotrosComponent } from './componentes/nosotros/nosotros.component';
import { Pagina1Component } from './componentes/pagina1/pagina1.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'pagina1', component: Pagina1Component },
  { path: 'matriculas', component: MatriculasComponent },
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
