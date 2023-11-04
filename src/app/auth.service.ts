import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  mergeMap,
  tap,
  throwError,
} from 'rxjs';
import { User } from './interfaces/user';
import { CartService } from './cart.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private cartService: CartService) {
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  register(data: any): Observable<any> {
    return this.http.post(
      environment.apiUrl + '/authentication/register',
      data
    );
  }

  login(data: any): Observable<any> {
    return this.http
      .post(environment.apiUrl + '/authentication/login', data)
      .pipe(
        mergeMap((loginResponse: any) => {
          if (loginResponse.status) {
            const user = loginResponse.data.user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('token', loginResponse.data.token.result);
            this.currentUserSubject.next(user);
          }

          return this.cartService.getCartItems().pipe(
            tap((cartResponse: any) => {
              if (cartResponse.status && loginResponse.status) {
                localStorage.setItem('cart', JSON.stringify(cartResponse.data));
              }
            }),
            map(() => loginResponse)
          );
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      );
  }

  logout() {
    this.http.post(environment.apiUrl + '/authentication/logout', {});
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.cartService.resetCart();
    this.currentUserSubject.next(null);
  }
}
