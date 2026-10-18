import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() placeholderText: string = 'Buscar...';
  @Output() searchEvent = new EventEmitter<string>();

  onSearch(event: Event): void {
    const element = event.target as HTMLInputElement;
    this.searchEvent.emit(element.value);
  }
}
