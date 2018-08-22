import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as $ from 'jquery';

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  notesText: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    var notes = this.navParams.data;
    this.notesText = notes.text;
  }

  ionViewDidLoad() {
    $("#notesGoHere").html(this.notesText);
    $('a').bind("click", function(e) {
      e.preventDefault();
      var url = $(this).attr('href');
      window.open(encodeURI(url), '_system', 'location=yes');
    });
    console.log('displaying PopoverPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }
}