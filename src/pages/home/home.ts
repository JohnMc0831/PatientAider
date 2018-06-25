import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TopicManager, encounter, section, topic } from '../../providers/topic-manager'
import { TopicPage } from '../../pages/topic/topic';
import { LoadingController } from 'ionic-angular';
import {Platform} from 'ionic-angular';
import { Http } from '@angular/http';
import * as _ from 'lodash';
import { jsonpFactory } from '../../../node_modules/@angular/http/src/http_module';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [TopicManager]
})
export class HomePage {
topics: any;
alltopics: any;
encounters: encounter[];
sections: any[];
psmImage: string = "assets/images/";

  constructor(public navCtrl: NavController, public topicManager: TopicManager, public loadingCtrl: LoadingController, public http: Http, public platform: Platform) {
     let loading = this.loadingCtrl.create({
      content: 'Loading Topics...'
    })

    let screenWidth: number = platform.width();
    if (screenWidth > 700){
        console.log("Tablet detected!");
        this.psmImage += "Patient_Safety_Movement.png"

    } else {
      console.log("Phone detected!");
      this.psmImage += "Patient_Safety_Movement.png"
    }

    loading.present();

    this.topicManager.getEncounters().then(encounters => {
      console.log('loading topic metadata under sections...');
      this.encounters = encounters;
      this.encounters.forEach(enc => {
        enc.sections.forEach(sect => {
          sect.topics = JSON.parse(sect.sectionTopicOrder) as topic[];
          console.log(`Added ${sect.topics.length} topics to section ${sect.sectionName}`);
          sect.open = false;
        })
      });
    });

    setTimeout(() => {
      loading.dismiss();
    }, 2000);
  }

  parseJson(json) {
    return JSON.parse(json);
  }

  topicSelected(t) {
    console.log(`Topic ID is ${t.Id}`);
    this.topicManager.getTopicById(t.Id).then(topic => {
      console.log(`User selected topic ${topic.title}`)
      this.navCtrl.push(TopicPage, {topic: topic, tagged: false}, {animate: true, direction: 'forward'});
    });
  }

  toggleEncounter(i) {
    this.encounters[i].open = !this.encounters[i].open;
  }
  
  toggleSection(i, j) {
    console.log(`Inside toggleSection ${i} ${j}...`);
    this.encounters[i].sections[j].open = !this.encounters[i].sections[j].open;
    console.log("toggled open state.");
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
