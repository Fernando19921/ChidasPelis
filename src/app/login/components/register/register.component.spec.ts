import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [RegisterComponent, FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    // Evita navegación real al iniciar
    spyOn(localStorage, 'setItem').and.stub();
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe redirigir a /mx/register al iniciar', () => {
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/mx/register'], { replaceUrl: true });
  });

  it('debe llamar al servicio register y guardar el token', () => {
    const fakeToken = 'abc123';
    component.firstName = 'Juan';
    component.lastName = 'Pérez';
    component.email = 'juan@example.com';
    component.password = '123456';

    authServiceSpy.register.and.returnValue(of({ token: fakeToken }));

    component.register();

    expect(authServiceSpy.register).toHaveBeenCalledWith({
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan@example.com',
      password: '123456'
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', fakeToken);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    expect(component.error).toBeFalse();
  });

  it('debe establecer error en true si el status es 409', () => {
    authServiceSpy.register.and.returnValue(throwError({ status: 409 }));

    component.register();

    expect(component.error).toBeTrue();
  });

  it('volverAlLogin debe navegar a /mx/login y emitir evento', () => {
    spyOn(component.volver, 'emit');

    component.volverAlLogin();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/mx/login']);
    expect(component.volver.emit).toHaveBeenCalled();
  });
});
