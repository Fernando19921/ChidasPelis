import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { LazyImgComponent } from '@shared/components/lazy-img/lazy-img.component';
import { MovieI } from 'src/app/interfaces/movie-interface';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  imports:[LazyImgComponent,CommonModule]
})
export class MovieCardComponent implements OnInit {
  @Input() movies!: MovieI;
  @Input() isFavorite: boolean = false;
  @Input() index: number = 0; // nuevo input para controlar el orden
  @Output() addToFavorites = new EventEmitter<number>();
  @Output() removeFromFavorites = new EventEmitter<number>();
  
  hasLoaded:boolean=false;



ngOnInit(): void {
  if (!this.movies) throw new Error("Movie property is required");
  console.log('Tarjeta:', this.movies.titulo, 'índice:', this.index);

  // Simula un delay diferente por tarjeta
  const delay = 300 + (this.index * 400); // cada tarjeta se retrasa 200ms más que la anterior

  setTimeout(() => {
    this.hasLoaded = true;
  }, delay);
}


  onToggleFavorite(): void {
    if (this.isFavorite) {
      this.removeFromFavorites.emit(this.movies.id);
    } else {
      this.addToFavorites.emit(this.movies.id);
    }
  }
}

