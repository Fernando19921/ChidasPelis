import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { MovieI } from '../interfaces/movie-interface';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  const mockMovies: MovieI[] = [
    {
      id: 1,
      titulo: 'El Padrino',
      director: 'Francis Ford Coppola',
      anio: 1972,
      genero: 'Crimen',
      img: 'el-padrino.jpg',
      trailer: 'https://youtu.be/sY1S34973zA'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService]
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();

    // 👇 Simula la petición automática al cargar el servicio
    const req = httpMock.expectOne('assets/data/peliculas.json');
    expect(req.request.method).toBe('GET');
    req.flush([]); // Puedes usar mockMovies si quieres validar datos reales
  });

  it('debe cargar las películas y exponerlas vía movieList$', (done) => {
    service.movieList$.subscribe(movies => {
      if (movies.length) {
        expect(movies).toEqual(mockMovies);
        done();
      }
    });

    const req = httpMock.expectOne('assets/data/peliculas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });

  it('getMovies debe retornar el observable de películas', (done) => {
    service.getMovies().subscribe(movies => {
      if (movies.length) {
        expect(movies).toEqual(mockMovies);
        done();
      }
    });

    const req = httpMock.expectOne('assets/data/peliculas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });
});
