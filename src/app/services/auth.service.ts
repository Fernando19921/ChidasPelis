import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USERNAME = 'admin';
  private readonly PASSWORD = '1234';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    console.log('[AuthService] login() ejecutado con:', username, password);

    if (username === this.USERNAME && password === this.PASSWORD) {
      localStorage.setItem('isLoggedIn', 'true');
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['login']);
    console.log('[AuthService] Usuario no autenticado. Sesión cerrada.');
  }

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('isLoggedIn') === 'true';
  }
}
