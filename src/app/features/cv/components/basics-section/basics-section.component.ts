import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatChipsModule } from '@angular/material/chips';
import { selectBasics } from '../../../../state';
import { CvState } from '../../../../state/cv/cv.state';

@Component({
  selector: 'app-basics-section',
  standalone: true,
  imports: [CommonModule, MatChipsModule],
  templateUrl: './basics-section.component.html',
  styleUrls: ['./basics-section.component.scss']
})
export class BasicsSectionComponent {
  private readonly store = inject(Store<CvState>);
  basics = toSignal( this.store.select(selectBasics));

}
