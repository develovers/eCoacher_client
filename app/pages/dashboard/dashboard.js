import {Page, NavController, NavParams} from 'ionic-framework/ionic';
import {Inject} from 'angular2/core';
import {DashboardDetailsPage} from '../dashboard-details/dashboard-details';


@Page({
  templateUrl: 'build/pages/dashboard/dashboard.html'
})
export class DashboardPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;

    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for(let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
     this.nav.push(ItemDetailsPage, {
       item: item
     });
  }
}
