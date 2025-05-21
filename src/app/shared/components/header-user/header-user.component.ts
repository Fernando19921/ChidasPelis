import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchBoxComponent } from '@shared/search-box/search-box.component';

@Component({
  selector: 'app-header-user',
  standalone: true,
  imports: [RouterModule,SearchBoxComponent],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.scss'
})
export class HeaderUserComponent {

}
