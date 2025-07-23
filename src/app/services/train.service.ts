import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';
import { Train } from '../models/train';

@Injectable({ providedIn: 'root' })
export class TrainService {
  //private base = '/api/trains';
private base = 'http://localhost:8083/TrainBook/api/trains'; // Si no usas proxy
  constructor(private http: HttpClient) {}

  addTrain(train: Train): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.base, train);
  }
}
