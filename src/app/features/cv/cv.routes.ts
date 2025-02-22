import { Routes } from '@angular/router';
import { CvContainerComponent } from './components/cv-container/cv-container.component';
import { CvFullViewComponent } from './components/cv-full-view/cv-full-view.component';
import { ExperienceSectionComponent } from './components/experience-section/experience-section.component';

export const CV_ROUTES: Routes = [
  {
    path: '',
    component: CvContainerComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', loadComponent: () => import('./components/cv-full-view/cv-full-view.component').then(m => m.CvFullViewComponent) },
      {
        path: 'experience',
        component: ExperienceSectionComponent
      }
    ]
  }
];
