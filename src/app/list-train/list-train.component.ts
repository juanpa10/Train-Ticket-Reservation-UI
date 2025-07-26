import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrainService } from '../services/train.service';
import { Train } from '../models/train';

@Component({
  selector: 'app-list-train',
  imports: [CommonModule],
  templateUrl: './list-train.component.html',
  styleUrl: './list-train.component.css'
})
export class ListTrainComponent implements OnInit {
  trains: Train[] = [];
  isLoading = false;

  constructor(
    private trainService: TrainService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadTrains();
  }

  loadTrains(): void {
    this.isLoading = true;
    this.trainService.getTrains().subscribe({
      next: (response: Train[]) => {
        console.log('Trains loaded successfully:', response);
        this.trains = response;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading trains:', error);
        this.isLoading = false;
      }
    });
  }

  addTrain(): void {
    this.router.navigate(['/add-train']);
  }

  editTrain(train: Train): void {
    // Navigate to add-train with train data in query params
    const queryParams = {
      mode: 'edit',
      tr_no: train.tr_no.toString(),
      tr_name: train.tr_name,
      from_stn: train.from_stn,
      to_stn: train.to_stn,
      seats: train.seats.toString(),
      fare: train.fare.toString()
    };
    this.router.navigate(['/add-train'], { queryParams });
  }

  deleteTrain(train: Train): void {
    if (confirm(`Are you sure you want to delete train ${train.tr_name} (${train.tr_no})?`)) {
      this.trainService.deleteTrain(train.tr_no).subscribe({
        next: (response) => {
          console.log('Train deleted successfully:', response);
          alert('Train deleted successfully!');
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
