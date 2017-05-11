import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../tabs/tabs';
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
  htmlBody: string;
  banner: string;
  topic: any;
  topicBody: string;
  tagged: boolean;
  tagUntag: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
      this.topic = this.navParams.get("topic");
      this.tagged = this.navParams.get("tagged");
      this.tagUntag = this.tagged ? "Untag" : "Tag";
      $("#topicTitle").html(this.topic.Title);
      this.banner = "<a href='http://patientsafetymovement.org/'><img src='https://virgil.ftltech.org/Content/PatientSafetyMovement-phone.png' style='margin:auto;display:block' alt='Patient Safety Movement' title='Patient Safety Movement'/></a>";
      this.htmlBody = "<!DOCTYPE html><html lang='en' xmlns='http://www.w3.org/1999/xhtml'>" +
	                          "<head><meta charset='utf-8' /><title></title>" +
                              "<link rel='stylesheet' type='text/css' href='https://virgil.ftltech.org/Content/bootstrap.css'>" +
	                          "<link rel='stylesheet' type='text/css' href='https://virgil.ftltech.org/Content/flatty.css'>" +
	                          "</head><body>" + this.banner + this.topic.Body + "</body></html>";
      this.topicBody = this.htmlBody;
  }

  ionViewDidLoad() {
    console.log(`ionViewDidLoad Topic: ${this.topic.Title}`);
  }

  ionViewWillLeave() {
    console.log(`ionViewWillLeave Topic: ${this.topic.Title}`);
    console.log('tearing down css!!! RAWWRRR!!!!!');
    this.banner = "";
    this.htmlBody = "";
    this.topicBody = "";
    $("#topicBody").empty();
  }

  topicTagged(topic) {
    let alreadyTagged: boolean = false;
    this.storage.ready().then(() => {
      this.storage.get("tagged").then((val) => {
        if(val!="" && val != null && val != []) {
          var taggedTopics = JSON.parse(val) || [];
          for (let t of taggedTopics) {
            if(t.toLowerCase().indexOf(topic.toLowerCase()) > -1) {
              console.log(`Topic ${topic} is already tagged.`);
              alreadyTagged = true;
            }  
          }
          if(!alreadyTagged) {
            console.log(`Tagging ${topic}`);
            taggedTopics.push(topic);
          }
          this.storage.set("tagged", JSON.stringify(taggedTopics));
          console.log(`wrote ${JSON.stringify(taggedTopics)} to storage.`);
        } else {
          let newtag: string[] = new Array<string>();
          newtag.push(topic);
          this.storage.set("tagged", JSON.stringify(newtag));
          console.log(`wrote new tagged topic ${JSON.stringify(taggedTopics)} to storage (first write).`);
        }  
        this.navCtrl.push(TabsPage, null, {animate: true, direction: 'backward'});
      });
    });
  }
}
