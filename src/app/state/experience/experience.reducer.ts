import { createReducer, on } from '@ngrx/store';
import {
  ExperiencePageActions,
  ExperienceApiActions,
} from './experience.actions';
import { initialExperienceState } from './experience.state';
import { parseSearchQuery } from '../../shared/helpers/query-parser.helper';

export const experienceReducer = createReducer(
  initialExperienceState,
  on(ExperiencePageActions.loadExperience, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(ExperiencePageActions.setFilterTerm, (state, { term }) => ({
    ...state,
    filterTerm: term,
    searchQuery: parseSearchQuery(term),
  })),
  on(
    ExperiencePageActions.toggleSectionFilter,
    (state, { section, enabled }) => ({
      ...state,
      sectionFilters: {
        ...state.sectionFilters,
        [section]: enabled,
      },
    })
  ),
  on(ExperiencePageActions.selectSection, (state, { section }) => {
    return {
      ...state,
      selectedSections: section,
    };
  }),
  on(ExperienceApiActions.experienceLoadDataSuccess, (state, { data }) => {
    // Initialize all projects as expanded by default
    const expandedProjects: { [key: string]: boolean } = {};
    data.experience.forEach((company) =>
      company.positions.forEach((position) =>
        position.projects?.forEach(
          (project) => (expandedProjects[project.name] = true)
        )
      )
    );
    return {
      ...state,
      loading: false,
      error: null,
      basics: data.basics,
      experience: data.experience,
      education: data.education,
      skills: data.skills,
      certifications: data.certifications,
      expandedProjects,
    };
  }),
  on(ExperienceApiActions.experienceLoadDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
