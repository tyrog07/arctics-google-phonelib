import { AsYouTypeHandler } from '../..';

describe('AsYouTypeHandler', () => {
  it('should format the phone number as you type', () => {
    const handler = new AsYouTypeHandler('US');
    expect(handler.typeNumber('1')).toBe('1');
    expect(handler.typeNumber('2')).toBe('12');
    expect(handler.typeNumber('0')).toBe('1 20');
    expect(handler.typeNumber('2')).toBe('1 (202');
    expect(handler.typeNumber('5')).toBe('1 (202) 5');
    expect(handler.typeNumber('5')).toBe('1 (202) 55');
    expect(handler.typeNumber('5')).toBe('1 (202) 555');
    expect(handler.typeNumber('0')).toBe('1 (202) 555-0');
    expect(handler.typeNumber('1')).toBe('1 (202) 555-01');
    expect(handler.typeNumber('0')).toBe('1 (202) 555-010');
    expect(handler.typeNumber('0')).toBe('1 (202) 555-0100');
  });

  it('should clear the input', () => {
    const handler = new AsYouTypeHandler('US');
    handler.typeNumber('12025550100');
    handler.clearInput();
    expect(handler.typeNumber('')).toBe('');
  });
});
