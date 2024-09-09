import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {BrandComponent} from "../../../shared/components/brand/brand.component";

@Component({
  selector: 'liaison-error-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    BrandComponent
  ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {

}
