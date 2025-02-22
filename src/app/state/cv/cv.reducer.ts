import { createReducer, on } from '@ngrx/store';
import { CvPageActions, CvApiActions } from './cv.actions';
import { initialCvState } from './cv.state';

export const cvReducer = createReducer(
  initialCvState,
  on(CvPageActions.loadCV, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CvPageActions.setFilterTerm, (state, { term }) => ({
    ...state,
    filterTerm: term
  })),
  on(CvPageActions.toggleSectionFilter, (state, { section, enabled }) => ({
    ...state,
    sectionFilters: {
      ...state.sectionFilters,
      [section]: enabled
    }
  })),
  on(CvPageActions.toggleProjectExpansion, (state, { projectId, expanded }) => ({
    ...state,
    expandedProjects: {
      ...state.expandedProjects,
      [projectId]: expanded
    }
  })),
  on(CvPageActions.expandAllProjects, (state) => {
    const allExpanded: { [key: string]: boolean } = {};
    state.experience.forEach(company =>
      company.positions.forEach(position =>
        position.projects?.forEach(project =>
          allExpanded[project.name] = true
        )
      )
    );
    return {
      ...state,
      expandedProjects: allExpanded
    };
  }),
  on(CvPageActions.collapseAllProjects, (state) => {
    const allCollapsed: { [key: string]: boolean } = {};
    state.experience.forEach(company =>
      company.positions.forEach(position =>
        position.projects?.forEach(project =>
          allCollapsed[project.name] = false
        )
      )
    );
    return {
      ...state,
      expandedProjects: allCollapsed
    };
  }),
  on(CvApiActions.cVLoadDataSuccess, (state, { data }) => {
    // Initialize all projects as expanded by default
    const expandedProjects: { [key: string]: boolean } = {};
    data.experience.forEach(company =>
      company.positions.forEach(position =>
        position.projects?.forEach(project =>
          expandedProjects[project.name] = true
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
      expandedProjects
    };
  }),
  on(CvApiActions.cVLoadDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
