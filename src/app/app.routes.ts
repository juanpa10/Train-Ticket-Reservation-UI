import { Routes } from '@angular/router';
import { AddTrainComponent } from './pages/add-train/add-train';

export const routes: Routes = [
  { path: '', redirectTo: 'add-train', pathMatch: 'full' },
  { path: 'add-train', 
    component: AddTrainComponent,
    data: { 
      title: 'Add Train',
      breadcrumbs: ['Home','Trains', 'Add Train']    
    }

  },
];
