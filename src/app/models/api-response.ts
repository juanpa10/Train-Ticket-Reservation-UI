import { Train } from './train';

export interface ApiResponse {
  success: boolean;
  message: string;
  data?: any; // Generic data field for API responses
}

export interface TrainListResponse extends ApiResponse {
  data: Train[]; // Specific data type for train list
}
