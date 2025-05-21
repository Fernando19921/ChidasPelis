import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Movie, MovieService } from '../../../services/movie.service';


@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: Movie[] = [];
  addedToFavorites: { [id: number]: boolean } = {};

  constructor(
    private MovieService: MovieService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Solo usar localStorage si estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('movieId');
      const ids: number[] = stored ? JSON.parse(stored) : [];

      ids.forEach(id => {
        this.addedToFavorites[id] = true;
      });
    }

    // Obtener películas desde el servicio
    this.MovieService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }

  addToFavorites(id: number): void {
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem('movieId');
      let ids: number[] = stored ? JSON.parse(stored) : [];

      if (!ids.includes(id)) {
        ids.push(id);
        localStorage.setItem('movieId', JSON.stringify(ids));
        this.addedToFavorites[id] = true;
      } else {
        alert(`El ID ${id} ya está en favoritos`);
        this.addedToFavorites[id] = true;
      }
    }
  }
}
