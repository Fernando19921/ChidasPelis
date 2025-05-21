import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  // Declaración de variables necesarias para las pruebas
  let component: LoginComponent; // Instancia del componente que se probará
  let fixture: ComponentFixture<LoginComponent>; // Fixture para manejar el entorno de pruebas del componente
  let routerSpy: jasmine.SpyObj<Router>; // Mock del servicio Router para espiar sus métodos

  beforeEach(async () => {
    // Crea un mock del Router con el método 'navigate'
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    // Configura el módulo de pruebas para el componente
    await TestBed.configureTestingModule({
      imports: [LoginComponent], // ✅ Importa el componente standalone
      providers: [
        { provide: Router, useValue: routerSpy } // ✅ Proporciona el mock del Router
      ]
    }).compileComponents(); // Compila los componentes necesarios para las pruebas

    // Crea la instancia del componente y su fixture
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Detecta cambios iniciales en el componente
  });

  // Prueba para verificar que el componente se crea correctamente
  it('should create', () => {
    expect(component).toBeTruthy(); // Comprueba que la instancia del componente no sea nula
  });

  // Prueba para verificar que el método onSubmit navega a '/home'
  it('should navigate to /home on submit', () => {
    component.onSubmit(); // Llama al método onSubmit del componente
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']); // Verifica que se haya llamado a navigate con el argumento correcto
  });
});

