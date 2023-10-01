import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { CustomCurrencyPipe } from '../../lib/pipes/currency.pipe';
import { IProject } from '../../services/project.model';
import { StarsPartialComponent } from '../common/star.partial';

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
  templateUrl: './details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, StarsPartialComponent, CustomCurrencyPipe],
})
export class ProjectViewComponent implements OnInit {
  project$: Observable<any>;

  constructor(private route: ActivatedRoute) {
    //
  }
  ngOnInit(): void {
    this.project$ = this.route.paramMap.pipe(
      switchMap((params) => {
        // get project from service by params
        return of(mockProject);
      })
    );
  }
}
