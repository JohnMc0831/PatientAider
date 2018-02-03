import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TopicManager } from '../../providers/topic-manager'
import { TopicPage } from '../../pages/topic/topic';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import * as _ from 'lodash';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TopicManager]
})
export class HomePage {
topics: any;
alltopics: any;
encounters: any[];
sections: any[];

  constructor(public navCtrl: NavController, public topicManager: TopicManager, public loadingCtrl: LoadingController, public http: Http) {
     let loading = this.loadingCtrl.create({
      content: 'Loading Topics...'
    })

    let processing = this.loadingCtrl.create({
      content: "Processing and Updating Topics..."
    })

    loading.present();

    this.topicManager.getEncounters().then(encounters => {
      this.encounters = encounters;
    });

    // this.topicManager.getTopics().then(topics => {
    //   this.alltopics = topics;
    // });

    // this.topicManager.getSections().then(sections => {
    //   this.sections = sections;
    //   console.log(`loaded ${this.sections.length} sections!`);
    // });

    
    setTimeout(() => {
      loading.dismiss();
      processing.present();
      setTimeout(() => {
        processing.dismiss();
      }, 3000)
    }, 5000);
  }

  topicSelected(i, j, k) {
    console.log(`Topic ID is ${k}`);
    // var topicIndex = _.findIndex(this.alltopics, function(t) {
    //   return t.id == topicId;
    // });
    var topic = this.encounters[i].Sections[j].Topics[k];
    console.log(`User selected topic ${topic.Title}`)
    this.navCtrl.push(TopicPage, {topic: topic, tagged: false}, {animate: true, direction: 'forward'});
  }

  toggleEncounter(i) {
    this.encounters[i].open = !this.encounters[i].open;
  }
  
  toggleSection(i, j) {
    this.encounters[i].Sections[j].open = !this.encounters[i].Sections[j].open;
    //this.sections[i].open = !this.sections[i].open;
  }
 
 doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.topicManager.getEncounters().then(encounters => {
      this.encounters = encounters;
    });
    setTimeout(() => {
      console.log('Refresh completed');
      refresher.complete();
    }, 5000);
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
