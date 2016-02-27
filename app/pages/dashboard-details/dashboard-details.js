import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {Http, Headers, RequestOptions} from 'angular2/http';
import {Inject} from 'angular2/core';


@Page({
  templateUrl: 'build/pages/dashboard-details/dashboard-details.html'
})
export class DashboardDetailsPage {
  static get parameters() {
    return [[NavController], [NavParams], [Http]];
  }

  constructor(nav, navParams, http) {
    this.nav = nav;
    this.http = http;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.updateDone = function(data)
    {
      console.log('actualizado.');
    }
  }

  imageTap(event, item)
  {
    var rdata;

    if (item.completado < 100)
      item.completado += 25;
    this.http.get('http://hackforgood.sockhost.net:3000/setChallengeCompleted?objectID='+item.uid+'&completado='+item.completado)
        .map(res=>res.json())
    .subscribe(
      data => rdata = data,
      err => this.logError(err),
      () => this.updateDone(rdata)
    );
  }
}

