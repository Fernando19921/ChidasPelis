import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  titulo: string;
  img: string;
  director: string;
  anio: number;
  genero: string;
  trailer: string;
}


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url='assets/data/peliculas.json'

  constructor(private http:HttpClient) { }

  getMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>(this.url);
  }
}
