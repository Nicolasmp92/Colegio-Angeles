import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Constants } from '../Constants';
import { NgxPopper } from 'angular-popper';
import { createPopper } from "@popperjs/core";



@Component({
  selector: 'barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {

  menus: any[] = []
  audio = new Audio('../../../assets/Audios/Nosotros.m4a');
  volumen: boolean = true;

  pop: string = 'Bienvenido'

  constructor(private router:Router) {
    this.menus = Constants.barraMenu;
    this.volumen = Constants.volumen;
   }

  ngOnInit(): void {
    const button = document.querySelector('#button')!;
      const tooltip = document.querySelector<any>('#tooltip');

      let popperInstance: any = null;

      function create() {
        popperInstance = createPopper(button, tooltip, {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 8],
              },
            },
          ],
        });
      }

      function destroy() {
        if (popperInstance) {
          popperInstance.destroy();
          popperInstance = null;
        }
      }

      function show() {
        tooltip.setAttribute('data-show', '');
        create();
      }

      function hide() {
        tooltip.removeAttribute('data-show');
        destroy();
      }

      const showEvents = ['mouseenter', 'focus'];
      const hideEvents = ['mouseleave', 'blur'];

      showEvents.forEach(event => {
        button.addEventListener(event, show);
      });

      hideEvents.forEach(event => {
        button.addEventListener(event, hide);
      });
  }

  /**
   * obtiene el audio de <a> seleccionado y lo reproduce automaticamente pausando los otros audios de la barra.
   * @param pagina <a> donde se encuentra el mause.
   */
  reproducir(pagina: string){

    this.pop = pagina;
    if(!Constants.volumen){
      return;
    }
    this.audio.pause()
    for (let i = 0; i < this.menus.length; i++) {      
      if(this.menus[i].texto === pagina){
        this.audio = new Audio(this.menus[i].ir);
      }
    }
    this.audio.play();
  }

  /**
   * Pausa la reproduccion del audio de la barra.
   */
  pausar(){
    this.audio.pause();
  }

  /**
   * Realiza un mute de la barra para el audio.
   */
  mute(){
    Constants.volumen = !Constants.volumen;
    this.volumen = Constants.volumen;
  }

}

