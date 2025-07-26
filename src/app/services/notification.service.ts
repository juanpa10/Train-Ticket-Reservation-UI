import { Injectable } from '@angular/core';

declare const PNotify: any;

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  private isPNotifyAvailable(): boolean {
    return typeof PNotify !== 'undefined';
  }

  showSuccess(title: string, text: string) {
    if (this.isPNotifyAvailable()) {
      new PNotify({
        title: title,
        text: text,
        type: 'success'
      });
    } else {
      alert(`✅ ${title}: ${text}`);
    }
  }

  showError(title: string, text: string) {
    if (this.isPNotifyAvailable()) {
      new PNotify({
        title: title,
        text: text,
        type: 'error'
      });
    } else {
      alert(`❌ ${title}: ${text}`);
    }
  }

  showInfo(title: string, text: string) {
    if (this.isPNotifyAvailable()) {
      new PNotify({
        title: title,
        text: text,
        type: 'info'
      });
    } else {
      alert(`ℹ️ ${title}: ${text}`);
    }
  }

  showNotice(title: string, text: string) {
    if (this.isPNotifyAvailable()) {
      new PNotify({
        title: title,
        text: text
      });
    } else {
      alert(`📢 ${title}: ${text}`);
    }
  }

  showPrimary(title: string, text: string, icon?: string) {
    if (this.isPNotifyAvailable()) {
      new PNotify({
        title: title,
        text: text,
        type: 'custom',
        addclass: 'notification-primary',
        icon: icon || 'fas fa-info-circle'
      });
    } else {
      alert(`🔷 ${title}: ${text}`);
    }
  }

  showDark(title: string, text: string, icon?: string) {
    if (this.isPNotifyAvailable()) {
      new PNotify({
        title: title,
        text: text,
        addclass: 'notification-dark',
        icon: icon || 'fas fa-user'
      });
    } else {
      alert(`⚫ ${title}: ${text}`);
    }
  }
}
