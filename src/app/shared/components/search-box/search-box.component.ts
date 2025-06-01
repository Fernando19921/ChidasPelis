import { HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; // si vas a redirigir
import { AuthService } from 'src/app/services/auth.service'; // si vas a cerrar sesión

@Component({
  selector: 'card-search-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-search-box.component.html',
  styleUrl: './card-search-box.component.scss'
})
export class SearchBoxComponent {
  menuVisible = false;

  @ViewChild('txtTagInput')
  input!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  searchTag() {
    const newTag = this.input.nativeElement.value;
    console.log(newTag);
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  goToProfile(): void {
    this.menuVisible = false;
    this.router.navigate(['/profile']);
  }

  logout(): void {
    this.menuVisible = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }


@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.user-icon')) {
    this.menuVisible = false;
  }
}

}
