import { createActionGroup, emptyProps, props } from '@ngrx/store';

/**
 * Contact state actions
 * Minimal actions for form submission flow
 */
export const ContactPageActions = createActionGroup({
  source: 'Contact Page',
  events: {
    'Submit Form': props<{ formData: any }>(),
    'Submit Success': props<{ message: string }>(),
    'Submit Failure': props<{ error: string }>(),
    'Reset Form': emptyProps(),
  },
});
