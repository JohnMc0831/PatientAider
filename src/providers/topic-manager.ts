import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class TopicManager {
  baseUrl:  string; 
  topics: any[];
  encounters: encounter[];
  sections: section[];
  footnotes: footnote[];
  // opts: RequestOptions;

  constructor(public http: Http) {
    console.log('Hello TopicManager Provider');
    this.baseUrl = 'https://virgil.ftltech.org/api'; 
    this.getTopics();
    this.getFootnotes();
  }

   getTopics() {
    console.log(`Querying this url:  ${this.baseUrl}/Topics`);
    return new Promise<topic[]>(resolve => {
      this.http.get(`${this.baseUrl}/Topics`) //, this.opt)
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
    console.log(`Querying this url:  ${this.baseUrl}/Encounters`);
    return new Promise<encounter[]>(resolve => {
      this.http.get(`${this.baseUrl}/Encounters`) //, this.opt)
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
      this.http.get(`${this.baseUrl}/Footnotes`).map(response => response.json()).subscribe(data => {
        resolve(data);
        this.footnotes = data;
        console.log("getFootnotes() call successfully completed!");
      });
    });
  }

  getTopicById(id) {
    console.log(`Retrieving topic with id ${id} from memory...`);
    return this.topics.find(t => t.id == id);
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

class section {
  id: number;
  EncounterId: number;
  SectionName: string;
  SectionIcon: string;
  Encounter: encounter;
  Topics: topic[];
  TopicIds: number[];
}

class encounter {
  id: number;
  EncounterName: string;
  Sections: section[];
}

class footnote {
  id: number;
  footnote: string;
}