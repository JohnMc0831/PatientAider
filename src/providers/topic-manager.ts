import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';
/*
  Generated class for the TopicManager provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TopicManager {
  baseUrl:  string; 
  topics: any[];
  // opts: RequestOptions;

  constructor(public http: Http) {
    console.log('Hello TopicManager Provider');
    this.baseUrl = 'https://virgil.ftltech.org/api/'; 
    this.getTopics();
    // TODO:  recode this for over-the-wire security...
    //let sosheaders: Headers = new Headers;
    //sosheaders.set("SOS-APP-KEY", "3kHgtutSvUsGYr/nUK/pPxqffFnI9qFFe2jfPEug2b8=");
    //this.opts = new RequestOptions({
      //headers: sosheaders
    //});

  }

   getTopics() {
    console.log(`Querying this url:  ${this.baseUrl}/Topics`);
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/Topics`) //, this.opt)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
        console.log("Call to https://virgil.ftltech.org successfully completed!");
        this.topics = data;
      });
    });
  }

}
