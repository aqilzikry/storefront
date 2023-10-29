import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  buttonShake = false;
  loginError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  login() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe(
        (result) => {
          if (result.data) {
            console.dir(result.data.token);
            this.router.navigate(['/']);
          }
        },
        (error) => {
          if (error.status == 401) this.loginError = true;
        }
      );
    }
  }
}
