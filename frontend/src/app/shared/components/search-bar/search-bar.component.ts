import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Input() placeholderText: string = 'Buscar...';
  @Output() searchEvent = new EventEmitter<string>();

  onSearch(searchTerm: string): void {
    this.searchEvent.emit(searchTerm);
  }
}
