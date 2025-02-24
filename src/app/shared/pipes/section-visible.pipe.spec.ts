import { SectionVisiblePipe } from './section-visible.pipe';

describe('SectionVisiblePipe', () => {
  let pipe: SectionVisiblePipe;

  beforeEach(() => {
    pipe = new SectionVisiblePipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true when selectedSection is "all"', () => {
    expect(pipe.transform('all', 'experience')).toBe(true);
    expect(pipe.transform('all', 'education')).toBe(true);
    expect(pipe.transform('all', 'skills')).toBe(true);
  });

  it('should return true when selectedSection matches sectionName', () => {
    expect(pipe.transform('experience', 'experience')).toBe(true);
    expect(pipe.transform('education', 'education')).toBe(true);
    expect(pipe.transform('skills', 'skills')).toBe(true);
  });

  it('should return false when selectedSection does not match sectionName', () => {
    expect(pipe.transform('experience', 'education')).toBe(false);
    expect(pipe.transform('education', 'skills')).toBe(false);
    expect(pipe.transform('skills', 'experience')).toBe(false);
  });
});
