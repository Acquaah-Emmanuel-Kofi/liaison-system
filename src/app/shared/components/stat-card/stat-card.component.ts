import { Component, inject, input, Input } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'liaison-stat-card',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss',
})
export class StatCardComponent {
  @Input() iconSrc: string = '';
  @Input() title: string = '';
  @Input() count: number = 0;
  @Input() navigateTo: string = '';
  @Input() showView: boolean = false;

  isLoading = input<boolean>(false)

  private router = inject(Router);

  navigate(): void {
    if (this.navigateTo) {
      this.router.navigate([this.navigateTo]);
    }
  }
}
