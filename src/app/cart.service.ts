import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = 'https://localhost:7027/api/Cart';

  private cartItemsSubject = new BehaviorSubject<any>(null);
  cartItems$: Observable<any> = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const user = JSON.parse(storedCart);
      this.cartItemsSubject.next(user);
    }
  }

  generateHeader() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getCartItems(): Observable<any> {
    console.log('Calling cart API');

    return this.http.get(this.apiUrl, { headers: this.generateHeader() }).pipe(
      map((data) => {
        return data;
      }),
      tap((data) => {
        this.cartItemsSubject.next(data);
      })
    );
  }

  resetCart(): void {
    this.cartItemsSubject.next(null);
    localStorage.removeItem('cart');
  }

  addItemToCart(productId: number, quantity: number): void {
    const data = {
      productId,
      quantity,
    };
    this.http
      .post(this.apiUrl, data, { headers: this.generateHeader() })
      .subscribe((data) => {
        this.cartItemsSubject.next(data);
      });
  }
}
