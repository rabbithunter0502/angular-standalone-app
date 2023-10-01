import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomCurrencyPipe } from '../../lib/pipes/currency.pipe';
import { IProject } from '../../services/project.model';
import { StarsPartialComponent } from '../common/star.partial';

@Component({
  selector: 'gr-project-card',
  templateUrl: './card.partial.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // to turn into standalone
  standalone: true,
  // we need to import everything needed for this component
  imports: [
    CommonModule,
    RouterModule,
    StarsPartialComponent,
    CustomCurrencyPipe,
  ],
})
export class ProjectCardPartialComponent {
  @Input() project: IProject;
}
