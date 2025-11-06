import {
  ExperienceData,
  SelectableSection,
} from '../../models/experience.model';
import { ParsedSearchQuery } from '../../models/search-query.model';

export interface ExperienceState {
  basics: ExperienceData['basics'] | null;
  experience: ExperienceData['experience'];
  education: ExperienceData['education'];
  skills: ExperienceData['skills'];
  certifications: ExperienceData['certifications'];
  loading: boolean;
  error: string | null;
  filterTerm: string;
  sectionFilters: {
    [key in 'experience' | 'education' | 'skills']: boolean;
  };
  selectedSections: SelectableSection;
  searchQuery: ParsedSearchQuery | null;
  expandedProjects: { [key: string]: boolean };
}

export const initialExperienceState: ExperienceState = {
  basics: null,
  experience: [],
  education: [],
  skills: { categories: [] },
  certifications: [],
  loading: false,
  error: null,
  filterTerm: '',
  sectionFilters: {
    experience: true,
    education: true,
    skills: true,
  },
  selectedSections: 'all',
  searchQuery: null,
  expandedProjects: {},
};
