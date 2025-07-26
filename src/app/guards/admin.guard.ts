import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(): boolean {
    if (this.authService.canAccessTrainManagement()) {
      return true;
    } else {
      this.notificationService.showError('Access Denied', 'You need ADMIN privileges to access this section');
      this.router.navigate(['/booking']);
      return false;
    }
  }
}
