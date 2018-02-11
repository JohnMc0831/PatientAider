import { TopicManager } from './../../providers/topic-manager';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import { PopoverController } from 'ionic-angular';
import { PopoverPage } from '../popover/popover'

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
  footnotes: string[] = new Array();
  public allfootnotes: object;
  constructor(public navCtrl: NavController, public navParams: NavParams, private domSanitizer: DomSanitizer, 
                              public storage: Storage, private platform: Platform, public popoverCtrl: PopoverController, public topicManager: TopicManager) { 
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
      //this.banner = "<a href='http://patientsafetymovement.org/'><img src='https://virgil.ftltech.org/Content/PatientSafetyMovement-phone.png' style='margin:auto;display:block' alt='Patient Safety Movement' title='Patient Safety Movement'/></a>";
      this.topicBody =  //"<!DOCTYPE html><html lang='en' xmlns='http://www.w3.org/1999/xhtml'>" +
	                      //    "<head><meta charset='utf-8' /><title></title>" +
                              "<link rel='stylesheet' title='bootstrapSheet' type='text/css' href='https://virgil.ftltech.org/Content/bootstrap.css'>" +
                            "<link rel='stylesheet' title='flattySheet' type='text/css' href='https://virgil.ftltech.org/Content/flatty.css'>" +
                            "<link rel='stylesheet' title='bigfootSheet' type='text/css' href='https://virgil.ftltech.org/Content/bigfoot-default.css'>" +
                            "</head><body>" + this.topic.Body + "</body></html>";
      this.htmlBody = domSanitizer.bypassSecurityTrustHtml(this.topicBody);
  }

  presentPopover(myEvent, supText) {
    let popover = this.popoverCtrl.create(PopoverPage, supText);
    popover.present({
      ev: myEvent
    });
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
  
  toggleFootnotes(event) {
    if($("#footnotes").hasClass("hidden")) {
      $("#footnotes").removeClass("hidden");
      console.log("Showing footnotes!");
    } else {
      $("#footnotes").addClass("hidden");
      console.log("Hiding footnotes!");
    console.log("toggled Show/Hide Footnotes");
    } 
  }

  ionViewDidLoad() { 
    var pg = this;
    let allnotes: any;
    this.topicManager.getFootnotes().then(footnotes => {
      allnotes = footnotes["footnotes"].replace("<ol>", "").replace("</ol>", "");
      console.log(`enumerateFootnotes is evaluating Topic: ${this.topic.Title}`);
      var i = 1
      $("#footnotes").empty().html(allnotes);
      $("#footnotes > li").each(function(index, item) {
        pg.footnotes.push(item);
        console.log(`Pushed item #${index} onto the footnotes array...`);
        i++;
      });
      console.log(`added a total of ${i} footnotes to footnotes array!`);
      $("#footnotes").addClass("hidden");
    });

    $('a').bind("click", function(e) {
      e.preventDefault();
      var url = $(this).attr('href');
      window.open(encodeURI(url), '_system', 'location=yes');
    });
    
    $("sup").bind("click", function() {
      var notes = $(this).text();
      var notesList = notes.split(',');
      var note = "";
      var popupText = "";
      $.each(notesList, function(index, item) {
        item = item.trim();
        if(item.indexOf("-") > -1 ) {
          //a continuous list of notes like 62-67...
          var thisNoteText = "";
          var lowEnd = +item.substring(0, item.indexOf("-"));
          var highEnd = +item.substring(item.indexOf("-") + 1);
          for (let index = lowEnd; index < highEnd + 1; index++) {
            note = pg.footnotes[index - 1];
            thisNoteText = $(note).html();
            var noteText = `<p class='footnote'>${index}. ${thisNoteText}</p>`;
            popupText += noteText;
          }
        } else {
          item = +item.trim();
          note = "";
          try {
            note = pg.footnotes[item - 1];
            thisNoteText = $(note).html();
            if(thisNoteText.indexOf(`<p class="bodytext">`) > - 1) {
              thisNoteText = thisNoteText.replace(`<p class="bodytext">`, "");
              thisNoteText = thisNoteText.replace(`</p>`, "");
              thisNoteText = thisNoteText.replace("<strong>", "").replace("</strong>", "");
            }
            popupText += `<p class='footnote'>${item}. ${thisNoteText}</p>`;
          } catch (error) {
            popupText += `<p ion-item color="danger" class='footnote'>No matching footnote found!</p>`;
            console.error("No matching footnote found!");
          }
        }
      });
      console.log(popupText);
      var navObj = {
        text: popupText
      }
      let popover = pg.popoverCtrl.create(PopoverPage, navObj);
      popover.present();
    });
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


