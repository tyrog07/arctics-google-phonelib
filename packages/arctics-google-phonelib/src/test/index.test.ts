import { PhoneNumberHandler } from '../';

describe('PhoneNumberHandler', () => {
  it('should parse the phone number on initialization', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const parsedPhoneNumber = (handler as any).parsedPhoneNumber; // Access private property for testing

    expect(parsedPhoneNumber.getCountryCode()).toBe(1);
    expect(parsedPhoneNumber.getNationalNumber()).toBe(2025550100);
  });

  it('should format the phone number in E164 format', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const formatted = handler.format('E164');
    expect(formatted).toBe('+12025550100');
  });

  it('should format the phone number in INTERNATIONAL format', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const formatted = handler.format('INTERNATIONAL');
    expect(formatted).toBe('+1 202-555-0100');
  });

  it('should format the phone number in NATIONAL format', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const formatted = handler.format('NATIONAL');
    expect(formatted).toBe('(202) 555-0100');
  });

  it('should format the phone number in RFC3966 format', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const formatted = handler.format('RFC3966');
    expect(formatted).toBe('tel:+1-202-555-0100');
  });

  it('should default to INTERNATIONAL format if an invalid format is provided', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const formatted = handler.format('INVALID_FORMAT' as any);
    expect(formatted).toBe('+1 202-555-0100');
  });

  it('should return the correct number type', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const info = handler.getPhoneNumberInfo();
    expect(info.numberType).toBe('FIXED_LINE_OR_MOBILE');
  });

  it('should return UNKNOWN for unknown number types', () => {
    const handler = new PhoneNumberHandler('+123456789', 'ZZ'); // ZZ is an invalid region
    const info = handler.getPhoneNumberInfo();
    expect(info.numberType).toBe('UNKNOWN');
  });

  it('should return phone number information', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const info = handler.getPhoneNumberInfo();
    expect(info).toEqual({
      countryCode: 1,
      countryCodeSource: 1, // NumberingPlan
      extension: null,
      italianLeadingZero: null,
      nationalNumber: 2025550100,
      numberType: 'FIXED_LINE_OR_MOBILE',
      possible: true,
      rawInput: '+12025550100',
      regionCode: 'US',
      valid: true,
      validForRegion: true,
    });
  });

  it('should handle mobile number type', () => {
    const handler = new PhoneNumberHandler('+17099902909', 'US');
    const info = handler.getPhoneNumberInfo();
    expect(info.numberType).toBe('FIXED_LINE_OR_MOBILE');
  });

  it('should handle toll free number type', () => {
    const handler = new PhoneNumberHandler('+1-800-GO-FEDEX', 'US');
    const info = handler.getPhoneNumberInfo();
    expect(info.numberType).toBe('TOLL_FREE');
  });

  it('should handle premium rate number type', () => {
    const handler = new PhoneNumberHandler('+1-900-555-1212', 'US');
    const info = handler.getPhoneNumberInfo();
    expect(info.numberType).toBe('PREMIUM_RATE');
  });

  it('should handle invalid number', () => {
    const handler = new PhoneNumberHandler('+123', 'US');
    const info = handler.getPhoneNumberInfo();
    expect(info.valid).toBe(false);
    expect(info.possible).toBe(false);
  });
});
