import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule, MatChipListboxChange } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CvState } from '../../../../state/cv/cv.state';
import {
  selectCompanies,
  selectLoading,
  selectError,
} from '../../../../state/cv/cv.selectors';
import { CompanyTimelineComponent } from '../company-timeline/company-timeline.component';
import { CompanyExperience } from '../../../../models/cv.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-experience-section',
  standalone: true,
  imports: [
    CommonModule,
    CompanyTimelineComponent,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.scss'],
})
export class ExperienceSectionComponent {
  private readonly store = inject(Store<CvState>);
  companies = toSignal(this.store.select(selectCompanies));
  loading = toSignal(this.store.select(selectLoading));
  error = toSignal(this.store.select(selectError));
  activeFilters: string[] = [];
  availableTags = computed(() => {
    const tags = new Set<string>();
    this.companies()?.forEach((company) => {
      company.positions.forEach((position) => {
        position.keywords?.forEach((keyword) => tags.add(keyword));
      });
    });
    return Array.from(tags).sort();
  });

  onFilterChange(event: MatChipListboxChange) {
    if (event.value === 'All') {
      this.activeFilters = [];
    } else {
      this.activeFilters = this.activeFilters.includes(event.value)
        ? this.activeFilters.filter((f) => f !== event.value)
        : [...this.activeFilters, event.value];
    }
  }
}
