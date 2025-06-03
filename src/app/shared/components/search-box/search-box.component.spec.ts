import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ElementRef } from '@angular/core';
import { SearchBoxComponent } from './search-box.component';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

    await TestBed.configureTestingModule({
      imports: [SearchBoxComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('toggleMenu debe alternar menuVisible', () => {
    expect(component.menuVisible).toBeFalse();
    component.toggleMenu();
    expect(component.menuVisible).toBeTrue();
    component.toggleMenu();
    expect(component.menuVisible).toBeFalse();
  });

  it('goToProfile debe ocultar el menú y navegar a /profile', () => {
    component.menuVisible = true;
    component.goToProfile();
    expect(component.menuVisible).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('logout debe ocultar el menú, llamar logout y navegar a /login', () => {
    component.menuVisible = true;
    component.logout();
    expect(component.menuVisible).toBeFalse();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('searchTag debe leer el valor del input', () => {
    const inputElement = document.createElement('input');
    inputElement.value = 'Spiderman';
    component.input = new ElementRef(inputElement);

    spyOn(console, 'log');
    component.searchTag();
    expect(console.log).toHaveBeenCalledWith('Spiderman');
  });
});
