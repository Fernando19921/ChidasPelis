import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card.component';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent; // Instancia del componente que se probará
  let fixture: ComponentFixture<MovieCardComponent>; // Fixture para manejar el entorno de pruebas del componente

  beforeEach(async () => {
    // Configuración del módulo de pruebas
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent, HttpClientTestingModule] // Importa el componente standalone y el módulo de pruebas HTTP
    })
    .compileComponents(); // Compila los componentes necesarios para las pruebas

    // Crea la instancia del componente y su fixture
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Detecta cambios iniciales en el componente
    localStorage.clear(); // Limpia el localStorage antes de cada prueba
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Comprueba que la instancia del componente no sea nula
  });

  // Prueba para verificar que se agrega un ID a favoritos si no está ya almacenado
  it('should add id to favorites if not already stored', () => {
    spyOn(window, 'alert'); // Espía la función alert del navegador

    component.addToFavorites(1); // Llama al método para agregar el ID 1 a favoritos

    const idStorage = localStorage.getItem('movieId'); // Obtiene los IDs almacenados en localStorage
    const ids = idStorage ? JSON.parse(idStorage) : []; // Convierte los IDs almacenados en un array

    expect(ids).toContain(1); // Verifica que el ID 1 se haya agregado a favoritos
    expect(window.alert).toHaveBeenCalledWith('ID 1 guardado en favoritos'); // Verifica que se haya mostrado el mensaje de alerta correcto
  });

  // Prueba para verificar que no se agrega un ID si ya está en favoritos
  it('should not add id if already in favorites', () => {
    localStorage.setItem('movieId', JSON.stringify([1])); // Simula que el ID 1 ya está almacenado en localStorage
    spyOn(window, 'alert'); // Espía la función alert del navegador

    component.addToFavorites(1); // Llama al método para intentar agregar el ID 1 a favoritos

    const idStorage = localStorage.getItem('movieId'); // Obtiene los IDs almacenados en localStorage
    const ids = idStorage ? JSON.parse(idStorage) : []; // Convierte los IDs almacenados en un array

    expect(ids.length).toBe(1); // Verifica que no se haya agregado un nuevo ID
    expect(window.alert).toHaveBeenCalledWith('El ID 1 ya está en favoritos'); // Verifica que se haya mostrado el mensaje de alerta correcto
  });
});
