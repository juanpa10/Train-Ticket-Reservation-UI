import { Routes } from '@angular/router';
import { AddTrainComponent } from './pages/add-train/add-train';
import { ListTrainComponent } from './list-train/list-train.component';
import { DeleteTrainComponent } from './pages/delete-train/delete-train.component';
import { UpdateTrainComponent } from './pages/update-train/update-train.component';

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
  { path: 'delete-train', 
    component: DeleteTrainComponent,
    data: { 
      title: 'Delete Train',
      breadcrumbs: ['Home','Trains', 'Delete Train']    
    }

  },
  { path: 'update-train', 
    component: UpdateTrainComponent,
    data: { 
      title: 'Update Train',
      breadcrumbs: ['Home','Trains', 'Update Train']    
    }

  },
];
