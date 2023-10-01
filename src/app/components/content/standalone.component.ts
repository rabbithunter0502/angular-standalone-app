import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SHARED_COMPONENTS } from '../../core/shared.const';
import { CustomCurrencyPipe } from '../../lib/pipes/currency.pipe';
import { IProject } from '../../services/project.model';
import { ProjectCardPartialComponent } from '../project/card.partial';

// this is a standalone routed component, it imports everything it needs
const mockProject: IProject = {
  title: 'Turtle Rock',
  description: 'A place to build a turtle',
  image: 'https://picsum.photos/200/300',
  id: '56',
  category: {
    value: 'Turtles',
    key: 'turtles',
  },
};

@Component({
  templateUrl: './standalone.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    ...SHARED_COMPONENTS,
    CustomCurrencyPipe,
    ProjectCardPartialComponent,
  ],
})
export class ContentStandaloneComponent {
  testMe: boolean = true;
  project = mockProject;
}
