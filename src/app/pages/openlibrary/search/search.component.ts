import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({selector: 'app-search',
  standalone: true,
  imports: [FormsModule], // Agrega FormsModule aquí
  template: `
  <div class="d-flex justify-content-center my-4">
    <div class="input-group mb-3" style="max-width: 600px; width: 100%;">
      <input 
        type="text" 
        class="form-control"
        placeholder="Escribe el nombre del producto" 
        aria-label="Escribe el nombre del producto" 
        aria-describedby="button-addon2"
        [(ngModel)]="searchTerm"
        (input)="onInput()"> 
    </div>
  </div>
  `,
  styles: []
})
export class SearchComponent {
  @Output() searchBooks = new EventEmitter<string>();
  searchTerm: string = ''; 

  onInput(): void {
    const trimmedTerm = this.searchTerm.trim(); 
    this.searchBooks.emit(trimmedTerm); 
  }
}
