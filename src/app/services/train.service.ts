import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Train } from '../models/train';

@Injectable({ providedIn: 'root' })
export class TrainService {
  //private base = '/api/trains';
private base = 'http://localhost:8080/TrainBook/api/trains'; // Si no usas proxy
  constructor(private http: HttpClient) {}

  addTrain(train: Train): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.base, train);
  }

  getAll(): Observable<Train[]> {
    // necesitas que tu backend soporte GET /api/trains (lista)
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

}