import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Inject} from 'angular2/core';
import {DashboardDetailsPage} from '../dashboard-details/dashboard-details';
import 'rxjs/Rx';

@Page({
  templateUrl: 'build/pages/dashboard/dashboard.html'
})
export class DashboardPage {
  static get parameters() {
    return [[NavController], [NavParams], [Http]];
  }

  constructor(nav, navParams, http) {
    this.nav = nav;
    this.http = http;

    this.icons = "";

    this.challengeReadComplete = function(challengeJson)
    {
        if (challengeJson.completado < 100) {
          challengeJson.iconoSrc = 'img/retos/' + challengeJson.icono + '.png';
          this.items.push(challengeJson);
        }

        this.completeListOfItems.push(challengeJson);
    };

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

    this.updateChallengesList = function(readItem)
    {
        this.completeListOfItems = [];
        this.items = [];
        var rdata;
        this.http.get('http://hackforgood.sockhost.net:3000/getNumberOfAcceptedChallenges').map(res=>res.json())
            .subscribe(
                data => rdata = data,
                err => this.logError(err),
                () => this.numberOfAcceptedChallengesReceived(rdata)
            );
    };

    this.newChallengeAccepted = function(info)
    {
        var readItem;
      this.http.get('http://hackforgood.sockhost.net:3000/getAcceptedChallenge?index='+this.completeListOfItems.length).map(res=>res.json())
      .subscribe(
          data => readItem = data,
          err => this.logError(err),
          () => this.challengeReadComplete(readItem)
      );
    };

    this.newChallengeReceived = function(challengeJson)
    {
        //TODO: Mostrar una nueva vista para aceptar o rechazar el reto?
        //Solucion temporal: lo aceptamos directamente y volvemos a listar los retos.
        var readItem;

        this.http.get('http://hackforgood.sockhost.net:3000/acceptNewChallenge?challengeJSON='+JSON.stringify(challengeJson)).map(res=>res.json())
            .subscribe(
                data => readItem = data,
                err => this.logError(err),
                () => this.newChallengeAccepted(readItem)
            );

    };

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');



    this.completeListOfItems = [];
    this.items = [];

    var rdata;
    this.http.get('http://hackforgood.sockhost.net:3000/getNumberOfAcceptedChallenges').map(res=>res.json())
        .subscribe(
              data => rdata = data,
              err => this.logError(err),
              () => this.numberOfAcceptedChallengesReceived(rdata)
        );
  }

  itemTapped(event, item) {
     this.nav.push(DashboardDetailsPage, {
       item: item
     });
  }

  newChallenge(event) {
      var rdata;
      this.http.get('http://hackforgood.sockhost.net:3000/getNewChallenge').map(res=>res.json())
    .subscribe(
            data => rdata = data,
            err => this.logError(err),
            () => this.newChallengeReceived(rdata)
    );
  }

  completed(event, item)
  {
      var rdata;
      this.http.get('http://hackforgood.sockhost.net:3000/setChallengeCompleted?objectID='+item.uid)
          .map(res=>res.json())
          .subscribe(
              data => rdata = data,
              err => this.logError(err),
              () => this.updateChallengesList(rdata)
          );
  }

  remove(event, item)
  {
      var rdata;
      this.http.get('http://hackforgood.sockhost.net:3000/removeChallenge?objectID='+item.uid)
          .map(res=>res.json())
          .subscribe(
              data => rdata = data,
              err => this.logError(err),
              () => this.updateChallengesList(rdata)
          );
  }
}
