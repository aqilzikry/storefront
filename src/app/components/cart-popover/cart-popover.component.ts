import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-cart-popover',
  templateUrl: './cart-popover.component.html',
  styleUrls: ['./cart-popover.component.css'],
})
export class CartPopoverComponent {
  test = [1, 2];
  isDropdownOpen = false;

  @ViewChild('myDetailsElement') detailsElement!: ElementRef;

  constructor(private renderer: Renderer2) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.detailsElement.nativeElement.contains(event.target)) {
      this.renderer.removeAttribute(this.detailsElement.nativeElement, 'open');
    }
  }
}
