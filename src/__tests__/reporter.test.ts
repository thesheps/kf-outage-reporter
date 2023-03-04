import Reporter from '../reporter';

describe('Reporter', () => {
  it('Does not throw an exception', () => {
    const reporter = new Reporter();

    expect(() => reporter.report('foo')).not.toThrow();
  });
});
