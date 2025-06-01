import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Register} from 'src/app/interfaces/register-interface';


@Component({
  selector: 'login-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  showRegister:boolean=false;
  error = false;

  constructor(private router: Router, private authService:AuthService) {}

  ngOnInit(): void {
    // Cambia la URL a /mx/register al cargar el componente
    this.router.navigate(['/mx/register'], { replaceUrl: true });
  }
 @Output() volver = new EventEmitter<boolean>();

register() {
  const userData: Register = {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    password: this.password
  };

  this.authService.register(userData).subscribe({
    next: res => {
      this.error = false;
      localStorage.setItem('token', res.token); // ✅ Guarda el token
      this.router.navigate(['/home']); // ✅ Redirige al home protegido
    },
    error: err => {
      if (err.status === 409) {
        this.error = true;
      }
    }
  });
}


  volverAlLogin() {
    this.router.navigate(['/mx/login']);
    this.volver.emit();// ← aquí se lo dice al padre
  }
}
