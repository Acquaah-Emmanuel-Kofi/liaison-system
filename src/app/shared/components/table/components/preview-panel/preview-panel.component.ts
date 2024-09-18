import {Component, EventEmitter, inject, Input, Output, output} from '@angular/core';
import {TableData} from "../../table.interface";
import {getFirstTwoInitials} from "../../../../helpers/functions.helper";
import {NgIf} from "@angular/common";
import { Clipboard } from '@angular/cdk/clipboard';
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'liaison-preview-panel',
  standalone: true,
  imports: [
    NgIf,
    ToastModule
  ],
  templateUrl: './preview-panel.component.html',
  styleUrl: './preview-panel.component.scss',
})
export class PreviewPanelComponent {
  messageService = inject(MessageService)
  clipboard = inject(Clipboard)
  @Input() data!: TableData;
  @Output() closeEvent = new EventEmitter<void>();
  isTelephoneActive: boolean = false;
  isCopied!: boolean;


  onClosePanel() {
    this.closeEvent.emit();
  }

  getNameInitials(name: string) {
    return getFirstTwoInitials(name);
  }

  copyToClipboard(phone: string): void {
    this.clipboard.copy(phone);
    this.isCopied = true;
    setTimeout(() => {
      this.messageService.add({severity:'info',summary:'Info',detail: phone+' copied successfully'})
      this.isCopied = false
    },500);

  }
}
