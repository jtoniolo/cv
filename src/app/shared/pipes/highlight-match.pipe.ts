import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlightMatch',
  standalone: true,
})
export class HighlightMatchPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, searchTerm?: string): SafeHtml {
    if (!searchTerm || !text) {
      return text;
    }

    const pattern = new RegExp(searchTerm, 'gi');
    const result = text.replace(pattern, (match) => `<mark>${match}</mark>`);

    return this.sanitizer.bypassSecurityTrustHtml(result);
  }
}
