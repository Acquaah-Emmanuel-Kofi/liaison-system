import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'liaison-select-filter',
  standalone: true,
  imports: [],
  templateUrl: './select-filter.component.html',
  styleUrl: './select-filter.component.scss',
})
export class SelectFilterComponent {
  @Input() selection: string = 'Select Filter';
  @Input() selected: string | undefined;
  @Input() selectedView: string | undefined;
  @Input() options: string[] = [];
  optionSelected = output<string>();

  optionsSelection: boolean = false;

  selectedOption(option: string, index: number) {
    this.optionsSelection = false;

    this.selected = this.options[index];
    this.selectedView = this.options[index];
    this.optionSelected.emit(option);
  }

  openOption() {
    this.optionsSelection = !this.optionsSelection;
  }
}
