import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ContactFormData } from '../../models/contact-form.model';

/**
 * Contact state actions
 * Minimal actions for form submission flow
 */
export const ContactPageActions = createActionGroup({
  source: 'Contact Page',
  events: {
    'Submit Form': props<{ formData: ContactFormData }>(),
    'Submit Success': props<{ message: string }>(),
    'Submit Failure': props<{ error: string }>(),
    'Reset Form': emptyProps(),
  },
});
