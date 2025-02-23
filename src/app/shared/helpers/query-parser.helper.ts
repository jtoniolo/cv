import {
  ParsedSearchQuery,
  SearchTermGroup,
} from '@app/models/search-query.model';

export function parseSearchQuery(query?: string): ParsedSearchQuery | null {
  if (!query?.trim()) return null;

  const trimmedQuery = query.trim();

  // Match quoted strings and handle operators
  const regex = /'[^']*'|"[^"]*"|\S+/g;
  const matches = Array.from(trimmedQuery.matchAll(regex), (m) => {
    const term = m[0];
    return term.startsWith('"') || term.startsWith("'")
      ? term.slice(1, -1)
      : term;
  });

  const terms: (string | SearchTermGroup)[] = [];
  for (let i = 0; i < matches.length; i++) {
    const isAndOp = matches[i].toUpperCase() === 'AND';
    const isOrOp = matches[i].toUpperCase() === 'OR';

    if (isAndOp && i > 0 && i < matches.length - 1) {
      const group: SearchTermGroup = {
        operator: 'AND',
        terms: [matches[i - 1], matches[i + 1]],
      };
      if (terms.length > 0) terms.pop();
      terms.push(group);
      i++;
    } else if (!isOrOp) {
      terms.push(matches[i]);
    }
  }

  return {
    rawQuery: trimmedQuery,
    rootGroup: {
      operator: 'OR',
      terms,
    },
  };
}
