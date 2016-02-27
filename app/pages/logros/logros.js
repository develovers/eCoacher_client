import {Page} from 'ionic-framework/ionic';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Inject} from 'angular2/core';


@Page({
  templateUrl: 'build/pages/logros/logros.html'
})
export class LogrosPage {
    static get parameters()
    {
      return [[Http]]
    }

	constructor(http) {

      this.http = http;
      this.slides = [];
        /*{
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
      ];*/

      this.numberOfAcceptedChallengesReceived = function(countJson)
      {
        for(let i = 0; i < countJson.count; i++)
        {
            var readItem = null;
            this.http.get('http://hackforgood.sockhost.net:3000/getAcceptedChallenge?index='+i).map(res=>res.json())
            .subscribe(
                data => readItem = data,
                err => this.logError(err),
                () => this.challengeReadComplete(readItem)
            );
        };
      };

      this.challengeReadComplete = function(challengeJson)
      {
        if (challengeJson.completado == 100)
        {
          console.dir(challengeJson);
          this.slides.push({
            title: challengeJson.titulo,
            description: "<b>Nuevo logro:</b><br/>" + challengeJson.titulo + " (" + challengeJson.accion+" " + challengeJson.objetivo + " "+ challengeJson.unidades + ")<br/>" + challengeJson.conseguido,
            image: "img/logros/"+challengeJson.imagen + ".png"
          });
        }
      };

      var rdata;
      this.http.get('http://hackforgood.sockhost.net:3000/getNumberOfAcceptedChallenges').map(res=>res.json())
      .subscribe(
            data => rdata = data,
            err => this.logError(err),
            () => this.numberOfAcceptedChallengesReceived(rdata)
      );
    }
}
