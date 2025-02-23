import {
  ParsedSearchQuery,
  SearchTermGroup,
  LogicalOperator,
} from '@app/models/search-query.model';

export function parseSearchQuery(query?: string): ParsedSearchQuery | null {
  if (!query?.trim()) return null;

  return null;
}
