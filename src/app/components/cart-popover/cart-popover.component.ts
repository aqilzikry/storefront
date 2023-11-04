import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { map, tap } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-cart-popover',
  templateUrl: './cart-popover.component.html',
  styleUrls: ['./cart-popover.component.css'],
})
export class CartPopoverComponent implements OnInit {
  cart: any = null;
  itemCount = 0;
  isDropdownOpen = false;

  @ViewChild('myDetailsElement') detailsElement!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe();
    this.cartService.cartItems$.subscribe((data) => {
      this.cart = data.data;

      if (this.cart && this.cart.cartItems) {
        this.itemCount = this.cart.cartItems.length;
      }
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.detailsElement.nativeElement.contains(event.target)) {
      this.renderer.removeAttribute(this.detailsElement.nativeElement, 'open');
    }
  }
}
