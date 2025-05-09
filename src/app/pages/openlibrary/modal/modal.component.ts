import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Docs } from '../interfaces/openlibrary';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() book!: Docs;
  @Input() onClose!: () => void;
  @Output() cerrar = new EventEmitter<void>();

  // Asignar valores por defecto en caso de que falten
  get author(): string {
    const authors = this.book.author_name;
    return Array.isArray(authors) && authors.length > 0 ? authors.join(', ') : 'Autor desconocido';
  }
  
  get publisher(): string {
    const publishers = this.book.publisher;
    return Array.isArray(publishers) && publishers.length > 0 ? publishers[0] : 'Editor desconocido';
  }
  

  get firstPublishDate(): string {
    return this.book.firstPublishDate || 'Fecha desconocida';
  }

  get imgUrl(): string {
    return this.book.imgUrl || 'https://via.placeholder.com/150'; // Imagen por defecto si no hay portada
  }
}
