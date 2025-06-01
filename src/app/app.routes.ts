import { Routes } from '@angular/router';
import { LoginComponent } from 'src/app/login/components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'mx',
    children:[
      {path:'**', component:LoginComponent}
    ]
  },
  {
    path: 'home',
    loadComponent: () => import('./cards/home/pages/homepages.component')
      .then(m => m.HomepagesComponent),
    canActivate: [AuthGuard]
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./cards/components/favorites-movie-card/favorites-movie-card.component')
      .then(m => m.FavoritesMovieCardComponent),
    canActivate: [AuthGuard] // ✅ ahora protegida
  },
  {
    path: '**',
    redirectTo:'mx' // ✅ evita rutas inválidas en blanco
  }
];
