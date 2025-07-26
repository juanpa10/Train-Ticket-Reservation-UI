import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { TrainService } from '../../services/train.service';
import { Train } from '../../models/train';

type SearchForm = {
  tr_no: FormControl<number>;
};

type TrainForm = {
  tr_no: FormControl<number>;
  tr_name: FormControl<string>;
  from_stn: FormControl<string>;
  to_stn: FormControl<string>;
  seats: FormControl<number>;
  fare: FormControl<number>;
};

@Component({
  selector: 'app-update-train',
  standalone: true,
  templateUrl: './update-train.component.html',
  styleUrls: ['./update-train.component.css'],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatSnackBarModule      // deja sólo esto de Angular Material
  ]
})
export class UpdateTrainComponent {
  loading   = false;
  searching = false;
  found     = false;

  private fb      = inject(NonNullableFormBuilder);
  private service = inject(TrainService);
  private snack   = inject(MatSnackBar);
  private route   = inject(ActivatedRoute);
  private router  = inject(Router);

  // ---------- formularios ----------
  searchForm = this.fb.group<SearchForm>({
    tr_no: this.fb.control(0, { validators: [Validators.required] })
  });

  form = this.fb.group<TrainForm>({
    tr_no:   this.fb.control({ value: 0, disabled: true }, Validators.required),
    tr_name: this.fb.control('', Validators.required),
    from_stn:this.fb.control('', Validators.required),
    to_stn:  this.fb.control('', Validators.required),
    seats:   this.fb.control(0, Validators.required),
    fare:    this.fb.control(0, Validators.required)
  });

  // ---------- ciclo de vida ----------
  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('id'));
    if (id) {
      this.searchForm.patchValue({ tr_no: id });
      this.loadTrain(id);
    }
  }

  // ---------- acciones ----------
  loadTrain(id?: number): void {
    const trainId = id ?? this.searchForm.get('tr_no')!.value;
    if (!trainId) return;

    this.searching = true;

    this.service.getTrain(trainId).subscribe({
      next: (t: Train) => {
        this.found = true;
        this.form.get('tr_no')!.setValue(t.tr_no);      // setValue a campo disabled
        this.form.patchValue({
          tr_name: t.tr_name,
          from_stn: t.from_stn,
          to_stn: t.to_stn,
          seats: t.seats,
          fare: t.fare
        });
        this.searching = false;
      },
      error: err => {
        this.found = false;
        this.searching = false;
        this.snack.open(err.error?.message || 'Train not found', 'OK', { duration: 2500 });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const train = this.form.getRawValue() as Train;
    this.loading = true;

    this.service.updateTrain(train).subscribe({
      next: res => {
        this.loading = false;
        this.snack.open(res.message || 'Updated', 'OK', { duration: 2500 });
        this.router.navigateByUrl('/');   
      },
      error: err => {
        this.loading = false;
        this.snack.open(err.error?.message || 'Error updating', 'OK', { duration: 3500 });
      }
    });
  }
}
