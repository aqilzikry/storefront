import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from './interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.currentUser = this.currentUserSubject.asObservable();

    // Initialize the user from local storage on service creation
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.currentUserSubject.next(user);
    }
  }

  register(data: any): Observable<any> {
    return this.http.post(
      'https://localhost:7027/api/authentication/register',
      data
    );
  }

  login(data: any): Observable<any> {
    return this.http
      .post('https://localhost:7027/api/authentication/login', data)
      .pipe(
        map((response: any) => {
          console.log('Posting');
          if (response.status) {
            const user = response.data.user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return response;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
