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
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import {
  selectBasicsName,
  selectParsedQuery,
  selectBasics,
} from '../../../state/cv/cv.selectors';
import { parseSearchQuery } from '../../helpers/query-parser.helper';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    MatTooltipModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private readonly store = inject(Store);
  private readonly iconRegistry = inject(MatIconRegistry);
  private readonly sanitizer = inject(DomSanitizer);

  searchControl = new FormControl<string>('');
  name$ = this.store
    .select(selectBasics)
    .pipe(map((basics) => basics?.name ?? ''));
  linkedinUrl$ = this.store
    .select(selectBasics)
    .pipe(map((basics) => basics?.contact?.linkedin));
  githubUrl$ = this.store
    .select(selectBasics)
    .pipe(map((basics) => basics?.contact?.github));
  parsedQuery$ = this.store.select(selectParsedQuery);

  constructor() {
    this.iconRegistry.addSvgIcon(
      'linkedin',
      this.sanitizer.bypassSecurityTrustResourceUrl('/icons/linkedin.svg')
    );
    this.iconRegistry.addSvgIcon(
      'github',
      this.sanitizer.bypassSecurityTrustResourceUrl('/icons/github.svg')
    );

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
