import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Register } from '../interfaces/register-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:5063/api/users';
  private readonly STORAGE_KEY = 'token';

  public isLoggedIn$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.syncWithLocalStorage();
  }

  private syncWithLocalStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.STORAGE_KEY);
      this.isLoggedIn$.next(!!token);
    }
  }

  login(email: string, password: string): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(`${this.url}/login`, { email, password }).subscribe({
        next: (res) => {
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem(this.STORAGE_KEY, res.token);
          }
          this.isLoggedIn$.next(true);
          observer.next(res);
        },
        error: (err) => {
          this.isLoggedIn$.next(false);
          observer.error(err);
        }
      });
    });
  }

  register(data: Register): Observable<any> {
    return this.http.post(`${this.url}/register`, data);
  }

  getProfile(): Observable<any> {
    const token = localStorage.getItem(this.STORAGE_KEY);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.url}/profile`, { headers });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.STORAGE_KEY);
    }
    this.isLoggedIn$.next(false);
    this.router.navigate(['login']);
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.STORAGE_KEY);
      return !!token;
    }
    return false;
  }
}
