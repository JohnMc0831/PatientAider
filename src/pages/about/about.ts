import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as $ from 'jquery';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {
    $.ready(function(){
      $('link[rel=stylesheet]').remove();
    });
    
  }

}
