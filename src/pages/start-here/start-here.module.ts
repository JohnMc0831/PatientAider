import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartHerePage } from './start-here';

@NgModule({
  declarations: [
    StartHerePage,
  ],
  imports: [
    IonicPageModule.forChild(StartHerePage),
  ],
  exports: [
    StartHerePage
  ]
})
export class StartHerePageModule {}
