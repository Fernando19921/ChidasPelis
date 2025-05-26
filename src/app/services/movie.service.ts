import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MovieI } from '../interfaces/movie-interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = 'assets/data/peliculas.json';

  // 🎯 Esto almacena las películas de forma reactiva
  private movieListSubject = new BehaviorSubject<MovieI[]>([]);
  public movieList$ = this.movieListSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMovies(); // 👈 Llama al cargar el servicio
  }

  private loadMovies(): void {
    this.http.get<MovieI[]>(this.url).pipe(
      tap(data => {
        //console.log('Películas recibidas en MovieService:', data);
        this.movieListSubject.next(data);
      })
    ).subscribe();
  }

  // 👇 Por si quieres seguir llamando manualmente (aunque ya no será necesario si usas movieList$)
  getMovies(): Observable<MovieI[]> {
    return this.movieList$;
  }
}

