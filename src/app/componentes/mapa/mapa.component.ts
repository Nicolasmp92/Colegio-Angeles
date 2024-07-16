import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mapa-cole',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  lat: number = -34.2895198;
  lng: number = -71.0856033;
  label: string = '';
  zoom: number = 15;

}
