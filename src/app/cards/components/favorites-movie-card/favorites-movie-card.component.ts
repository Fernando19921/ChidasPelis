import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { HeaderUserComponent } from '@shared/components/header-user/header-user.component';
import { MovieService } from '../../../services/movie.service';
import { MovieI } from 'src/app/interfaces/movie-interface';

@Component({
  selector: 'app-favorites-movie-card',
  standalone: true, // Este componente es standalone, lo que significa que no depende de un módulo específico
  imports: [CommonModule, HeaderUserComponent], // Importa módulos necesarios, como CommonModule y el componente HeaderUserComponent
  templateUrl: './favorites-movie-card.component.html', // Ruta al archivo HTML del componente
  styleUrls: ['./favorites-movie-card.component.scss'] // Ruta al archivo de estilos del componente
})
export class FavoritesMovieCardComponent {
  public movieFavoriteIds: number[] = []; // Almacena los IDs de las películas favoritas obtenidos de localStorage
  public movieFavorite: MovieI[] = []; // Almacena las películas favoritas completas después de filtrarlas

  constructor(
    private MovieService: MovieService, // Servicio para obtener las películas
    @Inject(PLATFORM_ID) private platformId: Object // Identifica la plataforma (navegador o servidor)
  ) {}

  /**
   * Método protegido para verificar si el código se está ejecutando en un navegador.
   * Esto es útil para evitar errores al acceder a objetos específicos del navegador, como localStorage.
   * @returns true si está en el navegador, false si no.
   */
  protected isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /**
   * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * - Verifica si está en un navegador.
   * - Obtiene los IDs de las películas favoritas desde localStorage.
   * - Filtra las películas favoritas llamando al servicio `getMovies`.
   */
  ngOnInit(): void {
    if (this.isBrowser()) {
      // Obtiene los IDs de las películas favoritas desde localStorage
      const storageMovieId = localStorage.getItem('movieId');
      if (storageMovieId) {
        this.movieFavoriteIds = JSON.parse(storageMovieId); // Convierte los IDs almacenados en un array
      }

      // Llama al servicio para obtener todas las películas y filtra las favoritas
      this.MovieService.getMovies().subscribe(movies => {
        this.movieFavorite = movies.filter(movie =>
          this.movieFavoriteIds.includes(movie.id) // Filtra las películas cuyos IDs están en movieFavoriteIds
        );
      });
    }
  }

  /**
   * Método público para eliminar una película de la lista de favoritas.
   * - Verifica si está en un navegador.
   * - Actualiza localStorage eliminando el ID de la película.
   * - Actualiza las listas locales `movieFavoriteIds` y `movieFavorite`.
   * @param id ID de la película que se desea eliminar de las favoritas.
   */
  public deleteFavorite(id: number): void {
    if (this.isBrowser()) {
      // Obtiene los IDs de las películas favoritas desde localStorage
      const localStorageId = localStorage.getItem('movieId');

      if (localStorageId) {
        // Convierte los IDs almacenados en un array
        const favoriteIds: number[] = JSON.parse(localStorageId);

        // Filtra los IDs para eliminar el ID especificado
        const updatedFavorites = favoriteIds.filter(favId => favId !== id);

        // Actualiza localStorage con la nueva lista de IDs
        localStorage.setItem('movieId', JSON.stringify(updatedFavorites));

        // Actualiza las listas locales
        this.movieFavoriteIds = updatedFavorites;
        this.movieFavorite = this.movieFavorite.filter(movie => movie.id !== id); // Elimina la película de la lista local
      }
    }
  }
}
