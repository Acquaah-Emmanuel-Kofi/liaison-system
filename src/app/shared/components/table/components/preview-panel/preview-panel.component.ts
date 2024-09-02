import { Component, output } from '@angular/core';

@Component({
  selector: 'liaison-preview-panel',
  standalone: true,
  imports: [],
  templateUrl: './preview-panel.component.html',
  styleUrl: './preview-panel.component.scss',
})
export class PreviewPanelComponent {
  closeEvent = output<void>();

  onClosePanel() {
    this.closeEvent.emit();
  }
}
