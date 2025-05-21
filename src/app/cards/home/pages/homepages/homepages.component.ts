import { Component } from '@angular/core';
import { HeaderUserComponent } from '@shared/components/header-user/header-user.component';

import { MovieCardComponent } from 'src/app/cards/components/card/movie-card.component';

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
