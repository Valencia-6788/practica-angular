import { Component, OnInit } from '@angular/core';
import { OpenlibraryService } from './services/openlibrary.service';
import { Docs } from './interfaces/openlibrary';
import { NgFor, CommonModule } from '@angular/common';  
import { CardComponent } from './card/card.component';  
import { NavegationComponent } from './navegation/navegation.component';
import { SearchComponent } from './search/search.component';
import { ModalComponent } from './modal/modal.component';


@Component({
  selector: 'app-openlibrary',
  standalone: true,
  imports: [NgFor, CommonModule, CardComponent, NavegationComponent, SearchComponent, ModalComponent],  // Incluye CommonModule y CardComponent en imports
  templateUrl: './openlibrary.component.html',
  styleUrls: ['./openlibrary.component.css'],
})
export class OpenlibraryComponent implements OnInit {
  libroSeleccionado: Docs | null = null;
  books: Docs[] = [];
  start: number = 0;
  selectedBook: Docs | null = null;

  constructor(private openLibraryService: OpenlibraryService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  

  loadBooks(): void {
    this.openLibraryService.getBooks(this.start).subscribe({
      next: (books: Docs[]) => this.books = books,
      error: (err: any) => console.error('Error al cargar libros:', err),
      
    });
  }

  onNextPage(): void {
    if (this.start + 20 < 100) { // Evita pasarte de 100 libros
      this.start += 20;
      this.loadBooks();
    }
  }

  onPreviousPage(): void {
    if (this.start > 0) {
      this.start -= 20;
      this.loadBooks();
    }
  }

  onSearch(term: string): void {
    if (term) {
      this.openLibraryService.searchBooks(term).subscribe({
        next: (response) => {
          if (response && response.docs) {
            
            this.books = response.docs.map(doc => this.openLibraryService.mapDocToBook(doc));
            console.log(this.books); 
            this.start = 0;
          } else {
            console.error('No se encontraron resultados');
          }
        },
        error: (err) => {
          console.error('Error al buscar libros:', err);
        },
      });
    } else {
      this.loadBooks(); 
    }
  }
  
  
  

  openModal(book: Docs): void {
    this.selectedBook = book;
  }
  
  closeModal(): void {
    this.selectedBook = null;
  }
  
}
