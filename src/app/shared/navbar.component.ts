import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary" *ngIf="currentUser">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="assets/train-logo.png" height="30" alt="Train Booking" class="me-2">
          Train Booking System
        </a>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <!-- Admin Navigation -->
            <ng-container *ngIf="currentUser.role === 'ADMIN'">
              <li class="nav-item">
                <a class="nav-link" routerLink="/list-train" routerLinkActive="active">
                  <i class="fas fa-list me-1"></i>Manage Trains
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/add-train" routerLinkActive="active">
                  <i class="fas fa-plus me-1"></i>Add Train
                </a>
              </li>
            </ng-container>
            
            <!-- Customer Navigation -->
            <ng-container *ngIf="currentUser.role === 'CUSTOMER'">
              <li class="nav-item">
                <a class="nav-link" routerLink="/booking" routerLinkActive="active">
                  <i class="fas fa-train me-1"></i>Book Ticket
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/booking-history" routerLinkActive="active">
                  <i class="fas fa-history me-1"></i>My Bookings
                </a>
              </li>
            </ng-container>
          </ul>
          
          <ul class="navbar-nav">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                <i class="fas fa-user-circle me-1"></i>
                {{ currentUser.username }} 
                <span class="badge bg-secondary ms-1">{{ currentUser.role }}</span>
              </a>
              <ul class="dropdown-menu">
                <li><hr class="dropdown-divider"></li>
                <li>
                  <a class="dropdown-item" href="#" (click)="logout()">
                    <i class="fas fa-sign-out-alt me-1"></i>Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar-brand img {
      border-radius: 5px;
    }
    
    .nav-link.active {
      background-color: rgba(255,255,255,0.1);
      border-radius: 5px;
    }
    
    .badge {
      font-size: 0.7em;
    }
    
    .dropdown-item:hover {
      background-color: #f8f9fa;
    }
  `]
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  private userSubscription: Subscription | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUser$.subscribe(
      user => this.currentUser = user
    );
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
