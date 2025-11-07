import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContactState } from './contact.state';

/**
 * Contact state selectors
 * For accessing contact form submission state
 */
export const selectContactState =
  createFeatureSelector<ContactState>('contact');

export const selectIsSubmitting = createSelector(
  selectContactState,
  (state) => state.submitting
);

export const selectIsSubmitted = createSelector(
  selectContactState,
  (state) => state.submitted
);

export const selectError = createSelector(
  selectContactState,
  (state) => state.error
);

export const selectSuccessMessage = createSelector(
  selectContactState,
  (state) => state.successMessage
);
