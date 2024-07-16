
export abstract class Constants {


  static readonly barraMenu: any[] = [
    { texto: 'Bienvenido', url: '/home' , ir: '../../../assets/Audios/Ir/IrHome.m4a', id: 'b1'},
    { texto: 'Matrículas', url: '/matriculas', ir: '../../../assets/Audios/Ir/IrContacto.m4a', id: 'b4' }
  ]

  static readonly galeriaFull: any[] = [
    {url: '../../../assets/01.jpg'},
    {url: '../../../assets/galeria/01.jpg'},{url: '../../../assets/galeria/02.jpg'},
    {url: '../../../assets/galeria/03.jpg'},{url: '../../../assets/galeria/04.jpg'},
    {url: '../../../assets/galeria/05.jpg'},{url: '../../../assets/galeria/06.JPG'},
    {url: '../../../assets/galeria/07.JPG'},{url: '../../../assets/galeria/08.JPG'},
    {url: '../../../assets/galeria/09.JPG'},{url: '../../../assets/galeria/10.JPG'},
    {url: '../../../assets/galeria/11.JPG'},{url: '../../../assets/galeria/12.JPG'},
    {url: '../../../assets/galeria/13.JPG'},{url: '../../../assets/galeria/14.JPG'},
    {url: '../../../assets/galeria/15.JPG'},{url: '../../../assets/galeria/16.JPG'}
  ]

  static readonly listaContacto: any[] = [
    { dato: 'contacto@colegioangeles.cl', icono: 'bi bi-envelope', isLink: true, link: 'mailto:contacto@colegioangeles.cl?subject=Cotización' },
    { dato: '+56 9 8470 6827', icono: 'bi bi-telephone', isLink: false, link: '' },
    { dato: '+56 9 8470 6827', icono: 'bi bi-whatsapp', isLink: true, link: 'https://wa.me/56984706827' }
  ]

  static readonly redesSociales: any[] = [
    { icono: 'bi bi-twitter', link: 'https://twitter.com/intent/tweet?url=https://www.colegioangeles.cl/' },
    { icono: 'bi bi-facebook', link: 'https://www.facebook.com/sharer/sharer.php?s=100&u=https://www.colegioangeles.cl/' },
    { icono: 'bi bi-linkedin', link: 'https://www.linkedin.com/shareArticle/?mini=true&url=https://www.colegioangeles.cl/' },
    { icono: 'bi bi-whatsapp', link: 'https://api.whatsapp.com/send?text=https://www.colegioangeles.cl/' }
  ]

  public static volumen: boolean = false;

}
