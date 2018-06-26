import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TopicPage } from '../topic/topic';
import { Storage } from '@ionic/storage';
import { TopicManager, topic } from '../../providers/topic-manager';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-tagged',
  templateUrl: 'tagged.html',
  providers: [TopicManager]
})
export class TaggedPage {
  topics: topic[];
  NoTopics: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
              public topicManager: TopicManager, public loadingCtrl: LoadingController) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tagged Topics');
  }

  ionViewWillEnter() {
    this.getTaggedTopics();   
    console.log("ionViewWillEnter Tagged Topics")
  }

   doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getTaggedTopics();
    setTimeout(() => {
      console.log('Refresh completed');
      refresher.complete();
    }, 2000);
  }

   topicSelected(t) {
    console.log(`Topic ID is ${t.id}`);
    this.topicManager.getTopicById(t.id).then(topic => {
      console.log(`User selected topic ${topic.title}`)
      this.navCtrl.push(TopicPage, {topic: topic, tagged: false}, {animate: true, direction: 'forward'});
    });
  }

  clearTaggedTopics() {
     this.storage.ready().then(() => {
       this.storage.set("tagged", "");
       this.getTaggedTopics();
     });
  }

  getTaggedTopics() {
      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      })

      loading.present();
       this.storage.ready().then(() => {
       this.topics = new Array<topic>();
       this.NoTopics = true;
       this.storage.get("tagged").then((val) => {
         if(val!="")
         {
           console.log(`Retrieving stored tagged topics: ${val}`);
            var taggedTopics = JSON.parse(val) || [];
            this.topicManager.getTopics().then(topics => {
              for (let tag of taggedTopics) {
                for (let topic of topics) {
                  if(tag != "" && topic.title.toLowerCase().indexOf(tag.toLowerCase()) > -1) {
                    //tagged topic...add to topics list.
                    this.topics.push(topic);
                    console.log(`Pushing topic ${topic.title} onto stack.`);
                    this.NoTopics = false;
                    break;
                  }
              }
            }
          });
        }
      });
    setTimeout(() => {
      loading.dismiss();
    }, 500);
    });
  }
}
