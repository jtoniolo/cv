import {
  ParsedSearchQuery,
  SearchTermGroup,
  LogicalOperator,
} from '@app/models/search-query.model';

class TokenParser {
  parse(query: string): ParsedSearchQuery {
    const tokens = this.tokenize(query);
    const groupedTokens = this.groupTerms(tokens);
    // If the query starts with '(' then use the grouped token as rootGroup; otherwise wrap in an OR group
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

  private tokenize(query: string): (string | SearchTermGroup)[] {
    const tokens: (string | SearchTermGroup)[] = [];
    let word = '';
    let i = 0;
    while (i < query.length) {
      const char = query[i];
      if (char === '(') {
        if (word.trim() !== '') {
          tokens.push(...this.splitWord(word));
          word = '';
        }
        const result = this.tokenizeGroup(query, i + 1);
        tokens.push(result.group);
        i = result.newIndex;
        continue;
      } else if (char === ')') {
        if (word.trim() !== '') {
          tokens.push(...this.splitWord(word));
          word = '';
        }
        i++; // consume ')'
        continue; // return to allow outer call to handle closing
      } else if (/\s/.test(char)) {
        if (word.trim() !== '') {
          tokens.push(...this.splitWord(word));
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
      tokens.push(...this.splitWord(word));
    }
    return tokens;
  }

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
        if (word.trim() !== '') {
          subTokens.push(...this.splitWord(word));
          word = '';
        }
        const result = this.tokenizeGroup(query, i + 1);
        subTokens.push(result.group);
        i = result.newIndex;
        continue;
      } else if (char === ')') {
        if (word.trim() !== '') {
          subTokens.push(...this.splitWord(word));
          word = '';
        }
        i++; // consume ')'
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

  private splitWord(word: string): string[] {
    const trimmed = word.trim();
    if (trimmed.toUpperCase() === 'OR') return [];
    return [
      (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
      (trimmed.startsWith("'") && trimmed.endsWith("'"))
        ? trimmed.slice(1, -1)
        : trimmed,
    ];
  }

  private groupTerms(
    tokens: (string | SearchTermGroup)[]
  ): (string | SearchTermGroup)[] {
    const result: (string | SearchTermGroup)[] = [];
    let i = 0;
    while (i < tokens.length) {
      const current = tokens[i];
      if (
        typeof current === 'string' &&
        current.toUpperCase() === 'AND' &&
        i > 0 &&
        i < tokens.length - 1
      ) {
        const prev = result.pop()!;
        const next = tokens[i + 1];
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

const parser = new TokenParser();

export function parseSearchQuery(query?: string): ParsedSearchQuery | null {
  if (!query || !query.trim()) return null;
  return parser.parse(query.trim());
}
