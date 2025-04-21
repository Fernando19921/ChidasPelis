import { Routes } from '@angular/router';
import { LoginComponent } from '@module/auth/login/login.component';
import { HomepagesComponent } from '@module/home/pages/homepages/homepages.component';


export const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'

  },
  {
    path:'login',
    component:LoginComponent

  },
  {
    path:'home',
    component:HomepagesComponent
  }

];
