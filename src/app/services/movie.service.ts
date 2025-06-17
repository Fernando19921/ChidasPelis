import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MovieI } from '../interfaces/movie-interface';
import { FavoriteI } from '../interfaces/favorite.movie-interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url = 'http://localhost:5063/api';

  // 🎯 Esto almacena las películas de forma reactiva
  private movieListSubject = new BehaviorSubject<MovieI[]>([]);
  public movieList$ = this.movieListSubject.asObservable();
  private userId = parseInt(localStorage.getItem("id") || "0", 10);

  private favoriteCache: MovieI[] | null = null;

  // ✅ Nuevo BehaviorSubject para favoritos
  private favoriteSubject = new BehaviorSubject<MovieI[]>([]);
  public favorite$ = this.favoriteSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadMovies(); // 👈 Llama al cargar el servicio
  }

  private loadMovies(): void {
    this.http.get<MovieI[]>(`${this.url}/content`).pipe(
      tap(data => {
        this.movieListSubject.next(data);
      })
    ).subscribe();
  }

  public loadFavoriteMovies(): Observable<MovieI[]> {
    if (this.favoriteCache !== null) {
      console.log("Datos traídos de caché");
      return of(this.favoriteCache);
    }

    return this.http.get<MovieI[]>(`${this.url}/favorites/user/${this.userId}`)
      .pipe(
        tap(movies => {
          console.log("Datos cargados de la base de datos");
          this.favoriteCache = movies;

          // ✅ Actualizamos el BehaviorSubject
          this.favoriteSubject.next(movies);
        }),
        catchError((error)=>{
          return of([])
        })
      );
  }

  public addFavorite( movie_id: number): Observable<FavoriteI> {
    const body = {
      userId: this.userId,
      contentId: movie_id
    };
    return this.http.post<FavoriteI>(`${this.url}/favorites`, body)
      .pipe(
        tap(() => {
          this.favoriteCache = null;
          console.log("Se agregó un nuevo dato, se hará una nueva petición");
        })
      );
  }

  public removeFavorite(id: number): Observable<any> {
    return this.http.delete(`${this.url}/favorite/${id}`)
      .pipe(
        tap(() => {
          this.favoriteCache = null;
          console.log("Se eliminó una película, se recargarán los datos");
        })
      );
  }
}
