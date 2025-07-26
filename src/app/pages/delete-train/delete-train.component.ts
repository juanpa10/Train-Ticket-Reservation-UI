import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TrainService } from '../../services/train.service';

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
        this.snack.open(res.message || 'Deleted', 'OK', { duration: 2500 });
        this.form.reset();
      },
      error: err => {
        this.loading = false;
        this.snack.open(err.error?.message || 'Error', 'OK', { duration: 3000 });
      }
    });
  }
}
