import { Component, input } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Position } from '../../../../models/cv.model';
import { ExperienceItemComponent } from '../experience-item/experience-item.component';

@Component({
  selector: 'app-timeline-item',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    ExperienceItemComponent,
  ],
  templateUrl: './timeline-item.component.html',
  styleUrls: ['./timeline-item.component.scss'],
})
export class TimelineItemComponent {
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
