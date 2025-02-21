import { CvData } from '../../models/cv.model';

export interface CvState {
  data: CvData | null;
  loading: boolean;
  error: string | null;
  filterTerm: string;
  filteredSections: {
    experience: boolean;
    education: boolean;
    skills: boolean;
  };
}

export const initialCvState: CvState = {
  data: null,
  loading: false,
  error: null,
  filterTerm: '',
  filteredSections: {
    experience: true,
    education: true,
    skills: true
  }
};
