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
  topics: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public topicManager: TopicManager) {
    //TODO:  Filter to just tagged topics.


    // this.storage.ready().then(() => {
    //   this.storage.get("tagged").then((val) => {
    //     if(val!=null)
    //     {
    //       var taggedTopics = val.split(',');
          this.topicManager.getTopics().then(topics => {
            this.topics = topics;
          });

    //     }
        
    //   });
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Tagged Topics');
  }

}
