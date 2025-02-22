import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CvPageActions } from '../../state';
import { ExperienceSectionComponent } from './components/experience-section/experience-section.component';
import { BasicsSectionComponent } from './components/basics-section/basics-section.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, BasicsSectionComponent, ExperienceSectionComponent],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements OnInit {
  private readonly store = inject(Store);

  ngOnInit() {
    this.store.dispatch(CvPageActions.loadCV());
  }
}
