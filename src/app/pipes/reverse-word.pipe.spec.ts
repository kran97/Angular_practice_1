import { ReverseWordPipe } from './reverse-word.pipe';

describe('ReverseWordPipe', () => {
  it('create an instance', () => {
    const pipe = new ReverseWordPipe();
    expect(pipe).toBeTruthy();
  });
});
