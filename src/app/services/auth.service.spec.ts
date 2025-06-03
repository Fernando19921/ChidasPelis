import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  const platformId = 'browser';

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
        { provide: PLATFORM_ID, useValue: platformId }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'token') return null;
      return null;
    });
    spyOn(localStorage, 'setItem').and.stub();
    spyOn(localStorage, 'removeItem').and.stub();
    spyOn(console, 'log').and.stub(); // Evita logs en consola
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe llamar a login y guardar el token en localStorage', (done) => {
    const mockResponse = { token: 'abc123' };

    service.login('test@mail.com', '1234').subscribe(res => {
      expect(res).toEqual(mockResponse);
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'abc123');
      expect(service.isLoggedIn$.value).toBeTrue();
      done();
    });

    const req = httpMock.expectOne('http://localhost:5063/api/users/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('debe manejar error en login', (done) => {
    service.login('test@mail.com', '1234').subscribe({
      next: () => {},
      error: () => {
        expect(service.isLoggedIn$.value).toBeFalse();
        done();
      }
    });

    const req = httpMock.expectOne('http://localhost:5063/api/users/login');
    req.flush({ message: 'error' }, { status: 401, statusText: 'Unauthorized' });
  });

  it('debe llamar a register', () => {
    const mockData = {
      email: 'a@a.com',
      password: '1234',
      firstName: 'Test',
      lastName: 'User'
    };

    service.register(mockData).subscribe();
    const req = httpMock.expectOne('http://localhost:5063/api/users/register');
    expect(req.request.method).toBe('POST');
    req.flush({});
  });

  it('debe llamar a getProfile con el header correcto', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue('abc123');

    service.getProfile().subscribe();
    const req = httpMock.expectOne('http://localhost:5063/api/users/profile');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer abc123');
    req.flush({});
  });

  it('debe eliminar el token y navegar al logout', () => {
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    expect(service.isLoggedIn$.value).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['login']);
  });

  it('debe retornar false en isAuthenticated si no hay token', () => {
    (localStorage.getItem as jasmine.Spy).and.returnValue(null);
    expect(service.isAuthenticated()).toBeFalse();
  });
});
