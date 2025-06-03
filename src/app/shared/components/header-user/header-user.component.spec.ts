import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderUserComponent } from './header-user.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // 👈 necesario para AuthService

describe('HeaderUserComponent', () => {
  let component: HeaderUserComponent;
  let fixture: ComponentFixture<HeaderUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderUserComponent,         // Standalone component
        RouterTestingModule,         // Para routerLink, router.navigate, etc.
        HttpClientTestingModule      // ✅ Para que AuthService funcione sin error
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
