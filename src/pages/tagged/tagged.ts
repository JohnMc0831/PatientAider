import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    this.getTaggedTopics();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tagged Topics');
  }

   doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getTaggedTopics();
    setTimeout(() => {
      console.log('Refresh completed');
      refresher.complete();
    }, 2000);
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
         if(val!=null)
         {
            let taggedTopics: string[] = JSON.parse(val);
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
