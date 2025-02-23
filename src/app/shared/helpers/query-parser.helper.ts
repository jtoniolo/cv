import {
  ParsedSearchQuery,
  SearchTermGroup,
} from '@app/models/search-query.model';

/**
 * Parses a search query string into a structured query object
 * Handles quoted terms, AND/OR operators with proper precedence
 */
export function parseSearchQuery(query?: string): ParsedSearchQuery | null {
  // Return null for empty, whitespace-only, or undefined queries
  if (!query?.trim()) return null;

  const trimmedQuery = query.trim();
  const tokens = extractTokens(trimmedQuery);
  const processedTerms = processTerms(tokens);

  return {
    rawQuery: trimmedQuery,
    rootGroup: createRootGroup(processedTerms),
  };
}

/**
 * Extracts tokens from query string, handling quoted terms
 * @param query The raw query string to tokenize
 * @returns Array of tokens with quotes removed from quoted terms
 */
function extractTokens(query: string): string[] {
  const regex = /'[^']*'|"[^"]*"|\S+/g;
  return Array.from(query.matchAll(regex), (m) => {
    const term = m[0];
    // Remove quotes if term is quoted
    return term.startsWith('"') || term.startsWith("'")
      ? term.slice(1, -1)
      : term;
  });
}

/**
 * Processes tokens into terms and groups based on operators
 * @param tokens Array of query tokens
 * @returns Array of terms and term groups
 */
function processTerms(tokens: string[]): (string | SearchTermGroup)[] {
  const terms: (string | SearchTermGroup)[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const isAndOp = tokens[i].toUpperCase() === 'AND';
    const isOrOp = tokens[i].toUpperCase() === 'OR';

    if (isAndOp && i > 0 && i < tokens.length - 1) {
      // Create AND group with previous and next terms
      const group = createAndGroup(
        terms.length > 0 ? (terms.pop() as string) : tokens[i - 1],
        tokens[i + 1]
      );
      terms.push(group);
      i++; // Skip next token as it's now in the group
    } else if (!isOrOp) {
      // Add non-operator terms to the list
      terms.push(tokens[i]);
    }
  }

  return terms;
}

/**
 * Creates an AND operator group from two terms
 * @param left First term or group
 * @param right Second term or group
 * @returns SearchTermGroup with AND operator
 */
function createAndGroup(
  left: string | SearchTermGroup,
  right: string | SearchTermGroup
): SearchTermGroup {
  return {
    operator: 'AND',
    terms: [left, right],
  };
}

/**
 * Creates the root group for the query
 * @param terms Processed terms and groups
 * @returns SearchTermGroup with appropriate operator
 */
function createRootGroup(terms: (string | SearchTermGroup)[]): SearchTermGroup {
  return {
    operator: 'OR',
    terms,
  };
}

/**
 * Processes tokens containing parentheses groups into structured terms
 * Handles nested parentheses and maintains operator precedence
 * @param tokens Array of tokens that may contain parentheses
 * @returns Array of processed terms with parentheses groups as SearchTermGroups
 */
export function processParentheses(
  tokens: string[]
): (string | SearchTermGroup)[] {
  const results: (string | SearchTermGroup)[] = [];

  for (let i = 0; i < tokens.length; i++) {
    // Found start of group
    if (tokens[i].startsWith('(')) {
      let depth = 1;
      const groupTokens: string[] = [];
      let j = i + 1;

      // Extract the first token without opening parenthesis
      groupTokens.push(tokens[i].slice(1));

      // Collect all tokens until matching closing parenthesis
      while (j < tokens.length && depth > 0) {
        const token = tokens[j];

        if (token.includes('(')) depth++;
        if (token.includes(')')) depth--;

        if (depth === 0) {
          // Add final token without closing parenthesis
          groupTokens.push(token.slice(0, -1));
        } else {
          groupTokens.push(token);
        }
        j++;
      }

      // Process the group contents recursively
      const innerQuery = parseSearchQuery(groupTokens.join(' '));
      if (innerQuery) {
        results.push(innerQuery.rootGroup);
      }

      // Skip the processed tokens
      i = j - 1;
    }
    // Regular token (not part of parentheses)
    else if (!tokens[i].includes(')')) {
      results.push(tokens[i]);
    }
  }

  return results;
}
