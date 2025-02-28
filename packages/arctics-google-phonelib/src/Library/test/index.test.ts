import { PhoneNumberHandler, PhoneNumberFormat } from '../../';
import { IPhoneNumber } from '../../types';

describe('PhoneNumberHandler', () => {
  it('should parse the phone number on initialization', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const parsedPhoneNumber = (handler as any)
      .parsedPhoneNumber as IPhoneNumber; // Access private property for testing

    expect(parsedPhoneNumber.getCountryCode()).toBe(1);
    expect(parsedPhoneNumber.getNationalNumber()).toBe(2025550100);
  });

  it('should format the phone number in E164 format', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const formatted = handler.format(PhoneNumberFormat.E164);
    expect(formatted).toBe('+12025550100');
  });

  it('should format the phone number in INTERNATIONAL format', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const formatted = handler.format(PhoneNumberFormat.INTERNATIONAL);
    expect(formatted).toBe('+1 202-555-0100');
  });

  it('should format the phone number in NATIONAL format', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const formatted = handler.format(PhoneNumberFormat.NATIONAL);
    expect(formatted).toBe('(202) 555-0100');
  });

  it('should format the phone number in RFC3966 format', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const formatted = handler.format(PhoneNumberFormat.RFC3966);
    expect(formatted).toBe('tel:+1-202-555-0100');
  });

  it('should format number in the out-of-country format', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const formatted = handler.formatOutOfCountryCallingNumber('US');
    expect(formatted).toBe('1 (202) 555-0100');
  });

  it('should return the correct number type', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const info = handler.getPhoneNumberInfo();
    expect(info?.numberType).toBe('FIXED_LINE_OR_MOBILE');
  });

  it('should return UNKNOWN for unknown number types', () => {
    const handler = new PhoneNumberHandler('+123456789', 'ZZ'); // ZZ is an invalid region
    const info = handler.getPhoneNumberInfo();
    expect(info?.numberType).toBe('UNKNOWN');
  });

  it('should return phone number information', () => {
    const handler = new PhoneNumberHandler('+12025550100', 'US');
    const info = handler.getPhoneNumberInfo();
    expect(info).toEqual({
      countryCode: 1,
      countryCodeSource: 1, // NumberingPlan
      extension: null,
      italianLeadingZero: false,
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
    expect(info?.numberType).toBe('FIXED_LINE_OR_MOBILE');
  });

  it('should handle toll free number type', () => {
    const handler = new PhoneNumberHandler('+1-800-GO-FEDEX', 'US');
    const info = handler.getPhoneNumberInfo();
    expect(info?.numberType).toBe('TOLL_FREE');
  });

  it('should handle premium rate number type', () => {
    const handler = new PhoneNumberHandler('+1-900-555-1212', 'US');
    const info = handler.getPhoneNumberInfo();
    expect(info?.numberType).toBe('PREMIUM_RATE');
  });

  it('should handle invalid number', () => {
    const handler = new PhoneNumberHandler('+123', 'US');
    const info = handler.getPhoneNumberInfo();
    expect(info?.valid).toBe(false);
    expect(info?.possible).toBe(false);
  });

  it('should handle invalid constructor mode', () => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    new PhoneNumberHandler('+12025550100', 'US', 'INVALID_MODE');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Invalid mode: INVALID_MODE. Using 'parseAndKeepRawInput' as default.",
    );
    consoleErrorSpy.mockRestore();
  });

  it('should return null when parsing fails', () => {
    let handler: PhoneNumberHandler | null = null;
    try {
      handler = new PhoneNumberHandler('invalid', 'US');
    } catch {
      // Constructor failed, which is expected for invalid input
      expect(handler).toBeNull();
      return; // Exit the test, as the constructor failed
    }
    // If we reach this point, the constructor succeeded, but parsing should still fail
    const info = handler.getPhoneNumberInfo();
    expect(info).toBeNull();
  });

  it('should handle null regionCode in getPhoneNumberInfo', () => {
    const handler = new PhoneNumberHandler('+123456789', 'ZZ');
    const info = handler.getPhoneNumberInfo();
    expect(info?.validForRegion).toBe(false);
  });

  it('should formatInOriginalFormat', () => {
    const handler = new PhoneNumberHandler('2025550100', 'US');
    const formatted = handler.formatInOriginalFormat('US');
    expect(formatted).toBe('(202) 555-0100');
  });
});
