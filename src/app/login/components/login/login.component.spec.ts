import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { LoginComponent } from './login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ✅ necesario
import { AuthService } from 'src/app/services/auth.service'; // Asegura que el servicio esté importado

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // 🔁 Creamos un espía para simular el Router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,              // ✅ componente standalone
        HttpClientTestingModule      // ✅ evita errores con HttpClient
      ],
      providers: [
        { provide: Router, useValue: routerSpy }, // ✅ mock Router
        AuthService                                 // ✅ se inyecta correctamente
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /home on validate()', () => {
    // ⚠️ Simula que el login fue exitoso si el método depende de alguna lógica
    spyOn(component['authService'], 'login').and.returnValue({
      subscribe: (observer: any) => {
        observer.next({ token: 'abc123' });
      }
    } as any);

    // Simula valores válidos para el formulario (si aplica)
    component.email= 'test@example.com';
    component.password = '123456';

    component.validate();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['home']);
  });
});
