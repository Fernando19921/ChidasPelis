// Importamos funciones y servicios necesarios desde Angular
import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

// Definimos un "guardia de ruta" que protege el acceso a ciertas rutas
export const AuthGuard: CanActivateFn = (): boolean | UrlTree => {
  // Obtenemos una instancia del servicio de autenticación
  const authService = inject(AuthService);

  // Obtenemos una instancia del enrutador para hacer redirecciones si es necesario
  const router = inject(Router);

  // Verificamos si el usuario está autenticado
  const isLoggedIn = authService.isAuthenticated();

  // Si el usuario NO está autenticado
  if (isLoggedIn === false) {
    console.log('[AuthGuard] Usuario no autenticado. Redirigiendo a /login');

    // Redirigimos al login usando parseUrl (esto recarga el componente aunque ya estés en /login)
    return router.parseUrl('login');
  }

  // Si el usuario está autenticado, se permite el acceso a la ruta
  return true;
};
