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
  on(CvApiActions.cVLoadDataSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    error: null,
    basics: data.basics,
    experience: data.experience,
    education: data.education,
    skills: data.skills,
    certifications: data.certifications
  })),
  on(CvApiActions.cVLoadDataFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);
