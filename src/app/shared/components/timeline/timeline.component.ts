import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TimelineConfig, TimelineItem } from './timeline.models';
import { ExperienceItemComponent } from '../../../features/cv/components/experience-item/experience-item.component';

@Component({
  selector: 'app-timeline',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    ExperienceItemComponent
  ],
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {
  @Input() items: TimelineItem[] = [];
  @Input() config: TimelineConfig = {
    showTags: true,
    enableFiltering: true,
    showLine: true,
    animate: true
  };

  @Input() activeFilters: string[] = [];

  ngOnInit(): void {
    if (this.config.animate) {
      this.setupScrollAnimation();
    }
  }

  private setupScrollAnimation(): void {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    setTimeout(() => {
      document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
      });
    });
  }

  /**
   * Checks if a timeline item should be shown based on active filters
   */
  isItemVisible(item: TimelineItem): boolean {
    if (!this.activeFilters.length) return true;
    return item.tags?.some(tag => this.activeFilters.includes(tag)) ?? false;
  }

  /**
   * Formats a date string into a display format
   */
  formatDate(date: string | undefined): string {
    if (!date) return 'Present';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric'
    });
  }
}
