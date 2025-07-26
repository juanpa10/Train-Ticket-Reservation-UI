import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainService } from '../services/train.service';
import { NotificationService } from '../services/notification.service';
import { Booking } from '../models/booking';

@Component({
  selector: 'app-booking-history',
  imports: [CommonModule],
  templateUrl: './booking-history.component.html',
  styleUrl: './booking-history.component.css'
})
export class BookingHistoryComponent implements OnInit {
  bookings: Booking[] = [];
  userId = 'shashi@demo.com'; // Usuario quemado por ahora
  isLoading = false;

  constructor(
    private trainService: TrainService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadBookingHistory();
  }

  loadBookingHistory(): void {
    this.isLoading = true;
    this.trainService.getBookingHistory(this.userId).subscribe({
      next: (response: Booking[]) => {
        console.log('Booking history fetched successfully:', response);
        this.bookings = response;
        this.isLoading = false;
        if (response.length > 0) {
          this.notificationService.showInfo('History Loaded', `Found ${response.length} booking(s)`);
        }
      },
      error: (error: any) => {
        console.error('Error fetching booking history:', error);
        this.isLoading = false;
        this.notificationService.showError('Error', 'Failed to load booking history. Please try again.');
      }
    });
  }

  // Convertir timestamp a fecha legible
  formatDate(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-GB'); // DD/MM/YYYY format
  }

  // Formatear el monto con símbolo de moneda
  formatAmount(amount: number): string {
    return `€${amount.toFixed(2)}`;
  }
}
