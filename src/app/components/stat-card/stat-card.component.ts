import {Component, Input} from '@angular/core';

@Component({
  selector: 'liaison-stat-card',
  standalone: true,
  imports: [],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  @Input() iconSrc: string = '';
  @Input() title: string = '';
  @Input() count: number = 0;
}
