import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SectionSelectorComponent } from '../section-selector/section-selector.component';
import { CvPageActions } from '../../../state';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {
  selectBasicsName,
  selectParsedQuery,
} from '../../../state/cv/cv.selectors';
import { parseSearchQuery } from '../../helpers/query-parser.helper';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    SectionSelectorComponent,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private readonly store = inject(Store);
  searchControl = new FormControl<string>('');
  name$ = this.store.select(selectBasicsName);
  parsedQuery$ = this.store.select(selectParsedQuery);

  constructor() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        const term = value ?? '';
        try {
          const parsedQuery = parseSearchQuery(term);
          this.store.dispatch(
            CvPageActions.setFilterTerm({ term, parsedQuery })
          );
        } catch (error) {
          this.store.dispatch(
            CvPageActions.setFilterTerm({ term, parsedQuery: null })
          );
        }
      });
  }
}
