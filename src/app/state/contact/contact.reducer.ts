import { createReducer, on } from '@ngrx/store';
import { ContactPageActions } from './contact.actions';
import { initialContactState } from './contact.state';

/**
 * Contact state reducer
 * Handles state transitions for form submission
 */
export const contactReducer = createReducer(
  initialContactState,
  on(ContactPageActions.submitForm, (state) => ({
    ...state,
    submitting: true,
    submitted: false,
    error: null,
    successMessage: null,
  })),
  on(ContactPageActions.submitSuccess, (state, { message }) => ({
    ...state,
    submitting: false,
    submitted: true,
    error: null,
    successMessage: message,
  })),
  on(ContactPageActions.submitFailure, (state, { error }) => ({
    ...state,
    submitting: false,
    submitted: false,
    error,
    successMessage: null,
  })),
  on(ContactPageActions.resetForm, () => initialContactState)
);
