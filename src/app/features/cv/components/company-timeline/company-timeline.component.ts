import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CompanyExperience } from '../../../../models/cv.model';
import { TimelineItemComponent } from '../timeline-item/timeline-item.component';

@Component({
  selector: 'app-company-timeline',
  standalone: true,
  imports: [CommonModule, MatCardModule, TimelineItemComponent],
  templateUrl: './company-timeline.component.html',
  styleUrls: ['./company-timeline.component.scss']
})
export class CompanyTimelineComponent {
  company = input.required<CompanyExperience>();
  activeFilters = input<string[]>( []);

  getTotalDuration(): string {
    const startDate = new Date(Math.min(...this.company().positions.map(p => new Date(p.startDate).getTime())));
    const endDates = this.company().positions.map(p => p.endDate ? new Date(p.endDate) : new Date());
    const endDate = new Date(Math.max(...endDates.map(d => d.getTime())));

    const years = endDate.getFullYear() - startDate.getFullYear();
    const months = endDate.getMonth() - startDate.getMonth();

    const totalMonths = years * 12 + months;
    const displayYears = Math.floor(totalMonths / 12);
    const displayMonths = totalMonths % 12;

    if (displayYears > 0 && displayMonths > 0) {
      return `${displayYears}y ${displayMonths}m`;
    } else if (displayYears > 0) {
      return `${displayYears}y`;
    } else {
      return `${displayMonths}m`;
    }
  }
}
