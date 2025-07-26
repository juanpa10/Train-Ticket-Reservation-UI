import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TrainService } from '../../services/train.service';
import { Train } from '../../models/train';

@Component({
  selector: 'app-list-train',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-train.html',
  styleUrls: ['./list-train.css']
})
export class ListTrainComponent implements OnInit {
  trains: Train[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    private trainService: TrainService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTrains();
  }

  loadTrains() {
    this.loading = true;
    this.error = null;
    
    this.trainService.getTrains().subscribe({
      next: (trains) => {
        console.log('Trains loaded:', trains);
        this.trains = trains || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading trains:', error);
        this.error = 'Error loading trains. Please try again.';
        this.loading = false;
      }
    });
  }

  addNewTrain() {
    this.router.navigate(['/add-train']);
  }

  editTrain(train: Train) {
    this.router.navigate(['/add-train'], {
      queryParams: {
        edit: 'true',
        tr_no: train.tr_no,
        tr_name: train.tr_name,
        from_stn: train.from_stn,
        to_stn: train.to_stn,
        seats: train.seats,
        fare: train.fare
      }
    });
  }

  deleteTrain(train: Train) {
    if (confirm(`Are you sure you want to delete train ${train.tr_name}?`)) {
      this.trainService.deleteTrain(train.tr_no).subscribe({
        next: (response) => {
          console.log('Train deleted:', response);
          this.loadTrains(); // Reload the list
        },
        error: (error) => {
          console.error('Error deleting train:', error);
          alert('Error deleting train. Please try again.');
        }
      });
    }
  }
}
