import * as Actions from './cv/cv.actions';
import * as Selectors from './cv/cv.selectors';
import * as State from './cv/cv.state';

// Actions
export const CvApiActions = Actions.CvApiActions;
export const CvPageActions = Actions.CvPageActions;

// Selectors
export const selectCvState = Selectors.selectCvState;
export const selectBasics = Selectors.selectBasics;
export const selectCompanies = Selectors.selectCompanies;
export const selectError = Selectors.selectError;
export const selectLoading = Selectors.selectLoading;
export const selectEducation = Selectors.selectEducation;
export const selectSkills = Selectors.selectSkills;
export const selectCertifications = Selectors.selectCertifications;
export const selectSelectedSections = Selectors.selectSelectedSections;
