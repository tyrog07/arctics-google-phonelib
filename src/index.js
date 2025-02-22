/**
 * Comprehensive Phone Number Utility Wrapper (based on google-libphonenumber)
 *
 * This class provides a complete and simplified interface to the google-libphonenumber library.
 * It handles instance creation, error handling, and provides a wide range of phone number operations.
 *
 * Usage:
 * const phoneUtil = new PhoneNumberWrapper();
 * const phoneNumber = phoneUtil.parse('1234567890', 'US');
 * const formattedNumber = phoneUtil.format(phoneNumber, 'E164');
 * const isValid = phoneUtil.isValidNumber(phoneNumber);
 * // ...etc.
 */
import pkg from './providers/google-libphonenumber/libphonenumber.cjs';

export class PhoneNumberWrapper {
  constructor() {
    this.libphonenumber = pkg;
    this.phoneUtil = this.libphonenumber.PhoneNumberUtil.getInstance();
    this.PhoneNumberFormat = this.libphonenumber.PhoneNumberFormat;
    this.PhoneNumberType = this.libphonenumber.PhoneNumberType;
    this.PhoneNumberUtil = this.libphonenumber.PhoneNumberUtil; //Expose the original util for advanced usage.
    this.AsYouTypeFormatter = this.libphonenumber.AsYouTypeFormatter; //Expose the formatter.
    this.PhoneNumber = this.libphonenumber.PhoneNumber; //Expose the PhoneNumber object.
  }

  /**
   * Parses a phone number string.
   *
   * @param {string} numberString The phone number string to parse.
   * @param {string} regionCode The region code (e.g., 'US', 'GB').
   * @returns {PhoneNumber|null} The parsed PhoneNumber object, or null if parsing fails.
   */
  parse(numberString, regionCode) {
    try {
      return this.phoneUtil.parse(numberString, regionCode);
    } catch (e) {
      console.error('Error parsing phone number:', e);
      return null;
    }
  }

  /**
   * Formats a PhoneNumber object.
   *
   * @param {PhoneNumber} phoneNumber The PhoneNumber object to format.
   * @param {string} format The desired format (e.g., 'E164', 'NATIONAL', 'INTERNATIONAL').
   * @returns {string} The formatted phone number, or an empty string if formatting fails.
   */
  format(phoneNumber, format) {
    if (!phoneNumber) {
      return '';
    }
    try {
      return this.phoneUtil.format(phoneNumber, this.PhoneNumberFormat[format]);
    } catch (e) {
      console.error('Error formatting phone number:', e);
      return '';
    }
  }

  /**
   * Checks if a PhoneNumber object is valid.
   *
   * @param {PhoneNumber} phoneNumber The PhoneNumber object to check.
   * @returns {boolean} True if the number is valid, false otherwise.
   */
  isValidNumber(phoneNumber) {
    if (!phoneNumber) {
      return false;
    }
    return this.phoneUtil.isValidNumber(phoneNumber);
  }

  /**
   * Gets the region code for a PhoneNumber object.
   *
   * @param {PhoneNumber} phoneNumber The PhoneNumber object.
   * @returns {string|null} The region code, or null if it cannot be determined.
   */
  getRegionCodeForNumber(phoneNumber) {
    if (!phoneNumber) {
      return null;
    }
    return this.phoneUtil.getRegionCodeForNumber(phoneNumber);
  }

  /**
   * Gets the type of a PhoneNumber object.
   *
   * @param {PhoneNumber} phoneNumber The PhoneNumber object.
   * @returns {string|null} The phone number type (e.g., 'MOBILE', 'FIXED_LINE'), or null if it cannot be determined.
   */
  getNumberType(phoneNumber) {
    if (!phoneNumber) {
      return null;
    }

    try {
      const type = this.phoneUtil.getNumberType(phoneNumber);
      return this.PhoneNumberType[type];
    } catch (e) {
      console.error('Error getting number type:', e);
      return null;
    }
  }

