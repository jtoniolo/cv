import { TimelineItem } from '@shared/components/timeline/timeline.models';

export interface CvData {
  basics: {
    name: string;
    contact?: {
      phone?: string;
      email?: string;
      city?: string;
    };
    title: string;
    summary: string;
    highlights: string[];
    keywords: string[];
  };
  experience: CompanyExperience[];
  education: {
    degree: string;
    institution: string;
    keywords: string[];
  }[];
  certifications: {
    name: string;
    keywords: string[];
  }[];
  skills: {
    categories: SkillCategory[];
  };
}

export interface SkillCategory {
  name: string;
  items: string[];
  keywords: string[];
}

export interface CompanyExperience {
  company: string;
  positions: Position[];
}

export interface Position {
  title: string;
  startDate: string;
  endDate: string;
  summary?: string;
  responsibilities?: string[];
  projects?: Project[];
  keywords: string[];
}

export interface Project {
  name: string;
  role: string;
  responsibilities?: string;
  technologies: string[];
  challenges?: string;
  achievements?: string;
  keywords: string[];
}

export type SelectableSection = 'all' | 'experience' | 'education' | 'skills';
