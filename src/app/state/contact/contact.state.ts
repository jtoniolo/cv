/**
 * Contact state interface
 * Minimal state for managing contact form submission status only
 */
export interface ContactState {
  submitting: boolean;
  submitted: boolean;
  error: string | null;
  successMessage: string | null;
}

export const initialContactState: ContactState = {
  submitting: false,
  submitted: false,
  error: null,
  successMessage: null,
};
