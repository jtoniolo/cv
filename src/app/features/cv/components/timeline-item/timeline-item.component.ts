import { Component, input, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Position } from '../../../../models/cv.model';
import { ExperienceItemComponent } from '../experience-item/experience-item.component';
import { Store } from '@ngrx/store';
import { selectParsedQuery } from '../../../../state';
import { toSignal } from '@angular/core/rxjs-interop';
import { JsonSearchPipe } from '@app/shared/pipes/json-search.pipe';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    ExperienceItemComponent,
    JsonSearchPipe,
  ],
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss'],
})
export class TimelineItemComponent {
  private readonly store = inject(Store);
  filterTerm = toSignal(this.store.select(selectParsedQuery));

  position = input.required<Position>();
  companyName = input.required<string>();
  activeFilters = input<string[]>([]);

  isVisible(): boolean {
    if (!this.activeFilters.length) return true;
    return (
      this.position().keywords?.some((keyword) =>
        this.activeFilters().includes(keyword)
      ) ?? false
    );
  }
}
