import pluralRule14 from '../../src/pluralRules/pluralRule14';

describe('pluralRule14', () => {
  it('should return 1 form if value ends in 1', () => {
    expect(pluralRule14(1));
    expect(pluralRule14(11));
    expect(pluralRule14('101'));
  });

  it('should return 2 form if value ends in 2', () => {
    expect(pluralRule14(2));
    expect(pluralRule14(12));
    expect(pluralRule14('102'));
  });

  it('should return 3 form for everything else', () => {
    expect(pluralRule14());
    expect(pluralRule14(0));
    expect(pluralRule14('0'));
    expect(pluralRule14(3));
    expect(pluralRule14(13));
    expect(pluralRule14('103'));
  });
});
