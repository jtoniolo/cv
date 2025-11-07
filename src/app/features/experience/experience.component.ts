import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Title, Meta } from '@angular/platform-browser';
import { ExperiencePageActions, selectSelectedSections } from '../../state';
import { ExperienceSectionComponent } from './components/experience-section/experience-section.component';
import { BasicsSectionComponent } from './components/basics-section/basics-section.component';
import { EducationSectionComponent } from './components/education-section/education-section.component';
import { SkillsSectionComponent } from './components/skills-section/skills-section.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { SectionVisiblePipe } from '@app/shared/pipes/section-visible.pipe';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [
    CommonModule,
    BasicsSectionComponent,
    ExperienceSectionComponent,
    EducationSectionComponent,
    SkillsSectionComponent,
    SectionVisiblePipe,
  ],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly titleService = inject(Title);
  private readonly metaService = inject(Meta);
  
  selectedSection = toSignal(this.store.select(selectSelectedSections), {
    initialValue: 'all',
  });

  constructor() {
    // Set page title and meta tags
    this.titleService.setTitle('Experience & CV - Jeffrey Toniolo | Senior Systems Architect');
    this.metaService.updateTag({
      name: 'description',
      content:
        'View detailed work history, technical skills, education, and certifications. 20+ years of experience in enterprise application development, system architecture, and DevOps.',
    });
  }

  ngOnInit() {
    this.store.dispatch(ExperiencePageActions.loadExperience());
  }
}
