import pluralRule16 from '../../src/pluralRules/pluralRule16';

describe('pluralRule16', () => {
  it('should return 1 form if value is 1', () => {
    expect(pluralRule16(1)).toBe(0);
    expect(pluralRule16('1')).toBe(0);
  });

  it('should return 2 form if value ends in 1, excluding 1, 11, 71, 91', () => {
    expect(pluralRule16(21)).toBe(1);
    expect(pluralRule16('101')).toBe(1);
  });

  it('should return 3 form if value ends in 2, excluding 12, 72, 92', () => {
    expect(pluralRule16(22)).toBe(2);
    expect(pluralRule16('102')).toBe(2);
  });

  it('should return 4 form if value ends in 3, 4 or 9 excluding 13, 14, 19, 73, 74, 79, 93, 94, 99', () => {
    expect(pluralRule16(23)).toBe(3);
    expect(pluralRule16(103)).toBe(3);
    expect(pluralRule16('24')).toBe(3);
    expect(pluralRule16('104')).toBe(3);
    expect(pluralRule16(29)).toBe(3);
    expect(pluralRule16(109)).toBe(3);
  });

  it('should return 5 form if value ends in 1000000', () => {
    expect(pluralRule16(1000000)).toBe(4);
    expect(pluralRule16(2000000)).toBe(4);
    expect(pluralRule16('10000000')).toBe(4);
  });

  it('should return 6 form for anything else', () => {
    expect(pluralRule16()).toBe(5);
    expect(pluralRule16(0)).toBe(5);
    expect(pluralRule16('0')).toBe(5);
    expect(pluralRule16(5)).toBe(5);
    expect(pluralRule16(11)).toBe(5);
    expect(pluralRule16(12)).toBe(5);
    expect(pluralRule16(13)).toBe(5);
    expect(pluralRule16(14)).toBe(5);
    expect(pluralRule16(19)).toBe(5);
    expect(pluralRule16(71)).toBe(5);
    expect(pluralRule16(72)).toBe(5);
    expect(pluralRule16(73)).toBe(5);
    expect(pluralRule16(74)).toBe(5);
    expect(pluralRule16(79)).toBe(5);
    expect(pluralRule16(91)).toBe(5);
    expect(pluralRule16(92)).toBe(5);
    expect(pluralRule16(93)).toBe(5);
    expect(pluralRule16(94)).toBe(5);
    expect(pluralRule16(99)).toBe(5);
    expect(pluralRule16(111)).toBe(5);
    expect(pluralRule16(112)).toBe(5);
    expect(pluralRule16(113)).toBe(5);
    expect(pluralRule16(114)).toBe(5);
    expect(pluralRule16(119)).toBe(5);
    expect(pluralRule16(171)).toBe(5);
    expect(pluralRule16(172)).toBe(5);
    expect(pluralRule16(173)).toBe(5);
    expect(pluralRule16(174)).toBe(5);
    expect(pluralRule16(179)).toBe(5);
    expect(pluralRule16(191)).toBe(5);
    expect(pluralRule16(192)).toBe(5);
    expect(pluralRule16(193)).toBe(5);
    expect(pluralRule16(194)).toBe(5);
    expect(pluralRule16(199)).toBe(5);
  });
});
