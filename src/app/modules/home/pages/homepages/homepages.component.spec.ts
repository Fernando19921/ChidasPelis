import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { HomepagesComponent } from './homepages.component';

describe('HomepagesComponent', () => {
  let component: HomepagesComponent;
  let fixture: ComponentFixture<HomepagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomepagesComponent, HttpClientModule], // ✅ si el componente es standalone
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // 🔁 simula parámetros de la ruta
            snapshot: {
              paramMap: {
                get: (key: string) => '123' // 🔁 simula acceso a parámetros por snapshot
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomepagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
