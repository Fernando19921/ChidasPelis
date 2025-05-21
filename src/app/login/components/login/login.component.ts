// src/app/login/components/login/login.component.ts
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule,CommonModule]
})
export class LoginComponent {
  user = '';
  password = '';
  error = false;

  constructor(private router: Router, private authService: AuthService) {}

  validate(): void {
    const success = this.authService.login(this.user, this.password);
    if (success) {
      this.router.navigate(['/home']);
    } else {
      this.error = true;
    }
  }
}
