import {
  ParsedSearchQuery,
  SearchTermGroup,
} from '@app/models/search-query.model';

interface SearchToken {
  type: 'TERM' | 'OPERATOR' | 'GROUP';
  value: string;
  group?: SearchToken[];
}

function extractTokens(query: string): SearchToken[] {
  const regex = /'[^']*'|"[^"]*"|\S+/g;
  return Array.from(query.matchAll(regex), (m) => {
    const value = m[0];
    const term =
      value.startsWith('"') || value.startsWith("'")
        ? value.slice(1, -1)
        : value;

    const upperTerm = term.toUpperCase();
    return {
      type: upperTerm === 'AND' || upperTerm === 'OR' ? 'OPERATOR' : 'TERM',
      value: term,
    };
  });
}

function groupTerms(tokens: SearchToken[]): (string | SearchTermGroup)[] {
  const terms: (string | SearchTermGroup)[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (
      token.type === 'OPERATOR' &&
      token.value.toUpperCase() === 'AND' &&
      i > 0 &&
      i < tokens.length - 1
    ) {
      const prevTerm = terms.pop() as string | SearchTermGroup;
      const nextTerm = tokens[i + 1].value;

      const group: SearchTermGroup = {
        operator: 'AND',
        terms: [prevTerm, nextTerm],
      };
      terms.push(group);
      i++;
    } else if (token.type === 'TERM' || token.value.toUpperCase() !== 'OR') {
      terms.push(token.value);
    }
  }

  return terms;
}

export function parseSearchQuery(query?: string): ParsedSearchQuery | null {
  if (!query?.trim()) return null;

  const trimmedQuery = query.trim();
  const tokens = extractTokens(trimmedQuery);
  const terms = groupTerms(tokens);

  return {
    rawQuery: trimmedQuery,
    rootGroup: {
      operator: 'OR',
      terms,
    },
  };
}
