import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { IProject } from '../../services/project.model';
import { ProjectService } from '../../services/project.service';
import { ProjectFormPartialComponent } from './form.partial';

@Component({
  templateUrl: './create.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ProjectFormPartialComponent]
})
export class ProjectCreateComponent implements OnInit {
  constructor(private projectService: ProjectService, private router: Router) {
    //
  }
  ngOnInit(): void {}

  create(project: Partial<IProject>) {
    this.router.navigateByUrl('/projects');
    this.projectService.CreateProject(project).subscribe({
      next: () => {
        console.log('success');
      },
    });
  }
}
