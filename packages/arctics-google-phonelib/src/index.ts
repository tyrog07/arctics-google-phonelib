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

// import { PhoneNumberUtil } from '@arctics/google-phonelib-js';

// // Use phoneUtil as needed
// const number = PhoneNumberUtil.parseAndKeepRawInput('202-456-1414', 'US');
// console.log(number.getCountryCode());
// console.log(number.getNationalNumber());

import { PhoneNumberUtil } from '@arctics/google-phonelib-js';

const number = PhoneNumberUtil.parseAndKeepRawInput('202-456-1414', 'US');
// console.log(number.getCountryCode());
// console.log(number.getNationalNumber());
export default number;
