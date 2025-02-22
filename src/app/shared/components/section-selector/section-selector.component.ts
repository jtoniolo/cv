import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import { selectSelectedSections } from '../../../state';
import { CvPageActions } from '../../../state/cv/cv.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { SelectableSection } from '@app/models/cv.model';

@Component({
  selector: 'app-section-selector',
  standalone: true,
  imports: [CommonModule, MatSelectModule, MatFormFieldModule],
  templateUrl: './section-selector.component.html',
  styleUrl: './section-selector.component.scss',
})
export class SectionSelectorComponent {
  private readonly store = inject(Store);
  visibleSections = toSignal(this.store.select(selectSelectedSections));
  sections = [
    { value: 'all', label: 'All' },
    { value: 'experience', label: 'Experience' },
    { value: 'education', label: 'Education' },
    { value: 'skills', label: 'Skills' },
  ];

  onSectionChange(section: SelectableSection): void {
    this.store.dispatch(CvPageActions.selectSection({ section: section }));
  }
}
