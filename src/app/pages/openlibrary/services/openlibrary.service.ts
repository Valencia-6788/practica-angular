import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Docs, Books, BookDetails } from '../interfaces/openlibrary';

@Injectable({
  providedIn: 'root',
})
export class OpenlibraryService {
  private baseUrl: string = 'https://openlibrary.org/search.json';
  private nextPage: string | null = null;
  private previousPage: string | null = null;

  constructor(private http: HttpClient) {}

  // Carga libros paginados
  getBooks(start: number = 0): Observable<Docs[]> {
    return new Observable(observer => {
      fetch(`${this.baseUrl}?title=a&fields=key,title,author_name,first_publish_year,publisher,cover_edition_key&limit=100`)
        .then(response => response.json())
        .then((result: any) => {
          const allDocs = result.docs;
          const slicedDocs = allDocs.slice(start, start + 20 ); // paginar de 20 en 20
          const books: Docs[] = slicedDocs.map((doc: any) => this.mapDocToBook(doc)); // Definir explícitamente 'doc' como 'any'
          observer.next(books);
          observer.complete();
          
        })
      
        .catch(err => observer.error(err));
    });
  }
  
  searchBooks(query: string = 'a'): Observable<Books> {
    const url = `${this.baseUrl}?q=${encodeURIComponent(query)}&fields=key,title,author_name,first_publish_year,publisher,cover_edition_key&limit=1`;    console.log(url);
    return this.http.get<Books>(url);
  }


  getBookDetails(workKey: string): Observable<BookDetails> {
    const url = `https://openlibrary.org${workKey}.json`;
    return this.http.get<BookDetails>(url);
    console.log(url);
  }

  setNextPage(url: string | null) {
    this.nextPage = url;
  }

  setPreviousPage(url: string | null) {
    this.previousPage = url;
  }

 
public mapDocToBook(doc: any): Docs {
  return {
    key: doc.key,
    title: doc.title,
    author_name: Array.isArray(doc.author_name) ? doc.author_name : [],
    author: doc.author_name?.[0] || 'Unknown Author',
    publisher: Array.isArray(doc.publisher) ? doc.publisher : [],
    firstPublishDate: doc.first_publish_year ? String(doc.first_publish_year) : 'Unknown Year',
    imgUrl: `https://covers.openlibrary.org/b/olid/${doc.cover_edition_key || doc.edition_key?.[0] || doc.key?.split('/').pop()}-L.jpg`,
    description: doc.description?.[0] || 'Unknown Description',
    subjectPlaces: doc.subject_places?.[0] || 'Unknown Place',
    subjectPeople: doc.subject_people?.[0] || 'Unknown People',
    subjectTime: doc.subject_time?.[0] || 'Unknown Time',
    subjects: doc.subjects?.[0] || 'Unknown Subject',
  };
}

}
