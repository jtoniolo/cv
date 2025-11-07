import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ExperienceComponent } from './features/experience/experience.component';
import { ContactComponent } from './features/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
];
