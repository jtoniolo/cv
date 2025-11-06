import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  ExperienceApiActions,
  ExperiencePageActions,
} from './experience.actions';
import { ExperienceService } from '../../services/experience.service';

@Injectable()
export class ExperienceEffects {
  loadExperience$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ExperiencePageActions.loadExperience),
      switchMap(() =>
        this.experienceService.loadExperienceData().pipe(
          map((data) =>
            ExperienceApiActions.experienceLoadDataSuccess({ data })
          ),
          catchError((error) =>
            of(
              ExperienceApiActions.experienceLoadDataFailure({
                error: error.message || 'Failed to load experience data',
              })
            )
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private experienceService: ExperienceService
  ) {}
}
