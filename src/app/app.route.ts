import { ENVIRONMENT_INITIALIZER } from '@angular/core';
import {
  provideRouter,
  Router,
  Routes,
  Scroll,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withRouterConfig,
} from '@angular/router';
import { filter } from 'rxjs';

// this is now a const but it needs to be provided in the app module bootstrapper
const AppRoutes: Routes = [
  {
    path: 'projects',
    loadChildren: () =>
      import('./routes/project.route').then((m) => m.ProjectRoutes),
    // we can provide single services like this, and inject tokens as well
    // providers: [ProjectService],
  },
  // make stand alone group, import the routes
  {
    path: 'content',
    loadChildren: () =>
      import('./routes/content.route').then((m) => m.ContentRoutes),
  },
  // rerouting en existing standalone component on its own
  // this is possible but too messy, we should avoid this
  {
    path: 'lazyloadedstandalone',
    loadComponent: () =>
      import('./components/content/standalone.component').then(
        (m) => m.ContentStandaloneComponent
      ),
  }
 
];

// let's tidy up and create consts for providers

// here is a way to replace the module constructor, using ENVIRONMENT_INITIALIZER
const appFactory = (router: Router) => () => {
  router.events.pipe(filter((event) => event instanceof Scroll)).subscribe({
    next: (e: Scroll) => {
      // some logic
      console.log(e.position);
    },
  });
};

export const AppRouteProviders = [
  // importProvidersFrom(
  //   RouterModule.forRoot(AppRoutes, {
  //     paramsInheritanceStrategy: 'always',
  //     onSameUrlNavigation: 'reload',
  //     scrollPositionRestoration: 'disabled',
  //     initialNavigation: 'enabledBlocking',
  //   })
  // ),
  // or using the new provideRouter
  provideRouter(
    AppRoutes,
    withInMemoryScrolling({
      scrollPositionRestoration: 'disabled',
    }),
    withEnabledBlockingInitialNavigation(),
    withRouterConfig({
      paramsInheritanceStrategy: 'always',
      onSameUrlNavigation: 'reload',
    })
  ),
  // using ENIVRONMENT_INITIALIZER is like NgModule constructor calls
  {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useFactory: appFactory,
    deps: [Router],
  },
];
