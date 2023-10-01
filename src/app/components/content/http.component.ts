import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  template: `
      <div class="page"><div class="container">
      Lets call a local url and another from API, the test is a success if I see a console.log event

      <div>
        <a class="btn-fake" (click)="getLocal()">Localdata</a> 
        <a class="btn-fake" (click)="getAPI()">API Products</a> 
      </div>
      </div></div>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    // import everything else needed
  ],
})
export class ContentHttpComponent {
  constructor(
    private projectService: ProjectService,
    private _http: HttpClient
  ) {
    //
  }
  getLocal() {
    this._http.get('/localdata/something').subscribe({
      next: (data) =>
        console.log(data, 'this is supposed to fail, which is fine'),
      error: (error) => console.log(error),
    });
  }
  getAPI() {
    this.projectService.GetProjects().subscribe({
      next: (success) => console.log(success),
    });
  }
}
