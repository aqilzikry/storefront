import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggedIn = false;
  currentUser!: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('Subscribing.');
    this.authService.currentUser.subscribe((user) => {
      console.dir(user);
      this.currentUser = user;
      this.loggedIn = !!user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
