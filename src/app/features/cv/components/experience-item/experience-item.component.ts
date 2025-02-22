import { Component, inject, input, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '../../../../models/cv.model';
import { Store } from '@ngrx/store';
import { CvState } from '../../../../state/cv/cv.state';
import {
  CvPageActions,
  selectAllProjectsExpanded,
  selectExpandedProjects,
} from '../../../../state';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-experience-item',
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.scss'],
})
export class ExperienceItemComponent {
  private readonly store = inject(Store<CvState>);
  projects = input<Project[]>([]);
  allExpanded = toSignal(this.store.select(selectAllProjectsExpanded));
  expandedProjects = toSignal(this.store.select(selectExpandedProjects));
  accordion = viewChild.required(MatAccordion);

  toggleAll(collapse: boolean = true) {
    if (collapse) {
      this.store.dispatch(CvPageActions.collapseAllProjects());
      this.accordion().closeAll();
    } else {
      this.store.dispatch(CvPageActions.expandAllProjects());
      this.accordion().openAll();
    }
  }
}
