import { Component, OnDestroy, OnInit } from '@angular/core';
import { Constants } from '../Constants';
// import {Injectable} from "@angular/core";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {
   vermas: any;

   matriculas: string = "/matriculas";
   galeria: any[] = []

  audio = new Audio('../../../assets/Audios/Bienvenidos.m4a');
  constructor() { 
    this.galeria = Constants.galeriaFull;
  }
  ngOnDestroy(): void {
    //this.audio.pause();
  }

  ngOnInit(): void {
    //this.audio.play();
  }

}

