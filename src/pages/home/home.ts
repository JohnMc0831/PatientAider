import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TopicManager } from '../../providers/topic-manager'
import { TopicPage } from '../../pages/topic/topic';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TopicManager]
})
export class HomePage {
topics: {};

  constructor(public navCtrl: NavController, public topicManager: TopicManager) {
    this.topicManager.getTopics().then(topics => {
      this.topics = topics;
    });  
  }

  topicSelected(topic) {
    console.log(`User selected topic ${topic.Title}`)
  this.navCtrl.push(TopicPage, {topic: topic}, {animate: true, direction: 'forward'});
  }
}
