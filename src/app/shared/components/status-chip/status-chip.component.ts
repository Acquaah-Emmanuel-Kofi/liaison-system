import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'liaison-status-chip',
  standalone: true,
  imports: [NgClass],
  templateUrl: './status-chip.component.html',
  styleUrl: './status-chip.component.scss',
})
export class StatusChipComponent {
  status = input.required<
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'SUPERVISED'
    | 'NOT SUPERVISED'
    | 'NOT_STARTED'
  >();
}
