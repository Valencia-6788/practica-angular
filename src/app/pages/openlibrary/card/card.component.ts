import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Docs } from '../interfaces/openlibrary';  // Asegúrate de importar la interfaz correcta
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() book!: Docs;
  @Output() viewDetails = new EventEmitter<Docs>();  // Emitir el libro al hacer clic
  imageLoad: boolean = false;

  onViewDetails(): void {
    this.viewDetails.emit(this.book);  // Emite el libro seleccionado
  }
}
