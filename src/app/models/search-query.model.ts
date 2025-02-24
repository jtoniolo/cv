export type LogicalOperator = 'AND' | 'OR';

export interface SearchTermGroup {
  terms: (string | SearchTermGroup)[];
  operator: LogicalOperator;
}

export interface ParsedSearchQuery {
  rawQuery: string;
  rootGroup: SearchTermGroup;
}
