import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map, catchError, throwError } from 'rxjs';
import { LoginRequest, LoginResponse, User } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/TrainBook/api';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // Check if user is already logged in on service initialization
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  login(loginRequest: LoginRequest): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/login`, loginRequest, { responseType: 'text' })
      .pipe(
        map(response => {
          // Si llegamos aquí, el login fue exitoso (status 200)
          console.log('Login successful, response:', response);
          
          // Check if the response indicates success
          if (response && (response.includes('successful') || response.includes('success'))) {
            const user: User = {
              username: loginRequest.username,
              role: loginRequest.role
            };
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return true;
          } else {
            throw new Error('Login failed: Invalid response from server');
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('Login error:', error);
          
          // Manejar diferentes tipos de errores
          if (error.status === 401) {
            // Credenciales incorrectas
            return throwError(() => ({
              status: 401,
              message: 'Invalid credentials',
              error: 'Unauthorized'
            }));
          } else if (error.status === 0) {
            // Error de conexión (servidor no disponible)
            return throwError(() => ({
              status: 0,
              message: 'Connection error',
              error: 'Server not available'
            }));
          } else if (error.status === 200 && error.error && typeof error.error === 'string') {
            // Status 200 pero con error de parsing - significa que el servidor devolvió texto plano
            // pero contenía mensaje de error
            if (error.error.toLowerCase().includes('failed') || error.error.toLowerCase().includes('invalid')) {
              return throwError(() => ({
                status: 401,
                message: 'Invalid credentials',
                error: error.error
              }));
            } else {
              return throwError(() => ({
                status: 500,
                message: 'Server response error',
                error: error.error
              }));
            }
          } else {
            // Otros errores del servidor
            const errorMessage = typeof error.error === 'string' ? error.error : 
                               (error.error?.message || error.message || 'Login failed');
            return throwError(() => ({
              status: error.status,
              message: errorMessage,
              error: error.error || 'Unknown error'
            }));
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'ADMIN';
  }

  isCustomer(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'CUSTOMER';
  }

  canAccessTrainManagement(): boolean {
    return this.isLoggedIn() && this.isAdmin();
  }

  canAccessBooking(): boolean {
    return this.isLoggedIn() && this.isCustomer();
  }
}
