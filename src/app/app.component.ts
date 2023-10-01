import {
  ChangeDetectionStrategy,
  Component,
  VERSION,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastPartialComponent } from './lib/toast/toast.partial';
import { Toast } from './lib/toast/toast.state';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterModule, ToastPartialComponent],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;

  constructor(private toast: Toast) {}
  showToast() {
    // by unknown code, with fallback, fallback will be produced
    this.toast.ShowWarning('SomeCode', { text: 'Some fallback message here' });
  }
}
