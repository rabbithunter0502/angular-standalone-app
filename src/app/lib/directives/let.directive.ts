import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
// nice directive to let you do this: *grLet="some value" instead of *ngIf
interface LetContext<T> {
  grLet: T | null;
}

@Directive({
  selector: '[grLet]',
  // turn into standalone
  standalone: true
})
export class LetDirective<T> {
  private _context: LetContext<T> = { grLet: null };

  constructor(
    private viewContainer: ViewContainerRef,
    private templateRef: TemplateRef<LetContext<T>>
  ) {
    this.viewContainer.createEmbeddedView(this.templateRef, this._context);
  }

  @Input()
  set grLet(value: T) {
    this._context.grLet = value;
  }
}