  /**
   * Checks if a number is possible.
   *
   * @param {PhoneNumber} phoneNumber The PhoneNumber object.
   * @returns {boolean} True if the number is possible, false otherwise.
   */
  isPossibleNumber(phoneNumber) {
    if (!phoneNumber) {
      return false;
    }

    return this.phoneUtil.isPossibleNumber(phoneNumber);
  }

  /**
   * Checks if a number is valid for region.
   *
   * @param {PhoneNumber} phoneNumber The PhoneNumber object.
   * @param {string} regionCode The region code (e.g., 'US', 'GB').
   * @returns {boolean} True if the number is valid for region, false otherwise.
   */
  isValidNumberForRegion(phoneNumber, regionCode) {
    if (!phoneNumber) {
      return false;
    }
    return this.phoneUtil.isValidNumberForRegion(phoneNumber, regionCode);
  }

  /**
   * Gets the country code for a PhoneNumber object.
   *
   * @param {PhoneNumber} phoneNumber The PhoneNumber object.
   * @returns {number|null} The country code, or null if it cannot be determined.
   */
  getCountryCodeForRegion(regionCode) {
    try {
      return this.phoneUtil.getCountryCodeForRegion(regionCode);
    } catch (e) {
      console.error('Error getting country code for region:', e);
      return null;
    }
  }

  /**
   * Gets the example number for a region and type.
   *
   * @param {string} regionCode The region code (e.g., 'US', 'GB').
   * @param {string} type The phone number type (e.g., 'MOBILE', 'FIXED_LINE').
   * @returns {PhoneNumber|null} The example PhoneNumber object, or null if it cannot be determined.
   */
  getExampleNumberForType(regionCode, type) {
    try {
      return this.phoneUtil.getExampleNumberForType(
        regionCode,
        this.PhoneNumberType[type],
      );
    } catch (e) {
      console.error('Error getting example number for type:', e);
      return null;
    }
  }

  /**
   * Creates an AsYouTypeFormatter
   * @param {string} regionCode The region code.
   * @returns {AsYouTypeFormatter}
   */
  createAsYouTypeFormatter(regionCode) {
    return new this.AsYouTypeFormatter(regionCode);
  }

  /**
   * Gets the length of the national significant number.
   * @param {PhoneNumber} phoneNumber The PhoneNumber object.
   * @returns {number}
   */
  getLengthOfNationalSignificantNumber(phoneNumber) {
    if (!phoneNumber) {
      return 0;
    }
    return this.phoneUtil.getLengthOfNationalSignificantNumber(phoneNumber);
  }
}

// Example usage (ensure google-libphonenumber is installed):
// npm install google-libphonenumber

// const phoneUtil = new PhoneNumberWrapper();
// const number = phoneUtil.parse('16502530000', 'US');
// if (number) {
//   const formatted = phoneUtil.format(number, 'E164');
//   const isValid = phoneUtil.isValidNumber(number);
//   const region = phoneUtil.getRegionCodeForNumber(number);
//   const type = phoneUtil.getNumberType(number);
//   const possible = phoneUtil.isPossibleNumber(number);
//   const validForRegion = phoneUtil.isValidNumberForRegion(number, 'US');
//   const countryCode = phoneUtil.getCountryCodeForRegion('US');
//   const exampleNumber = phoneUtil.getExampleNumberForType('US', 'MOBILE');
//   const formatter = phoneUtil.createAsYouTypeFormatter('US');
//   const length = phoneUtil.getLengthOfNationalSignificantNumber(number);

//   console.log('Formatted:', formatted);
//   console.log('Valid:', isValid);
//   console.log('Region:', region);
//   console.log('Type:', type);
//   console.log('Possible:', possible);
//   console.log('Valid for Region:', validForRegion);
//   console.log('Country Code:', countryCode);
//   console.log('Example Number:', exampleNumber? phoneUtil.format(exampleNumber, 'NATIONAL'): null);
//   console.log('As You Type Formatter:', formatter);
//   console.log('Length of National Significant Number:', length);
// }
