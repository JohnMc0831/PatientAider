import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TopicManager } from '../../providers/topic-manager'
import { TopicPage } from '../../pages/topic/topic';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TopicManager]
})
export class HomePage {
topics: any;

  constructor(public navCtrl: NavController, public topicManager: TopicManager, public loadingCtrl: LoadingController) {
     let loading = this.loadingCtrl.create({
      content: 'Loading Topics...'
    })

    loading.present();
    this.topicManager.getTopics().then(topics => {
      this.topics = topics;
    });
     
    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  topicSelected(topic) {
    console.log(`User selected topic ${topic.Title}`)
  this.navCtrl.push(TopicPage, {topic: topic, tagged: false}, {animate: true, direction: 'forward'});
}

 doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.topicManager.getTopics().then(topics => {
      this.topics = topics;
    });  
    setTimeout(() => {
      console.log('Refresh completed');
      refresher.complete();
    }, 2000);
  }

  onInput($event) {
      //Filter list on string match
      // set val to the value of the searchbar
      console.log("searching...")
    let val = $event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.topics = this.topics.filter((topic) => {
        return (topic.Title.toLowerCase().indexOf(val.toLowerCase()) > -1 || topic.Body.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.topicManager.getTopics().then(topics => {
        this.topics = topics;
      });
    }
  }

  onCancel($event) {
    console.log("Cancelling search....");
    this.topicManager.getTopics().then(topics => {
      this.topics = topics;
    });
  }

  onClear($event) {
    console.log("Cancelling search....");
    this.topicManager.getTopics().then(topics => {
      this.topics = topics;
    });
  }
}
