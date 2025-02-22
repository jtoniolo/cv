import { HighlightMatchPipe } from './highlight-match.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { TestBed } from '@angular/core/testing';

describe('HighlightMatchPipe', () => {
  let pipe: HighlightMatchPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighlightMatchPipe],
    });
    sanitizer = TestBed.inject(DomSanitizer);
    pipe = new HighlightMatchPipe(sanitizer);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return original text when no search term is provided', () => {
    const text = 'Sample text';
    expect(pipe.transform(text, '')).toBe(text);
  });

  it('should return original text when text is empty', () => {
    expect(pipe.transform('', 'search')).toBe('');
  });

  it('should wrap matched text in mark tags', () => {
    const text = 'Angular Developer';
    const searchTerm = 'angular';
    const result = pipe.transform(text, searchTerm);
    expect(result.toString()).toContain('<mark>Angular</mark>');
  });

  it('should handle multiple matches in text', () => {
    const text = 'Angular is great, Angular is awesome';
    const searchTerm = 'angular';
    const result = pipe.transform(text, searchTerm);
    const matches = result.toString().match(/<mark>Angular<\/mark>/g);
    expect(matches?.length).toBe(2);
  });
});
