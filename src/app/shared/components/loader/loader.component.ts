import { Component, input } from '@angular/core';

@Component({
  selector: 'liaison-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  type = input.required<'button' | 'page'>();
}
