import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { CvState } from '../../../../state/cv/cv.state';
import {
  selectEducation,
  selectCertifications,
  selectFilterTerm,
} from '../../../../state';
import { JsonSearchPipe } from '@app/shared/pipes/json-search.pipe';

@Component({
  selector: 'app-education-section',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatChipsModule, JsonSearchPipe],
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.scss'],
})
export class EducationSectionComponent {
  private readonly store = inject(Store<CvState>);
  education = toSignal(this.store.select(selectEducation));
  certifications = toSignal(this.store.select(selectCertifications));
  filterTerm = toSignal(this.store.select(selectFilterTerm));
}
