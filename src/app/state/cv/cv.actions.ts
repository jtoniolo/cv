import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CvData, SelectableSection } from '../../models/cv.model';
import { ParsedSearchQuery } from '@app/models/search-query.model';

export const CvPageActions = createActionGroup({
  source: 'CV Page',
  events: {
    'Load CV': emptyProps(),
    'Set Filter Term': props<{
      term: string;
      parsedQuery: ParsedSearchQuery | null;
    }>(),
    'Toggle Section Filter': props<{
      section: 'experience' | 'education' | 'skills';
      enabled: boolean;
    }>(),
    'Select Section': props<{
      section: SelectableSection;
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
