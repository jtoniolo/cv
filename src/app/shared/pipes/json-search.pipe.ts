import { Pipe, PipeTransform } from '@angular/core';
import { ParsedSearchQuery } from '@app/models/search-query.model';
import { evaluateSearchQuery } from '../helpers/search-evaluator.helper';

@Pipe({
  name: 'jsonSearch',
  standalone: true,
})
export class JsonSearchPipe implements PipeTransform {
  transform(value: any, query: ParsedSearchQuery | null): boolean {
    return evaluateSearchQuery(value, query);
  }
}
