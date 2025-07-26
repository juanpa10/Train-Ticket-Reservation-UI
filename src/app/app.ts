import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = '';
  breadcrumbs: string[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
     this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
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
}
