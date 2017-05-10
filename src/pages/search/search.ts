import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TopicManager } from '../../providers/topic-manager';

/**
 * Generated class for the Search page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [TopicManager]
})
export class SearchPage {
  topics: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public topicManager: TopicManager) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Search');
  }

  onInput($event) {
    console.log('searching topics...')
    //TODO:  Execute text search of all topics
    this.topicManager.getTopics().then(topics => {
      this.topics = topics;
    });  
  }

  onCancel($event) {
    console.log("canceling search");
  }

}
