import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaggedPage } from './tagged';

@NgModule({
  declarations: [
    TaggedPage,
  ],
  imports: [
    IonicPageModule.forChild(TaggedPage),
  ],
  exports: [
    TaggedPage
  ]
})
export class TaggedModule {}
