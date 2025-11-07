import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectBasics } from '../../../state/experience/experience.selectors';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  private readonly store = inject(Store);
  
  currentYear = new Date().getFullYear();
  name$ = this.store
    .select(selectBasics)
    .pipe(map((basics) => basics?.name ?? ''));
  linkedinUrl$ = this.store
    .select(selectBasics)
    .pipe(map((basics) => basics?.contact?.linkedin));
  githubUrl$ = this.store
    .select(selectBasics)
    .pipe(map((basics) => basics?.contact?.github));
}
