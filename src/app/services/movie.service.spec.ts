import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService, Movie } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Módulo para pruebas de HttpClient
      providers: [MovieService]
    });

    service = TestBed.inject(MovieService); // Inyecta el servicio
    httpMock = TestBed.inject(HttpTestingController); // Inyecta el controlador de pruebas HTTP
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes HTTP pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Verifica que el servicio se crea correctamente
  });

  it('should fetch movies from the correct URL', () => {
    const mockMovies: Movie[] = [
      { id: 1, titulo: 'Movie 1', director: 'Director 1', anio: 2021 },
      { id: 2, titulo: 'Movie 2', director: 'Director 2', anio: 2022 }
    ];

    service.getMovies().subscribe(movies => {
      expect(movies).toEqual(mockMovies); // Verifica que las películas recibidas son las esperadas
    });

    // Simula la solicitud HTTP y verifica la URL
    const req = httpMock.expectOne('assets/data/peliculas.json');
    expect(req.request.method).toBe('GET'); // Verifica que el método HTTP sea GET
    req.flush(mockMovies); // Responde con datos simulados
  });
});