import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProject } from './project.model';

// example projects
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

// example service
// test api that does nothing
const API = 'https://saphire.sekrab.com/api/products';

@Injectable()
export class ProjectService {
  constructor(private _http: HttpClient) {}

  GetProjects(): Observable<IProject[]> {
    return this._http.get('/products').pipe(
      map((response) => {
        return projects;
      })
    );
  }

  GetProject(id: string): Observable<IProject> {
    return this._http.get(API + id).pipe(
      map((response) => {
        return projects[0];
      })
    );
  }

  CreateProject(project: Partial<IProject>): Observable<IProject> {
    // mimic a call to an api

    return this._http.post(API, projects[1]).pipe(
      map((response) => {
        return projects[1];
      })
    );
  }

  SaveProject(project: IProject): Observable<IProject> {
    return this._http.put(API + project.id, projects).pipe(
      map((response) => {
        return project;
      })
    );
  }

  DeleteProject(project: IProject): Observable<boolean> {
    return this._http.delete(API + project.id).pipe(
      map((response) => {
        return true;
      })
    );
  }
}
