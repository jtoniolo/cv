import { CvData, SelectableSection } from '../../models/cv.model';
import { ParsedSearchQuery } from '../../models/search-query.model';

export interface CvState {
  basics: CvData['basics'] | null;
  experience: CvData['experience'];
  education: CvData['education'];
  skills: CvData['skills'];
  certifications: CvData['certifications'];
  loading: boolean;
  error: string | null;
  filterTerm: string;
  sectionFilters: {
    [key in 'experience' | 'education' | 'skills']: boolean;
  };
  selectedSections: SelectableSection;
  searchQuery: ParsedSearchQuery | null;
}

export const initialCvState: CvState = {
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
};
