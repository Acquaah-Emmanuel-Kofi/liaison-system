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
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {BrandComponent} from "../../../shared/components/brand/brand.component";
import {LoaderModalComponent} from "../../../shared/components/loader-modal/loader-modal/loader-modal.component";

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
    LoaderComponent,
    ToastModule,
    BrandComponent,
    LoaderModalComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers:[MessageService]
})
export class LoginComponent {
  messageService = inject(MessageService)
  fb = inject(FormBuilder);
  public type: string = 'password';
  public isLoading: boolean = false;
  isModalOpen: boolean = false;
  public isText: boolean = false;

  private _authService = inject(AuthService);

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
      this.isModalOpen = true;

      this._authService.login(credentials as ICredentials).subscribe({
        next: (response) => {
          this.handleResponse(response);
        },
        error: (error) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.message});
          this.isLoading = false;
          this.isModalOpen = false;


        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      this.loginForm.markAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Form is invalid. Please check the fields.' });

    }
  }

  // showLoadingModal() {
  //   this.isLoading = true;
  //   this.isModalOpen = true;
  // }


  formIsValid() {
    return this.loginForm.valid;
  }

  handleResponse(response: ILoginResponse) {
    this.isLoading = false;
    this.isModalOpen = false;

    this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
  }
}
