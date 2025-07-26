import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrainService } from '../services/train.service';
import { NotificationService } from '../services/notification.service';
import { Train } from '../models/train';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  imports: [CommonModule],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  trains: Train[] = [];
  trainTimes: Map<number, string> = new Map(); // Almacenar tiempos por train number

  constructor(
    private trainService: TrainService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  // Función para generar tiempo aleatorio en formato HH:mm
  generateRandomTime(): string {
    const hours = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const minutes = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  // Función para obtener el tiempo de un tren específico
  getTrainTime(trainNo: number): string {
    return this.trainTimes.get(trainNo) || '00:00';
  }

  // Función para navegar al formulario de reserva
  bookTrain(train: Train): void {
    // Convertir el objeto train a query parameters
    const queryParams = {
      tr_no: train.tr_no.toString(),
      tr_name: train.tr_name,
      from_stn: train.from_stn,
      to_stn: train.to_stn,
      seats: train.seats.toString(),
      fare: train.fare.toString()
    };
    
    this.router.navigate(['/booking-form'], { queryParams });
  }

  ngOnInit(): void {
    this.trainService.getTrains().subscribe({
      next: (response) => {
        console.log('Trains fetched successfully:', response);
        this.trains = response; // response is directly an array of Train objects
        
        // Generar tiempos aleatorios una sola vez para cada tren
        this.trains.forEach(train => {
          this.trainTimes.set(train.tr_no, this.generateRandomTime());
        });
        
        if (response.length > 0) {
          this.notificationService.showInfo('Trains Loaded', `${response.length} trains available for booking`);
        }
      },
      error: (error) => { 
        console.error('Error fetching trains:', error);
        this.notificationService.showError('Error', 'Failed to load trains. Please refresh the page.');
      }
    });
  }

}
