import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isAllreadyLoggedIn: boolean = false;
  loginForm !: FormGroup;
  signUpForm !: FormGroup;
  isLoading: boolean = false;

  constructor(
    private _authService: AuthService,
    private _snackBar: SnackbarService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.createSignUpForm();
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      userRole: new FormControl('admin')
    })
  }

  createSignUpForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
      userRole: new FormControl('admin')
    })
  }

  get loginControls() {
    return this.loginForm.controls;
  }

  get signUpControls() {
    return this.signUpForm.controls;
  }

  onSignUp() {
    this.isLoading = true;
    if (this.signUpForm.invalid) {
      this.isLoading = false;
      return this.signUpForm.markAllAsTouched();
    } else {
      let userDetails = this.signUpForm.value;
      return this._authService.signUp(userDetails)
        .subscribe({
          next: resp => {
            this._snackBar.openSnackBar(resp.message);
            this.isLoading = false;
            this.isAllreadyLoggedIn = true;
          },
          error: err => {
            this._snackBar.openSnackBar(err.error.message);
            this.isLoading = false;
          }
        })
    }
  }

  onLogin() {
    this.isLoading = true;
    if (this.loginForm.invalid) {
      this.isLoading = false;
      return this.loginForm.markAllAsTouched();
    } else {
      let loginDetails = this.loginForm.value;
      this._authService.login(loginDetails)
        .subscribe({
          next: resp => {
            this._authService.isLoggedInSub$.next(true);
            this.isLoading = false;
            this._snackBar.openSnackBar(resp.message);
            this._authService.saveToken(resp.token);
            this._authService.saveUserRole(resp.userRole);
            this._router.navigate(['home']);
          },
          error: err => {
            this._snackBar.openSnackBar(err.error.message);
            this.isLoading = false;
          }
        })
    }
  }

}
