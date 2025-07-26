import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Train } from '../models/train';

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
    private router: Router
  ) {
    // Set default journey date to today (26/07/2025 format)
    const today = new Date();
    this.journeyDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;
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
      const bookingData = {
        userId: this.userId,
        train: this.selectedTrain,
        journeyDate: this.journeyDate,
        noOfSeats: this.noOfSeats,
        selectedClass: this.selectedClass,
        berthPreference: this.berthPreference
      };

      console.log('Booking data:', bookingData);
      
      // Here you would typically call a service to submit the booking
      alert('Booking successful!');
      this.router.navigate(['/booking']);
    } else {
      alert('Please fill in all required fields.');
    }
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
}
