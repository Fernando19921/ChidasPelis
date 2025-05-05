import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesMovieCardComponent } from './favorites-movie-card.component';
import { MovieService, Movie } from '../../../services/movie.service';
import { PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Component } from '@angular/core';

// ✅ Mock del componente HeaderUserComponent
@Component({
  selector: 'app-header-user',
  template: ''
})
class MockHeaderUserComponent {}

describe('FavoritesMovieCardComponent', () => {
  let component: FavoritesMovieCardComponent;
  let fixture: ComponentFixture<FavoritesMovieCardComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;

  const mockMovies: Movie[] = [
    { id: 1, titulo: 'Pelicula 1' },
    { id: 2, titulo: 'Pelicula 2' }
  ];

  beforeEach(async () => {
    movieServiceSpy = jasmine.createSpyObj('MovieService', ['getMovies']);

    await TestBed.configureTestingModule({
      imports: [FavoritesMovieCardComponent],
      declarations: [MockHeaderUserComponent],
      providers: [
        { provide: MovieService, useValue: movieServiceSpy },
        { provide: PLATFORM_ID, useValue: 'browser' },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesMovieCardComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('debe cargar películas favoritas desde localStorage al iniciar (ngOnInit)', () => {
    spyOn(component as any, 'isBrowser').and.returnValue(true);

    const storedIds = [1, 2];
    localStorage.setItem('movieId', JSON.stringify(storedIds));
    movieServiceSpy.getMovies.and.returnValue(of(mockMovies));

    component.ngOnInit();

    expect(component.movieFavoriteIds).toEqual([1, 2]);
    expect(component.movieFavorite).toEqual(mockMovies);
  });

  it('debe eliminar una película de favoritas correctamente', () => {
    spyOn(component as any, 'isBrowser').and.returnValue(true);

    const storedIds = [1, 2];
    localStorage.setItem('movieId', JSON.stringify(storedIds));
    component.movieFavoriteIds = [...storedIds];
    component.movieFavorite = [...mockMovies];

    component.deleteFavorite(1);

    expect(component.movieFavoriteIds).toEqual([2]);
    expect(component.movieFavorite.length).toBe(1);
    expect(component.movieFavorite[0].id).toBe(2);
    expect(localStorage.getItem('movieId')).toBe(JSON.stringify([2]));
  });

  it('no debe hacer nada si no está en el navegador (isBrowser = false)', () => {
    spyOn(component as any, 'isBrowser').and.returnValue(false);

    component.ngOnInit();
    component.deleteFavorite(1);

    expect(component.movieFavoriteIds).toEqual([]);
    expect(component.movieFavorite).toEqual([]);
  });
});
