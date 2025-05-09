// navegation.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navegation',
  templateUrl: './navegation.component.html',
  styleUrls: ['./navegation.component.css'],
  standalone: true
})
export class NavegationComponent {
  @Output() onNext = new EventEmitter<void>();
  @Output() onPrevious = new EventEmitter<void>();
}
