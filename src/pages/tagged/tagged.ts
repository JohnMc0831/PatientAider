import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TopicPage } from '../topic/topic';
import { Storage } from '@ionic/storage';
import { TopicManager } from '../../providers/topic-manager';

/**
 * Generated class for the Tagged page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-tagged',
  templateUrl: 'tagged.html',
  providers: [TopicManager]
})
export class TaggedPage {
  topics: topic[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public topicManager: TopicManager) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tagged Topics');
    this.getTaggedTopics();
  }

   doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getTaggedTopics();
    setTimeout(() => {
      console.log('Refresh completed');
      refresher.complete();
    }, 2000);
  }

   topicSelected(topic) {
    console.log(`User selected topic ${topic.Title}`)
    this.navCtrl.push(TopicPage, {topic: topic, tagged: true}, {animate: true, direction: 'forward'});
  }

  clearTaggedTopics() {
     this.storage.ready().then(() => {
       this.storage.set("tagged", "");
       this.getTaggedTopics();
     });
  }

  getTaggedTopics() {
       this.storage.ready().then(() => {
       this.topics = new Array<topic>();
       this.storage.get("tagged").then((val) => {
         if(val!="")
         {
           console.log(`Retrieving stored tagged topics: ${val}`);
            var taggedTopics = JSON.parse(val) || [];
            this.topicManager.getTopics().then(topics => {
              for (let tag of taggedTopics) {
                for (let topic of topics) {
                  if(tag != "" && topic.Title.toLowerCase().indexOf(tag.toLowerCase()) > -1) {
                    //tagged topic...add to topics list.
                    this.topics.push(topic);
                    console.log(`pushing topic ${topic.Title} onto stack.`);
                    break;
                  }
              }
            }
          });
        }
      });
    });
  }
}

class topic {
      id: number;
      Title: string;
      TitleGerman: string;
      TitleSpanish: string;
      Summary: string;
      SummaryGerman: string;
      SummarySpanish: string;
      Body: string;
      BodyGerman: string;
      BodySpanish: string;
      DisplayOrder: number;
      Icon: string;
      constructor() {}
}
