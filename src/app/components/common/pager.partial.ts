// simple example of a shared component
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gr-pager',
  // standalone
  standalone: true,
  // uses commonmodule
  imports: [CommonModule],
  template: `
    <div class="txt-c">
        <button class="btn" *ngIf="isLoadMore" (click)="page()" title="Show more">Show more</button>
    </div>
  `,
})
export class PagerPartialComponent {
  @Input() isLoadMore = false;
  @Output() onPage: EventEmitter<void> = new EventEmitter();

  page(): void {
    this.onPage.emit();
  }
}
