import { Product } from './product';

export type Cart = {
  cartId: number;
  cartItems: {
    id: number;
    product: Product;
    quantity: number;
    subtotal: string;
  }[];
  total: number;
} | null;
