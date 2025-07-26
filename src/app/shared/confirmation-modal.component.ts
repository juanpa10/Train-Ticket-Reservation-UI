import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal fade" [class.show]="isVisible" [style.display]="isVisible ? 'block' : 'none'" 
         tabindex="-1" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmationModalLabel">
              <i class="fas fa-exclamation-triangle text-warning me-2"></i>
              {{ title }}
            </h5>
            <button type="button" class="btn-close" (click)="onCancel()" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>{{ message }}</p>
            <div *ngIf="details" class="alert alert-info">
              <small>{{ details }}</small>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" (click)="onCancel()">
              <i class="fas fa-times me-1"></i>
              {{ cancelText }}
            </button>
            <button type="button" class="btn btn-danger" (click)="onConfirm()">
              <i class="fas fa-trash me-1"></i>
              {{ confirmText }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" [class.show]="isVisible" *ngIf="isVisible"></div>
  `,
  styles: [`
    .modal {
      z-index: 1050;
    }
    .modal-backdrop {
      z-index: 1040;
    }
    .modal-dialog-centered {
      display: flex;
      align-items: center;
      min-height: calc(100% - 1rem);
    }
    .modal-content {
      border-radius: 0.5rem;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    }
    .modal-header {
      border-bottom: 1px solid #dee2e6;
      background-color: #f8f9fa;
    }
    .modal-footer {
      border-top: 1px solid #dee2e6;
      background-color: #f8f9fa;
    }
    .btn-close {
      background: none;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
    }
  `]
})
export class ConfirmationModalComponent {
  @Input() isVisible: boolean = false;
  @Input() title: string = 'Confirm Action';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Input() details: string = '';
  @Input() confirmText: string = 'Confirm';
  @Input() cancelText: string = 'Cancel';
  
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm() {
    this.confirmed.emit();
    this.isVisible = false;
  }

  onCancel() {
    this.cancelled.emit();
    this.isVisible = false;
  }
}
