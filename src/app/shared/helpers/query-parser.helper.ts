import {
  ParsedSearchQuery,
  SearchTermGroup,
  LogicalOperator,
} from '@app/models/search-query.model';

interface TokenOrGroup {
  token?: string;
  type: 'TERM' | 'OPERATOR' | 'GROUP';
  group?: TokenOrGroup[];
}

/**
 * TokenParser handles the parsing of search queries into a structured format that can be used
 * for advanced search operations. It supports both simple keyword searches and complex
 * boolean expressions with AND/OR operators and grouping via parentheses.
 *
 * The parser implements a recursive descent algorithm to handle nested groups and maintains
 * operator precedence (AND over OR) while parsing.
 */
class TokenParser {
  /**
   * Parses a search query string into a structured format.
   *
   * @param query - The raw search query string to parse
   * @returns {ParsedSearchQuery} A structured representation of the search query
   *
   * @example
   * // Simple query
   * parse("typescript angular") // Treats terms as OR
   *
   * @example
   * // Complex query with AND
   * parse("typescript AND angular") // Requires both terms
   *
   * @example
   * // Grouped query
   * parse("(typescript AND angular) OR react")
   */
  parse(query: string): ParsedSearchQuery {
    const tokens = this.tokenize(query);
    return {
      rawQuery: query,
      rootGroup: this.createRootGroup(tokens),
    };
  }

  /**
   * Breaks a query string into tokens, handling nested groups and quoted strings.
   * This is the first phase of parsing where the raw string is converted into
   * meaningful chunks that can be processed further.
   *
   * @param query - The search query string to tokenize
   * @returns An array of tokens, where each token is either a string or a nested SearchTermGroup
   *
   * @private
   */
  private tokenize(query: string): TokenOrGroup[] {
    let word = '';
    let i = 0;

    // strip outer parentheses since that is always redundant for our purposes.
    if (query.startsWith('(') && query.endsWith(')')) {
      query = query.slice(1, -1);
    }

    const regex = /'[^']*'|"[^"]*"|\([^()]*\)|\S+/g;
    const tokens = Array.from(query.matchAll(regex), (m) => {
      const term = m[0];

      if (term.startsWith('(')) {
        const innerTokens = this.tokenize(term);

        return {
          type: 'GROUP',
          group: innerTokens,
        } as TokenOrGroup;
      } else if (term.startsWith("'")) {
        // trim single quotes and return as term
        return { token: term.slice(1, -1), type: 'TERM' } as TokenOrGroup;
      } else if (term.startsWith('"')) {
        // trim double quotes and return as term
        return { token: term.slice(1, -1), type: 'TERM' } as TokenOrGroup;
      } else if (term.toUpperCase() === 'AND' || term.toUpperCase() === 'OR') {
        return { token: term.toUpperCase(), type: 'OPERATOR' } as TokenOrGroup;
      } else {
        return { token: term, type: 'TERM' } as TokenOrGroup;
      }
    });

    return tokens;
  }

  private createRootGroup(tokens: TokenOrGroup[]): SearchTermGroup {
    const processed = this.groupTerms(tokens);
    return {
      operator: 'OR',
      terms: processed,
    };
  }

  /**
   * Groups tokens based on AND operators, maintaining operator precedence.
   * AND operations are processed first, combining adjacent terms into AND groups.
   * Remaining terms are implicitly joined with OR operations at a higher level.
   *
   * @param tokens - Array of tokens to group
   * @returns Processed array with AND operations grouped
   *
   * @private
   */
  private groupTerms(tokens: TokenOrGroup[]): (string | SearchTermGroup)[] {
    // First pass: collect AND groups
    const andGroups: (string | SearchTermGroup)[] = [];
    let currentGroup: (string | SearchTermGroup)[] = [];
    let i = 0;

    while (i < tokens.length) {
      const current = tokens[i];

      if (
        current.type === 'OPERATOR' &&
        current.token?.toUpperCase() === 'AND'
      ) {
        i++;
        continue;
      }

      if (
        current.type === 'OPERATOR' &&
        current.token?.toUpperCase() === 'OR'
      ) {
        if (currentGroup.length > 1) {
          andGroups.push({
            operator: 'AND' as LogicalOperator,
            terms: currentGroup,
          });
        } else if (currentGroup.length === 1) {
          andGroups.push(currentGroup[0]);
        }
        currentGroup = [];
        i++;
        continue;
      }

      currentGroup.push(this.tokenToTerm(current));
      i++;
    }

    // Handle the last group
    if (currentGroup.length > 1) {
      andGroups.push({
        operator: 'AND' as LogicalOperator,
        terms: currentGroup,
      });
    } else if (currentGroup.length === 1) {
      andGroups.push(currentGroup[0]);
    }

    return andGroups;
  }

  private tokenToTerm(token: TokenOrGroup): string | SearchTermGroup {
    if (token.type === 'GROUP' && token.group) {
      return {
        operator: 'OR',
        terms: this.groupTerms(token.group),
      };
    }
    return token.token || '';
  }
}

// Single instance for all parsing operations
const parser = new TokenParser();

/**
 * Public interface for parsing search queries. Handles empty/null input gracefully
 * and provides a structured format for search operations.
 *
 * @param query - The search query string to parse
 * @returns Structured query object or null for empty input
 *
 * @example
 * const result = parseSearchQuery('typescript AND (angular OR react)');
 * // Returns structured object representing the boolean expression
 */
export function parseSearchQuery(query?: string): ParsedSearchQuery | null {
  if (!query || !query.trim()) return null;
  return parser.parse(query.trim());
}
