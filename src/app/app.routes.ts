import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'cv',
    pathMatch: 'full'
  },
  {
    path: 'cv',
    loadChildren: () => import('./features/cv/cv.routes').then(m => m.CV_ROUTES)
  }
];
