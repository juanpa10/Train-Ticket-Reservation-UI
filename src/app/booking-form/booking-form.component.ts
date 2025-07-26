import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Train } from '../models/train';
import { Book } from '../models/book';
import { TrainService } from '../services/train.service';

@Component({
  selector: 'app-booking-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-form.component.html',
  styleUrl: './booking-form.component.css'
})
export class BookingFormComponent implements OnInit {
  userId = 'shashi@demo.com';
  selectedTrain: Train | null = null;
  
  // Form fields
  journeyDate: string = '';
  noOfSeats: number = 1;
  selectedClass: string = '';
  berthPreference: string = '';

  // Modal and payment fields
  showPaymentModal: boolean = false;
  cardNumber: string = '';
  expirationDate: string = '';
  cvcCode: string = '';
  cardOwner: string = '';
  isProcessingPayment: boolean = false;

  // Options for selects
  classOptions = [
    { value: 'SL', label: 'Sleeper (SL)' },
    { value: '2S', label: 'Second Sittings (2S)' },
    { value: '1A', label: 'AC First Class (1A)' },
    { value: '2A', label: 'AC 2 Tier (2A)' }
  ];

  berthOptions = [
    { value: '', label: 'No Preference' },
    { value: 'LB', label: 'Lower Berth (LB)' },
    { value: 'UB', label: 'Upper Berth (UB)' },
    { value: 'CABIN', label: 'Cabin' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainService: TrainService
  ) {
    // Set default journey date to today in YYYY-MM-DD format for date input
    const today = new Date();
    this.journeyDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    // Get train data from query parameters
    this.route.queryParams.subscribe(params => {
      if (params['tr_no']) {
        this.selectedTrain = {
          tr_no: parseInt(params['tr_no']),
          tr_name: params['tr_name'] || '',
          from_stn: params['from_stn'] || '',
          to_stn: params['to_stn'] || '',
          seats: parseInt(params['seats']) || 0,
          fare: parseFloat(params['fare']) || 0
        };
      } else {
        // If no train data, redirect back to booking
        this.router.navigate(['/booking']);
      }
    });
  }

  onPayAndBook(): void {
    if (this.isFormValid()) {
      // Show payment modal instead of directly booking
      this.showPaymentModal = true;
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // Close payment modal
  closePaymentModal(): void {
    this.showPaymentModal = false;
    this.clearPaymentFields();
  }

  // Clear payment form fields
  clearPaymentFields(): void {
    this.cardNumber = '';
    this.expirationDate = '';
    this.cvcCode = '';
    this.cardOwner = '';
  }

  // Validate payment form
  isPaymentFormValid(): boolean {
    return !!(
      this.cardNumber &&
      this.expirationDate &&
      this.cvcCode &&
      this.cardOwner
    );
  }

  // Confirm payment and create booking
  confirmPayment(): void {
    if (!this.isPaymentFormValid()) {
      alert('Please fill in all payment fields.');
      return;
    }

    if (!this.selectedTrain) {
      alert('Train information is missing.');
      return;
    }

    this.isProcessingPayment = true;

    // Calculate total amount (fare * number of seats)
    const totalAmount = (this.selectedTrain.fare * this.noOfSeats).toString();

    // Create booking object
    const booking: Book = {
      mailId: this.userId,
      from_stn: this.selectedTrain.from_stn,
      to_stn: this.selectedTrain.to_stn,
      date: this.journeyDate, // YYYY-MM-DD format
      tr_no: this.selectedTrain.tr_no,
      amount: totalAmount,
      seats: this.noOfSeats
    };

    // Call booking service
    this.trainService.bookTrain(booking).subscribe({
      next: (response) => {
        this.isProcessingPayment = false;
        console.log('Booking successful:', response);
        alert('Booking confirmed successfully!');
        this.closePaymentModal();
        this.router.navigate(['/booking']);
      },
      error: (error) => {
        this.isProcessingPayment = false;
        console.error('Booking failed:', error);
        alert('Booking failed. Please try again.');
      }
    });
  }

  isFormValid(): boolean {
    return !!(
      this.journeyDate &&
      this.noOfSeats &&
      this.noOfSeats > 0 &&
      this.noOfSeats <= (this.selectedTrain?.seats || 0) &&
      this.selectedClass
    );
  }

  goBack(): void {
    this.router.navigate(['/booking']);
  }

  // Función para formatear la fecha a DD/MM/YYYY
  formatDateForDisplay(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
  }

  // Función para obtener la fecha mínima (hoy)
  getMinDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
