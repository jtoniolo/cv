import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {
  ExperienceData,
  SelectableSection,
} from '../../models/experience.model';
import { ParsedSearchQuery } from '@app/models/search-query.model';

export const ExperiencePageActions = createActionGroup({
  source: 'Experience Page',
  events: {
    'Load Experience': emptyProps(),
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

export const ExperienceApiActions = createActionGroup({
  source: 'Experience API',
  events: {
    'Experience Load Data Success': props<{ data: ExperienceData }>(),
    'Experience Load Data Failure': props<{ error: string }>(),
  },
});
