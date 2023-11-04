import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  addItemToCart(productId: number, quantity: number) {
    this.cartService.addItemToCart(productId, quantity);
  }
}
