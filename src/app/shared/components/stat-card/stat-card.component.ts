import {Component, inject, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'liaison-stat-card',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  router = inject(Router)
  @Input() iconSrc: string = '';
  @Input() title: string = '';
  @Input() count: number = 0;
  @Input() navigateTo: string = '';

  navigate(): void {
    if (this.navigateTo) {
      this.router.navigate([this.navigateTo]);
    }
  }

}
