import {Component, inject} from '@angular/core';
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {EmailValidator, FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {FloatLabelModule} from "primeng/floatlabel";
import {ChipsModule} from "primeng/chips";
import {Button} from "primeng/button";

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
    Button
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  fb = inject(FormBuilder)
  public type: string = 'password';
  public submitted: boolean = false;
  public isText: boolean = false;

  loginForm = this.fb.group({
    email: ['', [ Validators.required]],
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
}
