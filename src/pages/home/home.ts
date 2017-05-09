import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TopicManager } from '../../providers/topic-manager'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TopicManager]
})
export class HomePage {

  constructor(public navCtrl: NavController, public topicManager: TopicManager) {

  }

  getTopics() {
    var topics = this.topicManager.getTopics();
  }

}
