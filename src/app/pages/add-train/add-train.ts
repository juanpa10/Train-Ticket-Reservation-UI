// src/app/pages/add-train/add-train.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
  constructor(private fb: FormBuilder,
              private service: TrainService,
              private snack: MatSnackBar) {

  }

  train!: Train;

  ngOnInit(): void {
    this.initializeTrain();
  }

  onSubmit() {
    this.loading = true;
    this.service.addTrain(this.train).subscribe({
      next: (res) => {
        this.snack.open(res.message || 'Saved', 'OK', { duration: 2500 });
        this.initializeTrain();
      },
      error: (err) => {
        this.snack.open(err.error?.message || 'Error', 'OK', { duration: 3500, panelClass: 'snack-error' });
        this.loading = false;
      }
    });
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
  }
}
