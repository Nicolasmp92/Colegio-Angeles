import { Component, OnDestroy, OnInit } from '@angular/core';
import { Constants } from '../Constants';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.css']
})
export class NosotrosComponent implements OnInit, OnDestroy {

  audio = new Audio('../../../assets/Audios/Nosotros.m4a');
  constructor() { }

  ngOnDestroy(): void {
    this.audio.pause();
  }

  ngOnInit(): void {
    this.audio = new Audio('../../../assets/Audios/Nosotros.m4a');
    this.audio.play();
  }


}
