// Importaciones necesarias para las pruebas unitarias de Angular y servicios relacionados
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesMovieCardComponent } from './favorites-movie-card.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';
import { MovieI } from 'src/app/interfaces/movie-interface';
import { ActivatedRoute } from '@angular/router';

// Suite de pruebas principal para el componente FavoritesMovieCardComponent
describe('FavoritesMovieCardComponent', () => {
  // Declaración de variables para el componente, fixture y espía del servicio
  let component: FavoritesMovieCardComponent;
  let fixture: ComponentFixture<FavoritesMovieCardComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  // Mock de datos de películas para usar en las pruebas
  const mockMovies: MovieI[] = [
    { id: 1, titulo: 'Movie 1', director: '', anio: 2020, genero: '', img: '', trailer: '' },
    { id: 2, titulo: 'Movie 2', director: '', anio: 2021, genero: '', img: '', trailer: '' }
  ];

  // 📦 Grupo de pruebas simulando entorno de servidor (PLATFORM_ID = server)
  describe('(PLATFORM_ID = server)', () => {
    // Configuración antes de cada prueba en entorno servidor
    beforeEach(async () => {
      // Crear espía para el servicio MovieService
      movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovies']);

      // Configuración del TestBed con los proveedores y módulos necesarios
      await TestBed.configureTestingModule({
        imports: [FavoritesMovieCardComponent, HttpClientTestingModule],
        providers: [
          { provide: MovieService, useValue: movieServiceSpy },
          { provide: PLATFORM_ID, useValue: 'server' },
          { provide: ActivatedRoute, useValue: {} }
        ]
      }).compileComponents();

      // Crear instancia del componente y su fixture
      fixture = TestBed.createComponent(FavoritesMovieCardComponent);
      component = fixture.componentInstance;
    });

    // Prueba: el componente debe crearse correctamente en entorno servidor
    it('debe crearse correctamente', () => {
      expect(component).toBeTruthy();
    });

    // Prueba: no debe interactuar con localStorage ni MovieService en servidor
    it('no debe hacer nada si no está en el navegador', () => {
      // Espiar el método getItem de localStorage
      spyOn(localStorage, 'getItem');
      // Ejecutar ngOnInit
      component.ngOnInit();

      // Verificar que localStorage y MovieService no fueron llamados
      expect(localStorage.getItem).not.toHaveBeenCalled();
      expect(movieServiceSpy.getMovies).not.toHaveBeenCalled();
    });
  });

  // 🌐 Grupo de pruebas simulando entorno de navegador (PLATFORM_ID = browser)
  describe('(PLATFORM_ID = browser)', () => {
    // Configuración antes de cada prueba en entorno navegador
    beforeEach(async () => {
      // Crear espía para el servicio MovieService
      movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovies']);

      // Configuración del TestBed con los proveedores y módulos necesarios
      await TestBed.configureTestingModule({
        imports: [FavoritesMovieCardComponent, HttpClientTestingModule],
        providers: [
          { provide: MovieService, useValue: movieServiceSpy },
          { provide: PLATFORM_ID, useValue: 'browser' },
          { provide: ActivatedRoute, useValue: {} }
        ]
      }).compileComponents();

      // Crear instancia del componente y su fixture
      fixture = TestBed.createComponent(FavoritesMovieCardComponent);
      component = fixture.componentInstance;
    });

    // Prueba: eliminar una película de favoritas y actualizar localStorage
    it('debe eliminar una película de favoritas y actualizar localStorage', () => {
      // Simular que localStorage contiene los IDs [1, 2]
      const storedIds = JSON.stringify([1, 2]);
      spyOn(localStorage, 'getItem').and.returnValue(storedIds);
      spyOn(localStorage, 'setItem').and.stub();

      // Asignar valores iniciales a las propiedades del componente
      component['movieFavoriteIds'] = [1, 2];
      component['movieFavorite'] = mockMovies;

      // Ejecutar método para eliminar favorito
      component.deleteFavorite(2);

      // Verificar que localStorage y las propiedades del componente se actualizaron correctamente
      expect(localStorage.setItem).toHaveBeenCalledWith('movieId', JSON.stringify([1]));
      expect(component.movieFavoriteIds).toEqual([1]);
      expect(component.movieFavorite.length).toBe(1);
      expect(component.movieFavorite[0].id).toBe(1);
    });

    // Prueba: cargar las películas favoritas desde localStorage al iniciar (ngOnInit)
    it('debe cargar las películas favoritas desde localStorage al iniciar (ngOnInit)', () => {
      // Simular que localStorage contiene los IDs [1, 2]
      const storedIds = JSON.stringify([1, 2]);
      spyOn(localStorage, 'getItem').and.returnValue(storedIds);
      // Simular que el servicio devuelve las películas mock
      movieServiceSpy.getMovies.and.returnValue(of(mockMovies));

      // Ejecutar ngOnInit
      component.ngOnInit();

      // Verificar que se llamaron los métodos y se asignaron los valores correctamente
      expect(localStorage.getItem).toHaveBeenCalledWith('movieId');
      expect(movieServiceSpy.getMovies).toHaveBeenCalled();
      expect(component.movieFavoriteIds).toEqual([1, 2]);
      expect(component.movieFavorite.length).toBe(2);
      expect(component.movieFavorite[0].id).toBe(1);
      expect(component.movieFavorite[1].id).toBe(2);
    });
  });
});
