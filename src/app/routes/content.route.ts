import { Routes } from '@angular/router';
import { ContentHttpComponent } from '../components/content/http.component';
import { ContentShowcardComponent } from '../components/content/showcard.component';
import { ContentStandaloneComponent } from '../components/content/standalone.component';
import { ProjectService } from '../services/project.service';

// export the rotues and make it all stand alone
export const ContentRoutes: Routes = [
  {
    // normal component that uses a standalone card
    path: 'showcard',
    component: ContentShowcardComponent,
  },
  {
    // this is a fully standalone component, it needs no imports in this module
    path: 'standalone',
    component: ContentStandaloneComponent,
  },
  // route to test the http client new moduleless feature
  {
    path: 'http',
    component: ContentHttpComponent,
    providers: [ProjectService],
  },
];
