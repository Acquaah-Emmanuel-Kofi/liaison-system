import {Component, Input} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

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
  @Input() iconSrc: string = '';
  @Input() title: string = '';
  @Input() count: number = 0;
}
