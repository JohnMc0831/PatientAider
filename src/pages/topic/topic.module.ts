import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopicPage } from './topic';

@NgModule({
  declarations: [
    TopicPage,
  ],
  imports: [
    IonicPageModule.forChild(TopicPage),
  ],
  exports: [
    TopicPage
  ]
})
export class TopicModule {}
