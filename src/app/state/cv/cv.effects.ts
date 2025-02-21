import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CvActions } from './cv.actions';
import { CvService } from '../../services/cv.service';

@Injectable()
export class CvEffects {
  loadCv$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CvActions.loadCv),
      switchMap(() => this.cvService.loadCvData().pipe(
        map(data => CvActions.loadCvSuccess({ data })),
        catchError(error => of(CvActions.loadCvFailure({ error: error.message })))
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private cvService: CvService
  ) {}
}
