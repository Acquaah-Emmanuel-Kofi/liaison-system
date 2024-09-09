import {Component, Input, input} from '@angular/core';
import {NgSwitch, NgSwitchCase} from "@angular/common";

@Component({
  selector: 'liaison-loader',
  standalone: true,
  imports: [
    NgSwitchCase,
    NgSwitch
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  @Input() loaderText: string = 'Loading...';
  @Input() loaderType: 'dots' | 'bars' | 'ring' = 'dots';
}
