import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { ApiResponse, TrainListResponse } from '../models/api-response';
import { Train } from '../models/train';
import { Book } from '../models/book';
import { Booking } from '../models/booking';
import { environment } from '../../enviroments/environment';

@Injectable({ providedIn: 'root' })
export class TrainService {

  /** base URL para todos los servicios REST; cambia según el *environment*   */
  private readonly base       = `${environment.apiUrl}/trains`;
  private readonly bookingBase = `${environment.apiUrl}/bookings`;

  constructor(private http: HttpClient) {}

  addTrain(train: Train): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.base, train);
  }

  getTrains(): Observable<Train[]> {
    return this.http.get<Train[]>(this.base);
  }

  getTrain(id: number): Observable<Train> {
    return this.http.get<Train>(`${this.base}/${id}`);
  }

  updateTrain(t: Train): Observable<ApiResponse> {
    return this.http.put<ApiResponse>(`${this.base}/${t.tr_no}`, t);
  }

  deleteTrain(id: number): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(`${this.base}/${id}`);
  }

  bookTrain(booking: Book): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.bookingBase, booking);
  }

  getBookingHistory(mailId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.bookingBase}/${mailId}`);
  }
}
