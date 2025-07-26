import { Routes } from '@angular/router';
import { AddTrainComponent } from './pages/add-train/add-train';
import { ListTrainComponent } from './list-train/list-train.component';
import { BookingComponent } from './booking/booking.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { DeleteTrainComponent } from './pages/delete-train/delete-train.component';
import { UpdateTrainComponent } from './pages/update-train/update-train.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { CustomerGuard } from './guards/customer.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    component: LoginComponent,
    data: { 
      title: 'Login',
      breadcrumbs: ['Login']    
    }
  },
  { 
    path: 'add-train', 
    component: AddTrainComponent,
    canActivate: [AuthGuard, AdminGuard],
    data: { 
      title: 'Add Train',
      breadcrumbs: ['Home','Trains', 'Add Train']    
    }
  },
  { 
    path: 'list-train', 
    component: ListTrainComponent,
    canActivate: [AuthGuard, AdminGuard],
    data: { 
      title: 'List Train',
      breadcrumbs: ['Home','Trains', 'List Train']    
    }
  },
  { 
    path: 'delete-train', 
    component: DeleteTrainComponent,
    canActivate: [AuthGuard, AdminGuard],
    data: { 
      title: 'Delete Train',
      breadcrumbs: ['Home','Trains', 'Delete Train']    
    }
  },
  { 
    path: 'update-train', 
    component: UpdateTrainComponent,
    canActivate: [AuthGuard, AdminGuard],
    data: { 
      title: 'Update Train',
      breadcrumbs: ['Home','Trains', 'Update Train']    
    }
  },
  { 
    path: 'booking',
    component: BookingComponent,
    canActivate: [AuthGuard, CustomerGuard],
    data: { 
      title: 'Booking',
      breadcrumbs: ['Home','Booking']    
    }
  },
  { 
    path: 'booking-form',
    component: BookingFormComponent,
    canActivate: [AuthGuard, CustomerGuard],
    data: { 
      title: 'Book Ticket',
      breadcrumbs: ['Home','Booking', 'Book Ticket']    
    }
  },
  { 
    path: 'booking-history',
    component: BookingHistoryComponent,
    canActivate: [AuthGuard, CustomerGuard],
    data: { 
      title: 'Booking History',
      breadcrumbs: ['Home','Booking', 'History']    
    }
  }
];
