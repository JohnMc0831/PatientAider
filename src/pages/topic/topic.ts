import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.topic = this.navParams.get("topic");
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
    console.log('tearing down css!!!');
    this.banner = "";
    this.htmlBody = "";
    this.topicBody = "";
    $("#topicBody").empty();
  }

}
