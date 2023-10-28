import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  AbstractControl,
  FormBuilder,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formGroup = this.formBuilder.group(
      {
        email: ['', [Validators.required]],
        name: ['', [Validators.required]],
        password: ['', [Validators.required]],
        rpassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    const password = control.get('password');
    const retypePassword = control.get('rpassword');

    if (password && retypePassword && password.value !== retypePassword.value) {
      return { passwordMismatch: true };
    }

    return null;
  };

  register() {
    if (this.formGroup.valid) {
      this.authService.register(this.formGroup.value).subscribe((result) => {
        if (result.status) {
          console.dir(result.data.token);
        } else {
          console.log(result.message);
        }
      });
    }
  }
}
