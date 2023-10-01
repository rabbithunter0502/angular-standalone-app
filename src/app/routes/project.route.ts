import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { ProjectCreateComponent } from '../components/project/create.component';
import { ProjectViewComponent } from '../components/project/details.component';
import { ProjectListComponent } from '../components/project/list.component';
import { ProjectService } from '../services/project.service';

export const ProjectRoutes: Routes = [
  {
    path: '',
    component: ProjectListComponent,
  },
  {
    path: 'create',
    component: ProjectCreateComponent,
    // we can importProvidersFrom httpclient here, or in main.ts, or in AppRoute
    // or better yet in its own CoreProviders where you would also define interceptors
    // APP_INITIALIZER token and ErrorHandler service... etc
    providers: [ProjectService, importProvidersFrom(HttpClientModule)],
  },
  {
    path: ':id',
    component: ProjectViewComponent,
  },
];
