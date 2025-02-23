import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonSearch',
  standalone: true,
})
export class JsonSearchPipe implements PipeTransform {
  transform(value: any, searchTerm?: string): boolean {
    if (!searchTerm) return true;
    if (!value) return false;

    const term = searchTerm.toLowerCase();
    const jsonString = JSON.stringify(value).toLowerCase();

    return jsonString.includes(term);
  }
}
