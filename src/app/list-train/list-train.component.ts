import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrainService } from '../services/train.service';
import { Train } from '../models/train';
import { NotificationService } from '../services/notification.service';
import { ConfirmationModalComponent } from '../shared/confirmation-modal.component';

@Component({
  selector: 'app-list-train',
  imports: [CommonModule, ConfirmationModalComponent],
  templateUrl: './list-train.component.html',
  styleUrl: './list-train.component.css'
})
export class ListTrainComponent implements OnInit {
  trains: Train[] = [];
  isLoading = false;

  // Modal properties
  showDeleteModal = false;
  trainToDelete: Train | null = null;

  constructor(
    private trainService: TrainService,
    private router: Router,
    private notificationService: NotificationService
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
        if (response.length > 0) {
          this.notificationService.showSuccess('Success', `${response.length} trains loaded successfully`);
        }
      },
      error: (error: any) => {
        console.error('Error loading trains:', error);
        this.isLoading = false;
        this.notificationService.showError('Error', 'Failed to load trains. Please try again.');
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
    this.trainToDelete = train;
    this.showDeleteModal = true;
  }

  confirmDelete(): void {
    if (this.trainToDelete) {
      this.trainService.deleteTrain(this.trainToDelete.tr_no).subscribe({
        next: (response) => {
          console.log('Train deleted successfully:', response);
          this.notificationService.showSuccess('Success', `Train ${this.trainToDelete!.tr_name} deleted successfully!`);
          this.loadTrains(); // Reload the list
          this.showDeleteModal = false;
          this.trainToDelete = null;
        },
        error: (error) => {
          console.error('Error deleting train:', error);
          this.notificationService.showError('Error', 'Failed to delete train. Please try again.');
          this.showDeleteModal = false;
          this.trainToDelete = null;
        }
      });
    }
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.trainToDelete = null;
  }
}
