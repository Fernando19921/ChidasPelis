import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderUserComponent } from '@shared/components/header-user/header-user.component';





@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
}
