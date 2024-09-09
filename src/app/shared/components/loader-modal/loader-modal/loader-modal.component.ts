import {Component, Input} from '@angular/core';
import {LoaderComponent} from "../../loader/loader.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'liaison-loader-modal',
  standalone: true,
  imports: [
    LoaderComponent,
    NgIf
  ],
  templateUrl: './loader-modal.component.html',
  styleUrl: './loader-modal.component.scss'
})
export class LoaderModalComponent {
  @Input() isOpen: boolean = false;
}
