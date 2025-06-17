import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../services/movie.service';
import { MovieI } from 'src/app/interfaces/movie-interface';
import { MovieCardComponent } from '../card/movie-card.component';
import { Observable } from 'rxjs';
import { CardListComponent } from '../card-list/card-list.component';
import { SearchBoxComponent } from "../../../shared/components/search-box/search-box.component";
import { HeaderUserComponent } from '@shared/components/header-user/header-user.component';

@Component({
  selector: 'app-favorites-movie-card',
  standalone: true,
  imports: [CommonModule, CardListComponent,HeaderUserComponent],
  templateUrl: './favorites-movie-card.component.html',
  styleUrls: ['./favorites-movie-card.component.scss']
})
export class FavoritesMovieCardComponent implements OnInit {



  constructor(private movieService: MovieService) {}

  favoriteMovies: MovieI[] = [];

ngOnInit() {
  this.movieService.loadFavoriteMovies().subscribe(movies => {
    this.favoriteMovies = movies;
    console.log("Se cargaron las pelicula de favoritos",this.favoriteMovies)
  });
}
}
