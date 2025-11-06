import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { ContactPageActions } from './contact.actions';

/**
 * Contact state effects
 * Handles side effects for form submission (API calls will be added in Phase 5)
 */
@Injectable()
export class ContactEffects {
  constructor(private actions$: Actions) {}

  // Placeholder effect - actual API integration will be added in Phase 5
  submitForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ContactPageActions.submitForm),
      mergeMap(() =>
        // TODO: Replace with actual API call in Phase 5
        of({ success: true, message: 'Form submitted successfully' }).pipe(
          map((response) =>
            ContactPageActions.submitSuccess({ message: response.message })
          ),
          catchError((error) =>
            of(
              ContactPageActions.submitFailure({
                error: error.message || 'An error occurred',
              })
            )
          )
        )
      )
    )
  );
}
