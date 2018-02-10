import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import * as $ from 'jquery';

@IonicPage()
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
    console.log('displaying PopoverPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }
}