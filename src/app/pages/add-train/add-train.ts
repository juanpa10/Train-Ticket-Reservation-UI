// src/app/pages/add-train/add-train.component.ts
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-add-train',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
   templateUrl: './add-train.html',
  styleUrls: ['./add-train.css']
})
export class AddTrainComponent {
  loading = false;
  form: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder,
              private service: TrainService,
              private snack: MatSnackBar) {
    this.form = this.fb.group({
      tr_no: [null, Validators.required],
      tr_name: ['', Validators.required],
      from_stn: ['', Validators.required],
      to_stn: ['', Validators.required],
      seats: [null, Validators.required],
      fare: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.service.addTrain(this.form.value).subscribe({
      next: (res) => {
        this.snack.open(res.message || 'Saved', 'OK', { duration: 2500 });
        this.form.reset();
        this.loading = false;
      },
      error: (err) => {
        this.snack.open(err.error?.message || 'Error', 'OK', { duration: 3500, panelClass: 'snack-error' });
        this.loading = false;
      }
    });
  }
}
