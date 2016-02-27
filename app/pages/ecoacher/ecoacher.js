import {Page} from 'ionic-framework/ionic';
import {Http, Headers, RequestOptions} from 'angular2/http';


@Page({
  templateUrl: 'build/pages/ecoacher/ecoacher.html'
})
export class ECoacherPage {
  static get parameters() {
    return [[Http]];
  }

  constructor(http) {
    this.http = http;

    this.comment = {};

    this.commentReadComplete = function(commentJson)
    {
    	console.log(commentJson);
        this.comment = commentJson;
        this.comment.iconSrc = 'img/yellow/' + this.comment.icon + '.png';
    };

    this.getNewComment = function()
    {
        var readItem = null;
        this.http.get('http://hackforgood.sockhost.net:3000/getNewComment').map(res=>res.json())
        .subscribe(
            data => readItem = data,
            err => this.logError(err),
            () => this.commentReadComplete(readItem)
        );
    };

    this.getNewComment();

  }

}
