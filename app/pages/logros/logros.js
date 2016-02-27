import {Page} from 'ionic-framework/ionic';


@Page({
  templateUrl: 'build/pages/logros/logros.html'
})
export class LogrosPage {
	constructor() {

      this.slides = [
        {
          title: "Visita de amigos",
          description: "Has conseguido visitar <b>2 amigos</b> en menos de <b>24 horas</b>. Ellos te lo agradecerán.",
          image: "img/logros/visita-amigos.png",
        },
        {
          title: "Vete de paseo",
          description: "Has dado un paseo de <b>2 kilómetros</b> en menos de <b>5 horas</b>. ¿Repetimos?",
          image: "img/logros/paseo.png",
        },
        {
          title: "No toques el móvil",
          description: "Has estado <b>1 hora</b> sin utilizar el teléfono móvil. ¿Ha sido productiva la experiencia?",
          image: "img/logros/no-movil.png",
        },
        {
          title: "Nuevos amigos",
          description: "Has conseguido <b>1 nueva amistad</b> en menos de <b>1 semana</b>. Siempre se aprende algo nuevo de cada persona...",
          image: "img/logros/nuevos-amigos.png",
        }
      ];

    }
}
