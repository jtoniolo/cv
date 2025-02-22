import { CvData } from '../../models/cv.model';

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
  expandedProjects: { [key: string]: boolean };
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
    skills: true
  },
  expandedProjects: {}
};
