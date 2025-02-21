import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CvData } from '../../models/cv.model';

export const CvActions = createActionGroup({
  source: 'CV',
  events: {
    'Load CV': emptyProps(),
    'Load CV Success': props<{ data: CvData }>(),
    'Load CV Failure': props<{ error: string }>(),
    'Set Filter Term': props<{ term: string }>(),
    'Toggle Section Filter': props<{ section: 'experience' | 'education' | 'skills', enabled: boolean }>()
  }
});
