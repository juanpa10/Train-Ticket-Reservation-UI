import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = '';
  breadcrumbs: string[] = [];
  isLoginPage = false;
  currentUser: any = null;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    // Subscribe to user changes
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Track navigation changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          // Check if current route is login
          this.isLoginPage = this.router.url === '/login';
          
          let currentRoute = this.route.root;
          while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
          }
          return currentRoute.snapshot.data;
        })
      )
      .subscribe(data => {
        this.title = data['title'] || 'Train Ticket Reservation';
        this.breadcrumbs = data['breadcrumbs'] || [];
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
