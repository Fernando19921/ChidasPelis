import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderUserComponent } from './header-user.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderUserComponent', () => {
  let component: HeaderUserComponent;
  let fixture: ComponentFixture<HeaderUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderUserComponent, RouterTestingModule] // Importa el componente standalone y el módulo de pruebas de enrutamiento
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detecta cambios iniciales
  });

  it('should create', () => {
    expect(component).toBeTruthy(); // Verifica que el componente se crea correctamente
  });
});