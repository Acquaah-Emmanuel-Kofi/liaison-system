import { Component, input, output } from '@angular/core';

@Component({
  selector: 'liaison-error-occurred',
  standalone: true,
  imports: [],
  templateUrl: './error-occurred.component.html',
  styleUrl: './error-occurred.component.scss',
})
export class ErrorOccurredComponent {
  errorMessage = input.required<string>();
  buttonMessage = input<string>('Retry');
  isError = input.required<boolean>();
  retry = output<void>();

  onRetry() {
    this.retry.emit();
  }
}
