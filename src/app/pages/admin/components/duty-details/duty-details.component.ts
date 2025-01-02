import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'liaison-duty-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './duty-details.component.html',
  styleUrl: './duty-details.component.scss'
})
export class DutyDetailsComponent {
  id = input.required<string>();
}
