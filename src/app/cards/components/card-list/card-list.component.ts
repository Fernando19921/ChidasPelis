import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  SimpleChanges
} from '@angular/core';
import { MovieI } from 'src/app/interfaces/movie-interface';
import { MovieCardComponent } from '../card/movie-card.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit, OnChanges {
  @Input() public movies: MovieI[] = [];

  addedToFavorites: { [id: number]: boolean } = {};

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('movieId');
      const ids: number[] = stored ? JSON.parse(stored) : [];

      ids.forEach(id => {
        this.addedToFavorites[id] = true;
      });

      
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  addToFavorites(id: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('movieId');
      let ids: number[] = stored ? JSON.parse(stored) : [];

      if (!ids.includes(id)) {
        ids.push(id);
        localStorage.setItem('movieId', JSON.stringify(ids));
        this.addedToFavorites[id] = true;
      }
    }
  }

  removeFromFavorites(id: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('movieId');
      let ids: number[] = stored ? JSON.parse(stored) : [];

      ids = ids.filter(storedId => storedId !== id);
      localStorage.setItem('movieId', JSON.stringify(ids));
      delete this.addedToFavorites[id];
    }
  }
}
