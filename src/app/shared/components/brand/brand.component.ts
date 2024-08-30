import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'liaison-brand',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss',
})
export class BrandComponent {
  color = input<string>('white');
  logoSize = input<number>(16);
  textSize = input<number>(16);
}
