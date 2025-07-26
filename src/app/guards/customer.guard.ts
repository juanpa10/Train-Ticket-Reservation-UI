import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(): boolean {
    if (this.authService.canAccessBooking()) {
      return true;
    } else {
      this.notificationService.showError('Access Denied', 'You need CUSTOMER privileges to access this section');
      this.router.navigate(['/list-train']);
      return false;
    }
  }
}
