import { Component } from '@angular/core';
import { MovieCardComponent } from '@module/movie-card/movie-card.component';
import { HeaderUserComponent } from '@shared/components/header-user/header-user.component';

@Component({
  selector: 'app-homepages',
  standalone: true,
  imports: [       // 👈 Este es el cambio importante
    HeaderUserComponent,
    MovieCardComponent
  ],
  templateUrl: './homepages.component.html',
  styleUrls: ['./homepages.component.scss']
})
export class HomepagesComponent {}
