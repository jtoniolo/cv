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
    const groupedTokens = this.groupTerms(tokens);
    // If query starts with parentheses, preserve the explicit grouping
    // Otherwise, wrap terms in an OR group for default OR behavior
    let rootGroup: SearchTermGroup;
    if (
      groupedTokens.length === 1 &&
      typeof groupedTokens[0] === 'object' &&
      query.trim().startsWith('(')
    ) {
      rootGroup = groupedTokens[0] as SearchTermGroup;
    } else {
      rootGroup = {
        operator: 'OR' as const,
        terms: groupedTokens,
      };
    }
    return {
      rawQuery: query,
      rootGroup,
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

    const regex = /'[^']*'|"[^"]*"|\([^()]*\)|\S+/g;
    const tokens = Array.from(query.matchAll(regex), (m) => {
      const term = m[0];

      if (term.startsWith('(')) {
        // Remove outer parentheses and recursively tokenize the inner content
        const innerContent = term.slice(1, -1);
        const innerTokens = this.tokenize(innerContent);
        // Process the inner tokens to create a grouped structure
        const groupedTokens = this.groupTerms(
          innerTokens.map((t) => t.token || t.group).filter(Boolean)
        );
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
        return { token: term, type: 'OPERATOR' } as TokenOrGroup;
      } else {
        return { token: term, type: 'TERM' } as TokenOrGroup;
      }
    });

    return tokens;
  }

  /**
   * Processes a nested group within parentheses, recursively handling nested subgroups.
   * This method is called when encountering an opening parenthesis and processes until
   * the matching closing parenthesis is found.
   *
   * @param query - The full query string
   * @param startIndex - The index after the opening parenthesis
   * @returns Object containing the parsed group and the new position in the query string
   *
   * @private
   */
  private tokenizeGroup(
    query: string,
    startIndex: number
  ): { group: SearchTermGroup; newIndex: number } {
    const subTokens: (string | SearchTermGroup)[] = [];
    let word = '';
    let i = startIndex;

    while (i < query.length) {
      const char = query[i];
      if (char === '(') {
        // Handle nested groups recursively
        if (word.trim() !== '') {
          subTokens.push(...this.splitWord(word));
          word = '';
        }
        const result = this.tokenizeGroup(query, i + 1);
        subTokens.push(result.group);
        i = result.newIndex;
        continue;
      } else if (char === ')') {
        // Group end found - process remaining word and exit
        if (word.trim() !== '') {
          subTokens.push(...this.splitWord(word));
          word = '';
        }
        i++;
        break;
      } else if (/\s/.test(char)) {
        if (word.trim() !== '') {
          subTokens.push(...this.splitWord(word));
          word = '';
        }
        i++;
        continue;
      } else {
        word += char;
        i++;
      }
    }
    if (word.trim() !== '') {
      subTokens.push(...this.splitWord(word));
    }
    const grouped = this.groupTerms(subTokens);
    return { group: { operator: 'OR' as const, terms: grouped }, newIndex: i };
  }

  /**
   * Processes individual words, handling quoted strings and filtering out OR operators.
   * Quoted strings are preserved as exact phrases by removing the quotes but keeping
   * the contents as a single token.
   *
   * @param word - The word to process
   * @returns Array of processed tokens (empty for OR operator, otherwise single token)
   *
   * @private
   */
  private splitWord(word: string): string[] {
    const trimmed = word.trim();
    // Filter out OR operators as they're handled implicitly
    if (trimmed.toUpperCase() === 'OR') return [];
    // Handle quoted strings by removing quotes but preserving as single token
    return [
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))
        ? trimmed.slice(1, -1)
        : trimmed,
    ];
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
  private groupTerms(
    tokens: (string | SearchTermGroup)[]
  ): (string | SearchTermGroup)[] {
    const result: (string | SearchTermGroup)[] = [];
    let i = 0;

    while (i < tokens.length) {
      const current = tokens[i];
      // Look for AND operator between two terms
      if (
        typeof current === 'string' &&
        current.toUpperCase() === 'AND' &&
        i > 0 &&
        i < tokens.length - 1
      ) {
        const prev = result.pop()!;
        const next = tokens[i + 1];
        // Create AND group with terms on either side
        result.push({
          operator: 'AND' as const,
          terms: [prev, next],
        });
        i += 2;
      } else {
        result.push(current);
        i++;
      }
    }
    return result;
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
