export interface CvData {
  basics: {
    title: string;
    summary: string;
    highlights: string[];
    keywords?: string[];
  };
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  skills: {
    categories: SkillCategory[];
  };
}

export interface ExperienceItem {
  company: string;
  positions: Position[];
}

export interface Position {
  title: string;
  startDate: string;
  endDate: string;
  summary?: string;
  responsibilities: string[];
  projects?: Project[];
  keywords?: string[];
}

export interface Project {
  name: string;
  role?: string;
  responsibilities?: string;
  technologies?: string[];
  challenges?: string;
  achievements?: string;
  details?: string[];
  keywords?: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  keywords?: string[];
}

export interface CertificationItem {
  name: string;
  issuer?: string;
  date?: string;
  keywords?: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
  keywords?: string[];
}
