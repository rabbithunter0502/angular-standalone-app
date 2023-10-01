import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, Observable, of, timer } from 'rxjs';
import { SHARED_COMPONENTS } from '../../core/shared.const';
import { LetDirective } from '../../lib/directives/let.directive';
import { IProject } from '../../services/project.model';
import { ProjectCardPartialComponent } from './card.partial';

const projects: IProject[] = [
  {
    id: '1',
    title: 'Turtle Rock',
    description: 'A place to build a turtle',
    image: 'https://picsum.photos/50/50',
    category: { key: 'turtles', value: 'Turtles' },
  },
  {
    id: '2',
    title: 'Turtle Rock 2',
    description: 'A place to build a turtle',
    image: 'https://picsum.photos/50/50',
    category: { key: 'turtles', value: 'Turtles' },
  },
  {
    id: '3',
    title: 'Turtle Rock 3',
    description: 'A place to build a turtle 4',
    image: 'https://picsum.photos/50/50',
    category: { key: 'turtles', value: 'Turtles' },
  },
];

@Component({
  templateUrl: './list.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ProjectCardPartialComponent,
    RouterModule,
    LetDirective,
    CommonModule,
    ...SHARED_COMPONENTS,
  ]
})
export class ProjectListComponent implements OnInit {
  projects$: Observable<IProject[]>;
  testme: BehaviorSubject<string | null> = new BehaviorSubject(null);

  testme$: Observable<string> = this.testme.asObservable();

  ngOnInit(): void {
    this.projects$ = of(projects);

    timer(2000).subscribe(() => {
      this.testme.next('another value');
    });
  }
}
