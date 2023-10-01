import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { IProject } from '../../services/project.model';

@Component({
  selector: 'gr-project-form',
  templateUrl: './form.partial.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // if this is standalone it needs only the things it uses, not the parent
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProjectFormPartialComponent implements OnInit {
  @Output() onSave: EventEmitter<Partial<IProject>> = new EventEmitter<
    Partial<IProject>
  >();

  projectForm: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {
    //
  }
  ngOnInit(): void {
    //
    this.projectForm = this.fb.group({
      name: [],
    });
  }

  saveProject(): void {
    if (this.projectForm.valid) {
      // clone into a new object
      const _value = this.projectForm.value;

      const _project = { ..._value };

      // then emit
      this.onSave.emit(_project);
      // test project
    } else {
      console.log('error');
    }
  }
}
