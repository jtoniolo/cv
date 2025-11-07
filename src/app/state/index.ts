import * as Actions from './experience/experience.actions';
import * as Selectors from './experience/experience.selectors';
import * as State from './experience/experience.state';
import * as ContactActions from './contact/contact.actions';
import * as ContactSelectors from './contact/contact.selectors';
import * as ContactState from './contact/contact.state';

// Experience Actions
export const ExperienceApiActions = Actions.ExperienceApiActions;
export const ExperiencePageActions = Actions.ExperiencePageActions;

// Experience Selectors
export const selectExperienceState = Selectors.selectExperienceState;
export const selectBasics = Selectors.selectBasics;
export const selectCompanies = Selectors.selectCompanies;
export const selectError = Selectors.selectError;
export const selectLoading = Selectors.selectLoading;
export const selectEducation = Selectors.selectEducation;
export const selectSkills = Selectors.selectSkills;
export const selectCertifications = Selectors.selectCertifications;
export const selectSelectedSections = Selectors.selectSelectedSections;
export const selectFilterTerm = Selectors.selectFilterTerm;
export const selectParsedQuery = Selectors.selectParsedQuery;

// Contact Actions
export const ContactPageActions = ContactActions.ContactPageActions;

// Contact Selectors
export const selectContactState = ContactSelectors.selectContactState;
export const selectIsSubmitting = ContactSelectors.selectIsSubmitting;
export const selectIsSubmitted = ContactSelectors.selectIsSubmitted;
export const selectContactError = ContactSelectors.selectError;
export const selectSuccessMessage = ContactSelectors.selectSuccessMessage;
