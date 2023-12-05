import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { AuthService } from '../auth.service';
import { Cart } from '../interfaces/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart = null;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      if (user) {
        this.cartService.getCartItems().subscribe();
        this.cartService.cartItems$.subscribe((data) => {
          console.log('Test');
          if (!data) return;
          this.cart = data.data;
          console.dir(this.cart);

          this.cdr.detectChanges();
        });
      } else {
        this.cart = null;
      }
    });
  }

  decrementQty(cartId: number, productId: number, quantity: number) {
    this.cartService.updateItemQuantity(cartId, productId, quantity);
  }

  incrementQty(cartId: number, productId: number, quantity: number) {
    this.cartService.updateItemQuantity(cartId, productId, quantity);
  }
}
