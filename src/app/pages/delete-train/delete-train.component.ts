import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TrainService } from '../../services/train.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-delete-train',
  standalone: true,
  templateUrl: './delete-train.component.html',
  styleUrls: ['./delete-train.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule          // ← conserva sólo si sigues usando snack‑bar
  ]
})
export class DeleteTrainComponent {
  loading = false;

  private fb     = inject(FormBuilder);
  private service = inject(TrainService);
  private snack   = inject(MatSnackBar);
  private notificationService = inject(NotificationService);

  form = this.fb.group({
    tr_no: [null, Validators.required]
  });

  onDelete(): void {
    if (this.form.invalid) return;

    const id = this.form.value.tr_no!;
    this.loading = true;

    this.service.deleteTrain(id).subscribe({
      next: res => {
        this.loading = false;
        this.notificationService.showSuccess('Success', `Train ${id} deleted successfully`);
        this.form.reset();
      },
      error: err => {
        this.loading = false;
        this.notificationService.showError('Error', err.error?.message || 'Failed to delete train');
      }
    });
  }
}
