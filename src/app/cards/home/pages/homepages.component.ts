import { Component, OnInit } from '@angular/core';
import { HeaderUserComponent } from '@shared/components/header-user/header-user.component';
import { CardListComponent } from 'src/app/cards/components/card-list/card-list.component';
import { MovieService } from 'src/app/services/movie.service';
import { MovieI } from 'src/app/interfaces/movie-interface';


@Component({
  selector: 'app-homepages',
  standalone: true,
  imports: [
    HeaderUserComponent,
    CardListComponent,
],
  templateUrl: './homepages.component.html',
  styleUrls: ['./homepages.component.scss']
})
export class HomepagesComponent implements OnInit {
  public movies: MovieI[] = [];


  constructor(private movieService: MovieService) {}

ngOnInit(): void {
  this.movieService.movieList$.subscribe(data => {
    this.movies = data;
    console.log('Películas recibidas en el componente:', this.movies);
  });
}


}
