// src/app/login/components/login/login.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RegisterComponent } from '../register/register.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule,CommonModule,RouterModule,RegisterComponent]
})
export class LoginComponent {
  email = '';
  password = '';
  error = false;
  loading=false;
  showRegister=false;



  constructor(private router: Router, private authService: AuthService) {}

  validate(): void {
    this.error=false;
    this.loading=true;

    this.authService.login(this.email,this.password).subscribe({
      next:(res)=>{
        localStorage.setItem("id",res.user.userId)
        this.loading=false;
        this.router.navigate(['home']);
      },
      error:(err)=>{
        this.loading=false;
        this.error=true;
        console.log(`[LoginComponent] Error de login:`,err);
      }
    })
  }

  handleVolverAlLogin() {
  this.showRegister = false;
  this.router.navigate(['/mx/login']); // ← opcional, si quieres que cambie la URL
}

}
