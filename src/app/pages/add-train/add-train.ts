// src/app/pages/add-train/add-train.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainService } from '../../services/train.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { Train } from '../../models/train';

@Component({
  selector: 'app-add-train',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
   templateUrl: './add-train.html',
  styleUrls: ['./add-train.css']
})
export class AddTrainComponent implements OnInit {
  loading = false;
  isEditMode = false;
  originalTrainNo = 0; // Para mantener el número original en modo edición

  constructor(
    private fb: FormBuilder,
    private service: TrainService,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  train!: Train;

  ngOnInit(): void {
    // Check if we're in edit mode by looking at query parameters
    this.route.queryParams.subscribe(params => {
      if (params['mode'] === 'edit' && params['tr_no']) {
        this.isEditMode = true;
        this.originalTrainNo = parseInt(params['tr_no']);
        this.loadTrainData(params);
      } else {
        this.isEditMode = false;
        this.initializeTrain();
      }
    });
  }

  loadTrainData(params: any): void {
    this.train = {
      tr_no: parseInt(params['tr_no']) || 0,
      tr_name: params['tr_name'] || '',
      from_stn: params['from_stn'] || '',
      to_stn: params['to_stn'] || '',
      seats: parseInt(params['seats']) || 0,
      fare: parseFloat(params['fare']) || 0
    };
  }

  onSubmit() {
    this.loading = true;
    
    if (this.isEditMode) {
      // Update existing train
      this.service.updateTrain(this.train).subscribe({
        next: (res) => {
          this.snack.open(res.message || 'Train updated successfully', 'OK', { duration: 2500 });
          this.router.navigate(['/list-train']);
        },
        error: (err) => {
          this.snack.open(err.error?.message || 'Error updating train', 'OK', { duration: 3500, panelClass: 'snack-error' });
          this.loading = false;
        }
      });
    } else {
      // Create new train
      this.service.addTrain(this.train).subscribe({
        next: (res) => {
          this.snack.open(res.message || 'Train created successfully', 'OK', { duration: 2500 });
          this.initializeTrain();
          this.loading = false;
        },
        error: (err) => {
          this.snack.open(err.error?.message || 'Error creating train', 'OK', { duration: 3500, panelClass: 'snack-error' });
          this.loading = false;
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/list-train']);
  }

  private initializeTrain() {
    this.train = {
      tr_no: 0,
      tr_name: '',
      from_stn: '',
      to_stn: '',
      seats: 0,
      fare: 0
    };
    this.loading = false;
  }
}
