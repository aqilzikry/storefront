import { Product } from './product';

export type Cart = {
  cartItems: {
    id: number;
    product: Product;
    quantity: number;
    subtotal: string;
  }[];
  total: number;
} | null;
