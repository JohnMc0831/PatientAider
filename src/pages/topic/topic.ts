import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';

/**
 * Generated class for the Topic page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html',
})
export class TopicPage {
  topic: any;
  topicBody: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.topic = this.navParams.get("topic");
      $("#topicTitle").html(this.topic.Title);
      this.topicBody = this.topic.Body;
  }

  ionViewDidLoad() {
    console.log(`ionViewDidLoad Topic: ${this.topic.Title}`);

  }

}
