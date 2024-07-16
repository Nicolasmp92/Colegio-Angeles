import { Component,OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private titleService: Title, private metaService: Meta) {}


  ngOnInit(): void {
    this.titleService.setTitle('Colegio Ángeles.');
    this.metaService.addTags([
      {name: "title", content: 'Colegio Ángeles.'},
      {name: 'description', content: 'Colegio Especial Ángeles. Atiende alumnos y alumnas con Necesidades Educativas Especiales derivadas de una discapacidad intelectual, parálisis cerebral, síndrome de down, trastornos de la comunicación.'},
      {name: 'keywords', content: 'Colegio, Especial, Angeles, educacion, Coltauco, Doñihue, Alrededores'}
    ]);
  }
}
