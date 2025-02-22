import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CvData } from '../../models/cv.model';

export const CvPageActions = createActionGroup({
  source: 'CV Page',
  events: {
    'Load CV': emptyProps(),
    'Set Filter Term': props<{ term: string }>(),
    'Toggle Section Filter': props<{
      section: 'experience' | 'education' | 'skills';
      enabled: boolean;
    }>(),
  },
});

export const CvApiActions = createActionGroup({
  source: 'CV API',
  events: {
    'CV Load Data Success': props<{ data: CvData }>(),
    'CV Load Data Failure': props<{ error: string }>(),
  },
});
