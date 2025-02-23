import { ParsedSearchQuery, SearchTermGroup } from '@app/models/search-query.model';

/**
 * Groups tokens into arrays based on parentheses.
 * Each array represents either a parenthetical group or a single token.
 */
export function processParentheses(tokens: string[]): string[][] {
  const result: string[][] = [];
  let depth = 0;
  let currentGroup: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === '(') {
      if (depth === 0) {
        // Start new group
        currentGroup = [];
      } else {
        // Add nested parenthesis to current group
        currentGroup.push(tokens[i]);
      }
      depth++;
    } 
    else if (tokens[i] === ')') {
      depth--;
      if (depth === 0) {
        // End current group
        result.push(currentGroup);
        currentGroup = [];
      } else {
        // Add nested closing parenthesis to group
        currentGroup.push(tokens[i]);
      }
    }
    else {
      if (depth > 0) {
        // Add to current group
        currentGroup.push(tokens[i]);
      } else {
        // Standalone token
        result.push([tokens[i]]);
      }
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
