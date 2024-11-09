import {Component, EventEmitter, input, Input, Output} from '@angular/core';

@Component({
  selector: 'liaison-modal-container',
  standalone: true,
  imports: [],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.scss',

})
export class ModalContainerComponent {
  @Input() isOpen = false;
  title = input('Modal Title');
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }
}
