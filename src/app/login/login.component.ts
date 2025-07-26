import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { LoginRequest } from '../models/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  selectedRole: 'ADMIN' | 'CUSTOMER' = 'CUSTOMER';
  isLoading = false;
  rememberMe = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  onSubmit(): void {
    if (!this.username || !this.password) {
      this.notificationService.showError('Validation Error', 'Please enter both username and password');
      return;
    }

    this.isLoading = true;

    const loginRequest: LoginRequest = {
      username: this.username,
      password: this.password,
      role: this.selectedRole
    };

    this.authService.login(loginRequest).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.notificationService.showSuccess('Login Successful', `Welcome ${this.username}!`);
          
          // Redirect based on role
          if (this.selectedRole === 'ADMIN') {
            this.router.navigate(['/list-train']);
          } else {
            this.router.navigate(['/booking']);
          }
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Login error:', error);
        
        // Manejar diferentes tipos de errores
        if (error.status === 401) {
          this.notificationService.showError('Invalid Credentials', 'Username or password is incorrect. Please try again.');
        } else if (error.status === 0) {
          this.notificationService.showError('Connection Error', 'Unable to connect to the server. Please check your connection.');
        } else {
          this.notificationService.showError('Login Error', error.message || 'An unexpected error occurred during login.');
        }
      }
    });
  }
}
