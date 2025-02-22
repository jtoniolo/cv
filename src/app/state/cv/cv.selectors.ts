import { createSelector } from '@ngrx/store';
import { CvState } from './cv.state';
import { TimelineItem } from '../../shared/components/timeline/timeline.models';
import { CompanyExperience, Position } from '../../models/cv.model';

export const selectCvState = (state: { cv: CvState }) => state.cv;

export const selectExperiences = createSelector(
  selectCvState,
  (state: CvState): TimelineItem[] => {
    if (!state.experience) return [];

    return state.experience.flatMap((company: CompanyExperience) =>
      company.positions.map((position: Position) => ({
        startDate: position.startDate,
        endDate: position.endDate,
        title: position.title,
        subtitle: company.company,
        content: position.summary || position.responsibilities?.join('\n') || '',
        tags: position.keywords,
        metadata: {
          projects: position.projects
        }
      }))
    ).sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()); // Sort by date descending
  }
);
