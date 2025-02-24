import { JsonSearchPipe } from './json-search.pipe';

describe('JsonSearchPipe', () => {
  let pipe: JsonSearchPipe;

  beforeEach(() => {
    pipe = new JsonSearchPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true when no search term is provided', () => {
    const testObj = { name: 'Test', value: 123 };
    expect(pipe.transform(testObj, '')).toBe(true);
  });

  it('should return false when object is null or undefined', () => {
    expect(pipe.transform(null, 'test')).toBe(false);
    expect(pipe.transform(undefined, 'test')).toBe(false);
  });

  it('should find text in nested objects', () => {
    const testObj = {
      level1: {
        level2: {
          text: 'findThis',
        },
      },
    };
    expect(pipe.transform(testObj, 'findThis')).toBe(true);
  });

  it('should match case insensitive', () => {
    const testObj = { text: 'CamelCase' };
    expect(pipe.transform(testObj, 'camelcase')).toBe(true);
    expect(pipe.transform(testObj, 'CAMELCASE')).toBe(true);
  });

  it('should work with arrays', () => {
    const testArr = ['one', 'two', 'three'];
    expect(pipe.transform(testArr, 'two')).toBe(true);
    expect(pipe.transform(testArr, 'four')).toBe(false);
  });
});
