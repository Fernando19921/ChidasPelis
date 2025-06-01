import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { isPlatformBrowser } from '@angular/common';

function isTokenValid(token: string | null): boolean {
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp && exp > now;
  } catch (e) {
    return false;
  }
}

export const AuthGuard: CanActivateFn = (): boolean | UrlTree => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);


    if (!isPlatformBrowser(platformId)) {
    // SSR: no se puede validar, mejor bloquear
    return router.parseUrl('login');
  }

  const token = localStorage.getItem('token');
  const isValid = isTokenValid(token);

  if (!isValid) {
    console.log('[AuthGuard] Token inválido o expirado. Redirigiendo a /login');
    authService.logout();
    return router.parseUrl('login');
  }

  return true;
};
