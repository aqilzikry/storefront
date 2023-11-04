import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { AuthService } from './auth.service';

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

  getCartItems(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(this.apiUrl, { headers }).pipe(
      tap((data) => {
        this.cartItemsSubject.next(data);
      })
    );
  }

  clearCartItems(): void {
    this.cartItemsSubject.next(null);
    localStorage.removeItem('cart');
  }
}
