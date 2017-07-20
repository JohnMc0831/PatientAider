import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';

/**
 * Generated class for the Topic page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-topic',
  templateUrl: 'topic.html',
})
export class TopicPage {
  htmlBody: SafeHtml;
  banner: string;
  topic: any;
  topicBody: string;
  tagged: boolean;
  tagUntag: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private domSanitizer: DomSanitizer, private platform: Platform) {
      platform.ready().then(() => {    
        this.platform.pause.subscribe(() => {
            console.log('App paused');
        });

        this.platform.resume.subscribe(() => {
            console.log('App resumed');
        });
    });
      this.topic = this.navParams.get("topic");
      this.tagUntag = this.isTopicTagged(this.topic) ? "Untag" : "Tag";
      $("#topicTitle").html(this.topic.Title);
      this.banner = "<a href='http://patientsafetymovement.org/'><img src='https://virgil.ftltech.org/Content/PatientSafetyMovement-phone.png' style='margin:auto;display:block' alt='Patient Safety Movement' title='Patient Safety Movement'/></a>";
      this.topicBody =  "<!DOCTYPE html><html lang='en' xmlns='http://www.w3.org/1999/xhtml'>" +
	                          "<head><meta charset='utf-8' /><title></title>" +
                              "<link rel='stylesheet' title='bootstrapSheet' type='text/css' href='https://virgil.ftltech.org/Content/bootstrap.css'>" +
	                          "<link rel='stylesheet' title='flattySheet' type='text/css' href='https://virgil.ftltech.org/Content/flatty.css'>" +
	                          "</head><body>" + this.banner + this.topic.Body + "</body></html>";
      //this.topicBody = this.htmlBody;
      this.htmlBody = domSanitizer.bypassSecurityTrustHtml(this.topicBody);
  }

  isTopicTagged(topic) {
     this.storage.ready().then(() => {
      this.storage.get("tagged").then((val) => {
        if(val!="" && val != null && val != []) {
          var taggedTopics = JSON.parse(val) || [];
          for (let t of taggedTopics) {
            if(t.indexOf(topic.Title) > -1) {
              console.log(`Topic ${topic.Title} is tagged.`);
              this.tagUntag = "Untag";
              return true;
            }  
          }
        }
        console.log(`Topic ${topic.Title} is NOT tagged.`);
        return false;
      });
     });
  }

  toggleTagState(topic) {
    let taggedTopics:string[] = Array<string>();
    let newTags:string[] = Array<string>();
    this.storage.ready().then(() => {
    this.storage.get("tagged").then((val) => {
      if(val!="" && val != null && val != []) {
        taggedTopics = JSON.parse(val) || [];
      } else {
          console.log(`Topic Tagged State: UNTAGGED - STORAGE EMPTY`);
          //tag the topic add it to storage
          taggedTopics.push(topic.Title);
          this.tagUntag = "Untag";
          this.storage.set("tagged", JSON.stringify(taggedTopics));
          console.log(`Tagged topic ${topic.Title}`);
          return;
      }
      if(val.indexOf(topic.Title) > -1) {
        console.log(`Topic Tagged State: TAGGED`);
        //untag the topic (remove it from storage)
        for (let t of taggedTopics) {
          if(t.indexOf(topic.Title) == -1) {
            newTags.push(topic.Title);
          }
        }
        this.tagUntag = "Tag";
        this.storage.set("tagged", JSON.stringify(newTags));
        console.log(`storage: ${JSON.stringify(newTags)}`);
        console.log(`Untagged topic ${topic.Title}`);
      } else {
        console.log(`Topic Tagged State: UNTAGGED`);
        //tag the topic add it to storage
        taggedTopics.push(topic.Title);
        this.tagUntag = "Untag";
        this.storage.set("tagged", JSON.stringify(taggedTopics));
        console.log(`Tagged topic ${topic.Title}`);
      }
    });
  });
}

  ionViewDidLoad() {
    console.log(`ionViewDidLoad Topic: ${this.topic.Title}`);
  }

  ionViewWillLeave() {
    console.log(`ionViewWillLeave Topic: ${this.topic.Title}`);
    console.log('tearing down css!!! RAWWRRR!!!!!');
    $('link[title="bootstrapSheet"]').prop('disabled', 'disabled');
    $('link[title="flattySheet"]').prop('disabled', 'disabled');
    $('link[title="bootstrapSheet"]').remove();
    $('link[title="flattySheet"]').remove();
  }
}
