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

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
          'american-football', 'boat', 'bluetooth', 'build'];

    this.challengeReadComplete = function(challengeJson)
    {
        challengeJson.icono = this.icons[Math.floor(Math.random() * this.icons.length)];

        this.items.push(challengeJson);
    }


    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');



    this.items = [];
    for(let i = 1; i < 11; i++)
    {
        var readItem = null;
        http.get('http://hackforgood.sockhost.net:3000/getChallenge').map(res=>res.json())
            .subscribe(
                data => readItem = data,
                err => this.logError(err),
                () => this.challengeReadComplete(readItem)
            );

    };


  }

  itemTapped(event, item) {
     this.nav.push(DashboardDetailsPage, {
       item: item
     });
  }
}
