import {Page, NavController, NavParams} from 'ionic-framework/ionic';


@Page({
  templateUrl: 'build/pages/dashboard-details/dashboard-details.html'
})
export class DashboardDetailsPage {
  static get parameters() {
    return [[NavController], [NavParams]];
  }

  constructor(nav, navParams) {
    this.nav = nav;
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
  }
}
