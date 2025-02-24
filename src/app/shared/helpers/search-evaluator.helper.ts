import {
  ParsedSearchQuery,
  SearchTermGroup,
} from '@app/models/search-query.model';

export function evaluateSearchQuery(
  value: any,
  query: ParsedSearchQuery | null
): boolean {
  if (!query) return true;
  if (!value) return false;

  return evaluateGroup(value, query.rootGroup);
}

function evaluateGroup(value: any, group: SearchTermGroup): boolean {
  const results = group.terms.map((term) => {
    if (typeof term === 'string') {
      return evaluateTerm(value, term);
    }
    return evaluateGroup(value, term);
  });

  return group.operator === 'AND'
    ? results.every((r) => r)
    : results.some((r) => r);
}

function evaluateTerm(value: any, term: string): boolean {
  const jsonString = JSON.stringify(value).toLowerCase();
  return jsonString.includes(term.toLowerCase());
}
