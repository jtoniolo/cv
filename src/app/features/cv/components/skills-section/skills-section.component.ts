import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { CvState } from '../../../../state/cv/cv.state';
import { selectSkills, selectFilterTerm } from '../../../../state';
import { JsonSearchPipe } from '@app/shared/pipes/json-search.pipe';

type ViewMode = 'grid' | 'list';

@Component({
  selector: 'app-skills-section',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatIconModule,
    JsonSearchPipe,
  ],
  templateUrl: './skills-section.component.html',
  styleUrls: ['./skills-section.component.scss'],
})
export class SkillsSectionComponent {
  private readonly store = inject(Store<CvState>);
  skills = toSignal(this.store.select(selectSkills));
  filterTerm = toSignal(this.store.select(selectFilterTerm));
  viewMode = signal<ViewMode>('grid');

  toggleViewMode(mode: ViewMode) {
    this.viewMode.set(mode);
  }
}
