import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { FeedbackPage } from '../feedback/feedback';

import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { TaggedPage } from '../tagged/tagged';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = TaggedPage;
  tab3Root = AboutPage;
  tab4Root = FeedbackPage;
  tab5Root = SettingsPage;
  
  constructor() {

  }
}
