// Importaciones necesarias para pruebas unitarias de Angular y el componente
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';
import { MovieI } from 'src/app/interfaces/movie-interface';

// Suite de pruebas para MovieCardComponent
describe('MovieCardComponent', () => {
  // Declaración de variables para el componente y su fixture
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;

  // Mock de una película para usar en las pruebas
  const mockMovie: MovieI = {
    id: 1,
    titulo: 'El Padrino',
    director: 'Francis Ford Coppola',
    anio: 1972,
    genero: 'Crimen',
    img: 'el-padrino.jpg',
    trailer: 'https://youtu.be/sY1S34973zA'
  };

  // Configuración antes de cada prueba
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent], // Importa el componente a probar
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent); // Crea el fixture del componente
    component = fixture.componentInstance; // Obtiene la instancia del componente
    // Asignar valores iniciales al componente
    component.movies = mockMovie;
    component.index = 1;
    fixture.detectChanges(); // Detecta cambios iniciales
  });

  // Prueba: debe lanzar error si no se proporciona movies
  it('debe lanzar error si no se proporciona movies', () => {
    component.movies = undefined as any; // Elimina la propiedad movies
    expect(() => component.ngOnInit()).toThrowError('Movie property is required'); // Espera que lance error
  });

  // Prueba: debe establecer hasLoaded en true después del delay correspondiente
  it('debe establecer hasLoaded en true después del delay', fakeAsync(() => {
    component.ngOnInit(); // Llama al ciclo de vida ngOnInit
    expect(component.hasLoaded).toBeFalse(); // Debe ser falso antes del tick
    tick(300 + (component.index * 400)); // Simula el paso del tiempo
    expect(component.hasLoaded).toBeTrue(); // Debe ser verdadero después del tick
  }));

  // Prueba: debe emitir addToFavorites si no es favorito
  it('debe emitir addToFavorites si no es favorito', () => {
    spyOn(component.addToFavorites, 'emit'); // Espía el evento addToFavorites
    component.isFavorite = false; // No es favorito
    component.movies = mockMovie; // Asigna la película mock
    component.onToggleFavorite(); // Llama al método
    expect(component.addToFavorites.emit).toHaveBeenCalledWith(mockMovie.id); // Debe emitir el id
  });

  // Prueba: debe emitir removeFromFavorites si es favorito
  it('debe emitir removeFromFavorites si es favorito', () => {
    spyOn(component.removeFromFavorites, 'emit'); // Espía el evento removeFromFavorites
    component.isFavorite = true; // Es favorito
    component.movies = mockMovie; // Asigna la película mock
    component.onToggleFavorite(); // Llama al método
    expect(component.removeFromFavorites.emit).toHaveBeenCalledWith(mockMovie.id); // Debe emitir el id
  });
});
