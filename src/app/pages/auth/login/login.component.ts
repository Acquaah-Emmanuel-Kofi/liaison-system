import { Component, inject } from '@angular/core';
import { NgClass, NgIf, NgOptimizedImage } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ChipsModule } from 'primeng/chips';
import { Button } from 'primeng/button';
import { AuthService } from '../services/auth/auth.service';
import { ICredentials, ILoginResponse } from '../interfaces/auth.interface';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';

@Component({
  selector: 'liaison-login',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FormsModule,
    FloatLabelModule,
    ChipsModule,
    NgClass,
    ReactiveFormsModule,
    NgIf,
    Button,
    LoaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  fb = inject(FormBuilder);
  public type: string = 'password';
  public isLoading: boolean = false;
  public isText: boolean = false;

  private _authService = inject(AuthService);
  private _router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false],
  });

  public hideShowPassword() {
    this.isText = !this.isText;
    if (this.isText) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

  handleSubmit() {
    const credentials = this.loginForm.value;

    if (this.formIsValid()) {
      this.isLoading = true;

      this._authService.login(credentials as ICredentials).subscribe({
        next: (response) => {
          this.handleResponse(response);
        },
        error: (error) => {
          this.isLoading = false;
          alert(error.message);
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.loginForm.markAsTouched();
      alert('Form is invalid. Please check the fields.');
    }
  }

  formIsValid() {
    return this.loginForm.valid;
  }

  handleResponse(response: ILoginResponse) {
    this.isLoading = false;
    
    alert(response.message);
    this._router.navigate(['/admin']);
  }
}
