import { Routes } from '@angular/router';
import { AddTrainComponent } from './pages/add-train/add-train';
import { ListTrainComponent } from './list-train/list-train.component';
import { BookingComponent } from './booking/booking.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';

export const routes: Routes = [
  { path: '', redirectTo: 'add-train', pathMatch: 'full' },
  { path: 'add-train', 
    component: AddTrainComponent,
    data: { 
      title: 'Add Train',
      breadcrumbs: ['Home','Trains', 'Add Train']    
    }

  },
  { path: 'list-train', 
    component: ListTrainComponent,
    data: { 
      title: 'List Train',
      breadcrumbs: ['Home','Trains', 'List Train']    
    }

  },
  { 
    path: 'booking',
    component: BookingComponent,
    data: { 
      title: 'Booking',
      breadcrumbs: ['Home','Booking']    
    }
  },
  { 
    path: 'booking-form',
    component: BookingFormComponent,
    data: { 
      title: 'Book Ticket',
      breadcrumbs: ['Home','Booking', 'Book Ticket']    
    }
  },
  { 
    path: 'booking-history',
    component: BookingHistoryComponent,
    data: { 
      title: 'Booking History',
      breadcrumbs: ['Home','Booking', 'History']    
    }
  }
];
