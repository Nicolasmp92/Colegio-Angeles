import { Component, OnInit } from '@angular/core';
import { Constants } from '../Constants';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  listanav: any[] = []
  litstaContac: any[] = []
  redes: any[] = []

  constructor() {
    this.listanav = Constants.barraMenu;
    this.litstaContac = Constants.listaContacto;
    this.redes = Constants.redesSociales;
  }

  ngOnInit(): void {
  }

}
