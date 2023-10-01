// a simplified versio of the original toaster documented here:
//https://garage.sekrab.com/posts/auto-hiding-a-toast-message-in-angular
import { Injectable } from '@angular/core';
import { Observable, of, Subscription, throwError, timer } from 'rxjs';
import { StateService } from '../../services/state.abstract';
import { EnumTimeout, IToast } from './toast.model';

@Injectable({ providedIn: 'root' })
export class Toast extends StateService<IToast> {
  // keep track of timeout
  private isCanceled: Subscription;

  // public dismiss button
  dismissButton = {
    css: 'btn-close',
    text: 'Dismiss',
    click: (event: MouseEvent) => {
      this.Hide();
    },
  };

  private defaultOptions: IToast = {
    css: 'toast',
    extracss: '',
    text: '',
    // add dismiss by default
    buttons: [this.dismissButton],
    timeout: EnumTimeout.Short,
    visible: false,
  };

  constructor() {
    super();
    // set intial state
    this.SetState(this.defaultOptions);
  }

  Show(code: string, options?: IToast) {
    // first hide and kill the timer
    this.Hide();

    // extend default options
    const _options: IToast = { ...this.defaultOptions, ...options };

    const message = options?.text || 'Unknown';
    // timeout a bit to allow for animation effect
    timer(100).subscribe(() => {
      this.SetState({ ..._options, text: message, visible: true });
    });

    // timeout and hide
    if (_options.timeout > EnumTimeout.Never) {
      this.isCanceled = timer(_options.timeout).subscribe(() => {
        this.Hide();
      });
    }
  }

  // short cuts for specific styles
  ShowError(code: string, options?: IToast) {
    this.Show(code, { extracss: 'error', ...options });
  }
  ShowSuccess(code: string, options?: IToast) {
    this.Show(code, { extracss: 'success', ...options });
  }
  ShowWarning(code: string, options?: IToast) {
    this.Show(code, { extracss: 'warning', ...options });
  }
  Hide() {
    // find subscroption and unsubscribe
    if (this.isCanceled) {
      this.isCanceled.unsubscribe();
    }
    // reset to visible
    this.UpdateState({ visible: false });
  }

  // show code then return null
  HandleUiError(error: any, options?: IToast): Observable<any> {
    // if error.code exists it is our error

    if (error.code) {
      // do a switch case for specific errors
      switch (error.status) {
        case 500:
          // terrible error, code always unknown
          this.ShowError('Unknown', options);
          break;
        case 400:
          // server error
          this.ShowError(error.code, options);
          break;
        case 401:
        case 403:
          // auth error, just show a unified message, need to add options for button
          this.Show('UNAUTHORIZED', options);
          break;
        case 404:
          // thing does not exist, better let each component decide
          this.ShowWarning(error.code, options);
          break;
        default:
          // other errors
          this.ShowError(error.code, options);
      }
      return of(null);
    } else {
      // else, throw it back to Angular Error Service, this is a JS error
      return throwError(() => error);
    }
  }
}
