import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://localhost:7027/api/Cart';
  private headers;

  private cartItemsSubject = new BehaviorSubject<any>(null);
  cartItems$: Observable<any> = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const user = JSON.parse(storedCart);
      this.cartItemsSubject.next(user);
    }
    const token = localStorage.getItem('token');
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getCartItems(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers }).pipe(
      tap((data) => {
        this.cartItemsSubject.next(data);
      })
    );
  }

  clearCartItems(): void {
    this.cartItemsSubject.next(null);
    localStorage.removeItem('cart');
  }

  addItemToCart(productId: number, quantity: number): void {
    const data = {
      productId,
      quantity,
    };
    this.http
      .post(this.apiUrl, data, { headers: this.headers })
      .subscribe((data) => {
        this.cartItemsSubject.next(data);
      });
  }
}
