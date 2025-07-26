import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, TrainListResponse } from '../models/api-response';
import { Train } from '../models/train';
import { Book } from '../models/book';

@Injectable({ providedIn: 'root' })
export class TrainService {
  //private base = '/api/trains';
  private base = 'http://localhost:8080/TrainBook/api/trains'; // Si no usas proxy
  private bookingBase = 'http://localhost:8080/TrainBook/api/bookings'; // Endpoint para booking
  
  constructor(private http: HttpClient) {}

  addTrain(train: Train): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.base, train);
  }

  getTrains(): Observable<Train[]> {
    return this.http.get<Train[]>(this.base);
  }

  bookTrain(booking: Book): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.bookingBase, booking);
  }
}
