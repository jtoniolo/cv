import { Component, inject, input, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Project } from '../../../../models/cv.model';
import { Store } from '@ngrx/store';
import { selectParsedQuery } from '../../../../state';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatTooltipModule } from '@angular/material/tooltip';
import { JsonSearchPipe } from '@app/shared/pipes/json-search.pipe';

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
    JsonSearchPipe,
  ],
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.scss'],
})
export class ExperienceItemComponent {
  private readonly store = inject(Store);
  filterTerm = toSignal(this.store.select(selectParsedQuery));
  projects = input<Project[]>([]);
  accordion = viewChild.required(MatAccordion);

  toggleAll(collapse: boolean = true) {
    if (collapse) {
      this.accordion().closeAll();
    } else {
      this.accordion().openAll();
    }
  }
}
