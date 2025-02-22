import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { CvPageActions, selectSelectedSections } from '../../state';
import { ExperienceSectionComponent } from './components/experience-section/experience-section.component';
import { BasicsSectionComponent } from './components/basics-section/basics-section.component';
import { EducationSectionComponent } from './components/education-section/education-section.component';
import { SkillsSectionComponent } from './components/skills-section/skills-section.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [
    CommonModule,
    BasicsSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    SkillsSectionComponent,
  ],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.scss'],
})
export class CvComponent implements OnInit {
  private readonly store = inject(Store);
  selectedSection = toSignal(this.store.select(selectSelectedSections), {
    initialValue: 'all',
  });

  ngOnInit() {
    this.store.dispatch(CvPageActions.loadCV());
  }
}
