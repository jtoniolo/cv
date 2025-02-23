import { parseSearchQuery } from './query-parser.helper';

describe('QueryParserHelper', () => {
  describe('parseSearchQuery', () => {
    it('should return null for empty query', () => {
      expect(parseSearchQuery('')).toBeNull();
      expect(parseSearchQuery(' ')).toBeNull();
      expect(parseSearchQuery(undefined)).toBeNull();
    });

    it('should parse single term', () => {
      const result = parseSearchQuery('angular');
      expect(result).toEqual({
        rawQuery: 'angular',
        rootGroup: {
          terms: ['angular'],
          operator: 'OR',
        },
      });
    });

    it('should parse multiple OR terms', () => {
      const result = parseSearchQuery('angular react vue');
      expect(result).toEqual({
        rawQuery: 'angular react vue',
        rootGroup: {
          terms: ['angular', 'react', 'vue'],
          operator: 'OR',
        },
      });
    });

    it('should parse quoted terms', () => {
      const result = parseSearchQuery('"angular developer"');
      expect(result).toEqual({
        rawQuery: '"angular developer"',
        rootGroup: {
          terms: ['angular developer'],
          operator: 'OR',
        },
      });
    });

    it('should handle mixed quotes', () => {
      const result = parseSearchQuery('"full stack" AND \'node.js\'');
      expect(result).toEqual({
        rawQuery: '"full stack" AND \'node.js\'',
        rootGroup: {
          terms: [
            {
              terms: ['full stack', 'node.js'],
              operator: 'AND',
            },
          ],
          operator: 'OR',
        },
      });
    });

    it('should handle case insensitivity', () => {
      const result = parseSearchQuery('Angular and TypeScript OR React');
      expect(result).toEqual({
        rawQuery: 'Angular and TypeScript OR React',
        rootGroup: {
          terms: [
            {
              terms: ['Angular', 'TypeScript'],
              operator: 'AND',
            },
            'React',
          ],
          operator: 'OR',
        },
      });
    });

    it('should parse AND terms', () => {
      const result = parseSearchQuery('angular AND typescript');
      expect(result).toEqual({
        rawQuery: 'angular AND typescript',
        rootGroup: {
          terms: [
            {
              terms: ['angular', 'typescript'],
              operator: 'AND',
            },
          ],
          operator: 'OR',
        },
      });
    });

    it('should parse mixed AND/OR terms', () => {
      const result = parseSearchQuery('angular AND typescript OR react');
      expect(result).toEqual({
        rawQuery: 'angular AND typescript OR react',
        rootGroup: {
          terms: [
            {
              terms: ['angular', 'typescript'],
              operator: 'AND',
            },
            'react',
          ],
          operator: 'OR',
        },
      });
    });

    it('should parse "microservice or .net and sql" correctly', () => {
      const result = parseSearchQuery('microservice or .net and sql');
      expect(result).toEqual({
        rawQuery: 'microservice or .net and sql',
        rootGroup: {
          terms: [
            'microservice',
            {
              terms: ['.net', 'sql'],
              operator: 'AND',
            },
          ],
          operator: 'OR',
        },
      });
    });

    it('should parse parentheses with AND', () => {
      const result = parseSearchQuery('(microservice OR .net) AND sql');
      expect(result).toEqual({
        rawQuery: '(microservice OR .net) AND sql',
        rootGroup: {
          terms: [
            {
              terms: ['microservice', '.net'],
              operator: 'OR',
            },
            'sql',
          ],
          operator: 'AND',
        },
      });
    });

    it('should parse nested parentheses', () => {
      const result = parseSearchQuery(
        '(angular AND (typescript OR javascript)) AND testing'
      );
      expect(result).toEqual({
        rawQuery: '(angular AND (typescript OR javascript)) AND testing',
        rootGroup: {
          terms: [
            {
              terms: [
                'angular',
                {
                  terms: ['typescript', 'javascript'],
                  operator: 'OR',
                },
              ],
              operator: 'AND',
            },
            'testing',
          ],
          operator: 'AND',
        },
      });
    });
  });
});
