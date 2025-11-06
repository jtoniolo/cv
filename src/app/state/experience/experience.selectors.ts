import { createSelector } from '@ngrx/store';
import { ExperienceState } from './experience.state';
import { CompanyExperience } from '../../models/experience.model';

export const selectExperienceState = (state: { experience: ExperienceState }) =>
  state.experience;

export const selectLoading = createSelector(
  selectExperienceState,
  (state: ExperienceState) => state.loading
);

export const selectError = createSelector(
  selectExperienceState,
  (state: ExperienceState) => state.error
);

export const selectBasics = createSelector(
  selectExperienceState,
  (state: ExperienceState) => state.basics
);

export const selectSelectedSections = createSelector(
  selectExperienceState,
  (state: ExperienceState) => state.selectedSections
);

// Update existing selectors to respect section visibility
export const selectCompanies = createSelector(
  selectExperienceState,
  (state: ExperienceState): CompanyExperience[] => {
    // Sort companies by most recent position's start date
    return [...state.experience].sort((a, b) => {
      const aLatest = new Date(a.positions[0].startDate).getTime();
      const bLatest = new Date(b.positions[0].startDate).getTime();
      return bLatest - aLatest;
    });
  }
);

export const selectEducation = createSelector(
  selectExperienceState,
  (state: ExperienceState) => state.education
);

export const selectCertifications = createSelector(
  selectExperienceState,
  (state: ExperienceState) => state.certifications
);

export const selectSkills = createSelector(
  selectExperienceState,
  (state: ExperienceState) => state.skills
);

export const selectBasicsName = createSelector(
  selectBasics,
  (basics) => basics?.name || ''
);

export const selectFilterTerm = createSelector(
  selectExperienceState,
  (state: ExperienceState) => state.filterTerm
);

export const selectParsedQuery = createSelector(
  selectExperienceState,
  (state) => state.searchQuery
);
