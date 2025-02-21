import { createReducer, on } from '@ngrx/store';
import { CvActions } from './cv.actions';
import { initialCvState } from './cv.state';

export const cvReducer = createReducer(
  initialCvState,
  on(CvActions.loadCv, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CvActions.loadCvSuccess, (state, { data }) => ({
    ...state,
    data,
    loading: false,
    error: null
  })),
  on(CvActions.loadCvFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(CvActions.setFilterTerm, (state, { term }) => ({
    ...state,
    filterTerm: term
  })),
  on(CvActions.toggleSectionFilter, (state, { section, enabled }) => ({
    ...state,
    filteredSections: {
      ...state.filteredSections,
      [section]: enabled
    }
  }))
);
