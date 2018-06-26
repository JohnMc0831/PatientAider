import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class TopicManager {
  baseUrl:  string; 
  topics: topic[];
  encounters: encounter[];
  sections: section[];
  // opts: RequestOptions;
  public footnotes: Object;

  constructor(public http: Http) {
    console.log('Hello TopicManager Provider');
    this.baseUrl = '/api/client'; 
    // this.getTopics();
    // this.getFootnotes();
  }

   getTopics() {
    console.log(`Querying this url:  ${this.baseUrl}/Topics`);
    return new Promise<topic[]>(resolve => {
      this.http.get(`${this.baseUrl}/topics`) //, this.opt)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
        this.topics = data;
      });
    });
  }

  tagTopic(topic) {
    topic.tagged = true;
  }

  getEncounters() {
    console.log(`Querying this url:  ${this.baseUrl}/encounters`);
    return new Promise<encounter[]>(resolve => {
      this.http.get(`${this.baseUrl}/encounters`) //, this.opt)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
        this.encounters = data;
      });
    });
  }

  getSections() {
    var that = this;
    console.log(`Querying this url:  ${this.baseUrl}/SectionsWithTopics`);
    return new Promise<section[]>(resolve => {
      this.http.get(`${this.baseUrl}/SectionsWithTopics`) //, this.opt)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      });
    });
  }

  getFootnotes() {
    console.log(`Querying this url:  ${this.baseUrl}/Footnotes`);
    return new Promise<footnote[]>(resolve => {
      this.http.get(`${this.baseUrl}/footnotes`).map(response => response.json()).subscribe(data => {
        resolve(data);
        this.footnotes = data;
        console.log("getFootnotes() call successfully completed!");
      });
    });
  }

  getTopicById(id) {
    console.log(`Retrieving topic with id ${id} from memory...`);
    if(this.topics === undefined) {
      this.topics = [];
    }
    if(this.topics.find(t => t.id == id) == undefined || this.topics.find(t => t.id == id).body == undefined) {
      //topic not cached yet, so pull it...
      return new Promise<topic>(resolve => {
        this.http.get(`${this.baseUrl}/topic/${id}`).map(response => response.json()).subscribe(data => {
          resolve(data);
          this.topics.push(data);
          console.log("Successfully get requested topic from server and added it to cache...");
        });
      });
    } else {
      var topic = this.topics.find(t => t.id == id);
      console.log(`Retrieving cached topic ${topic.title}`);
      return new Promise((resolve) => {
        resolve(topic);
      });
    }
  }

  cacheTopic(id) {
   
  }
}

export class topic {
      id: number;
      title: string;
      titleGerman: string;
      titleSpanish: string;
      summary: string;
      summaryGerman: string;
      summarySpanish: string;
      body: string;
      bodyGerman: string;
      bodySpanish: string;
      displayOrder: number;
      icon: string;
      constructor() {}
}

export class section {
  id: number;
  encounterId: number;
  wectionName: string;
  sectionIcon: string;
  sectionName: string;
  encounter: encounter;
  topics: topic[];
  topicIds: number[];
  open: boolean;
  sectionTopicOrder: string;
}

export class encounter {
  id: number;
  encounterName: string;
  sections: section[];
  open: boolean;
}

export class footnote {
  id: number;
  footnote: string;
}