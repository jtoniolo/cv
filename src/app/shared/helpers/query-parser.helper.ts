import {
  ParsedSearchQuery,
  SearchTermGroup,
} from '@app/models/search-query.model';

/**
 * Groups tokens into arrays based on parentheses
 * Returns array of token arrays, where each array represents either:
 * - A parenthetical group with the parentheses removed
 * - A single token
 */
export function processParentheses(tokens: string[]): string[][] {
  const result: string[][] = [];
  let currentGroup: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].startsWith('(')) {
      // Start collecting a new group
      let depth = 1;
      currentGroup = [tokens[i].slice(1)]; // Remove opening parenthesis

      while (++i < tokens.length && depth > 0) {
        if (tokens[i].includes('(')) depth++;
        if (tokens[i].includes(')')) depth--;

        if (depth === 0) {
          // Remove closing parenthesis and add to group
          currentGroup.push(tokens[i].slice(0, -1));
        } else {
          currentGroup.push(tokens[i]);
        }
      }

      // Add completed group
      result.push(currentGroup);
      currentGroup = [];
      i--; // Adjust for loop increment
    } else if (!tokens[i].includes(')')) {
      // Add single token as its own group
      result.push([tokens[i]]);
    }
  }

  return result;
}

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
        terms: [terms.pop() as string | SearchTermGroup, matches[i + 1]],
      };
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
