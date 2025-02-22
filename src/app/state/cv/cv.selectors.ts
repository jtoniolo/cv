import { createSelector } from '@ngrx/store';
import { CvState } from './cv.state';
import { CompanyExperience } from '../../models/cv.model';

export const selectCvState = (state: { cv: CvState }) => state.cv;

export const selectLoading = createSelector(
  selectCvState,
  (state: CvState) => state.loading
);

export const selectError = createSelector(
  selectCvState,
  (state: CvState) => state.error
);

export const selectBasics = createSelector(
  selectCvState,
  (state: CvState) => state.basics
);

export const selectSelectedSections = createSelector(
  selectCvState,
  (state: CvState) => state.selectedSections
);

// Update existing selectors to respect section visibility
export const selectCompanies = createSelector(
  selectCvState,
  (state: CvState): CompanyExperience[] => {
    // Sort companies by most recent position's start date
    return [...state.experience].sort((a, b) => {
      const aLatest = new Date(a.positions[0].startDate).getTime();
      const bLatest = new Date(b.positions[0].startDate).getTime();
      return bLatest - aLatest;
    });
  }
);

export const selectEducation = createSelector(
  selectCvState,
  (state: CvState) => state.education
);

export const selectCertifications = createSelector(
  selectCvState,
  (state: CvState) => state.certifications
);

export const selectSkills = createSelector(
  selectCvState,
  (state: CvState) => state.skills
);
