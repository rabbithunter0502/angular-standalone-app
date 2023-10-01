// a simple RxJS state management module
// documented here: https://garage.sekrab.com/posts/rxjs-based-angular-state-management
import { BehaviorSubject, Observable } from 'rxjs';
import { clone } from '../core/common';

export class StateService<T> {
  protected stateItem: BehaviorSubject<T | null> = new BehaviorSubject(null);
  stateItem$: Observable<T | null> = this.stateItem.asObservable();

  get currentItem(): T | null {
    return this.stateItem.getValue();
  }

  SetState(item: T): Observable<T | null> {
    this.stateItem.next(item);
    return this.stateItem$;
  }

  UpdateState(item: Partial<T>): Observable<T | null> {
    const newItem = { ...this.currentItem, ...clone(item) };
    this.stateItem.next(newItem);
    return this.stateItem$;
  }

  RemoveState(): void {
    this.stateItem.next(null);
  }
}
