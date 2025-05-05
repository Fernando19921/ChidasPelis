import { Routes } from '@angular/router';
import { LoginComponent } from '@module/auth/login/login.component';
import { HomepagesComponent } from '@module/home/pages/homepages/homepages.component';
import { FavoritesMovieCardComponent } from '@module/movie-card/favorites-movie-card/favorites-movie-card.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'  // Redirige automáticamente al login si el usuario accede a la página raíz
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomepagesComponent
  },
  {
    path: 'favoritos',
    component: FavoritesMovieCardComponent
  }
];
