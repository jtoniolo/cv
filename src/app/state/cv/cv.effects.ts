import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import {  CvApiActions, CvPageActions } from './cv.actions';
import { CvService } from '../../services/cv.service';

@Injectable()
export class CvEffects {
  loadCv$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CvPageActions.loadCV),
      switchMap(() => this.cvService.loadCvData().pipe(
        map(data => CvApiActions.cVLoadDataSuccess ({ data })),
        catchError(error => of(CvApiActions.cVLoadDataFailure({
          error: error.message || 'Failed to load CV data'
        })))
      ))
    );
  });

  constructor(
    private actions$: Actions,
    private cvService: CvService
  ) {}
}
