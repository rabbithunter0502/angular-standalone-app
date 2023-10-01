import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IProject } from '../../services/project.model';
import { ProjectCardPartialComponent } from '../project/card.partial';

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
  template: `
      <div class="page"><div class="container">
      Test to show project card standalone component
      <gr-project-card [project]="project"></gr-project-card>
      </div></div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ProjectCardPartialComponent,
    // import everything else needed
  ],
})
export class ContentShowcardComponent {
  project = mockProject;
}
