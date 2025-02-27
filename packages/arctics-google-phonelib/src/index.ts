import {
  PhoneNumberUtil,
  PhoneNumberType,
  PhoneNumberFormat,
  // ValidationResult,
  // AsYouTypeFormatter,
  // ShortNumberInfo,
} from '@arctics/google-phonelib-js';

import {
  IPhoneNumber,
  IPhoneNumberInfo,
  IPhoneNumberUtil,
  NumberFormat,
} from 'types';

/**
 * PhoneNumberHandler class for parsing, formatting, and retrieving information about phone numbers.
 */
export class PhoneNumberHandler {
  /**
   * Instance of PhoneNumberUtil for phone number operations.
   * @private
   */
  private phoneUtil: IPhoneNumberUtil;

  /**
   * Parsed phone number object.
   * @private
   */
  private parsedPhoneNumber: IPhoneNumber;

  /**
   * Creates an instance of PhoneNumberHandler.
   * @param {string} phoneNumber - The phone number string to parse.
   * @param {string} regionCode - The region code (e.g., 'US', 'GB') for parsing the phone number.
   */
  constructor(phoneNumber: string, regionCode: string) {
    this.phoneUtil = PhoneNumberUtil;
    this.parsedPhoneNumber = this.phoneUtil.parseAndKeepRawInput(
      phoneNumber,
      regionCode,
    );
  }

  /**
   * Formats the parsed phone number according to the specified format.
   * @param {NumberFormat} numberFormat - The desired format (E164, INTERNATIONAL, NATIONAL, RFC3966).
   * @returns {string | null} The formatted phone number, or null if an error occurs.
   */
  format(numberFormat: NumberFormat): string | null {
    switch (numberFormat) {
      case 'E164':
        return this.phoneUtil.format(
          this.parsedPhoneNumber,
          PhoneNumberFormat.E164,
        );
      case 'INTERNATIONAL':
        return this.phoneUtil.format(
          this.parsedPhoneNumber,
          PhoneNumberFormat.INTERNATIONAL,
        );
      case 'NATIONAL':
        return this.phoneUtil.format(
          this.parsedPhoneNumber,
          PhoneNumberFormat.NATIONAL,
        );
      case 'RFC3966':
        return this.phoneUtil.format(
          this.parsedPhoneNumber,
          PhoneNumberFormat.RFC3966,
        );
      default:
        return this.phoneUtil.format(
          this.parsedPhoneNumber,
          PhoneNumberFormat.INTERNATIONAL,
        );
    }
  }

  /**
   * Gets the type of the parsed phone number as a string.
   * @private
   * @returns {string} The phone number type (e.g., 'MOBILE', 'FIXED_LINE', 'UNKNOWN').
   */
  private getNumberType(): string {
    switch (this.phoneUtil.getNumberType(this.parsedPhoneNumber)) {
      case PhoneNumberType.FIXED_LINE:
        return 'FIXED_LINE';
      case PhoneNumberType.MOBILE:
        return 'MOBILE';
      case PhoneNumberType.FIXED_LINE_OR_MOBILE:
        return 'FIXED_LINE_OR_MOBILE';
      case PhoneNumberType.TOLL_FREE:
        return 'TOLL_FREE';
      case PhoneNumberType.PREMIUM_RATE:
        return 'PREMIUM_RATE';
      case PhoneNumberType.SHARED_COST:
        return 'SHARED_COST';
      case PhoneNumberType.VOIP:
        return 'VOIP';
      case PhoneNumberType.PERSONAL_NUMBER:
        return 'PERSONAL_NUMBER';
      case PhoneNumberType.PAGER:
        return 'PAGER';
      case PhoneNumberType.UAN:
        return 'UAN';
      case PhoneNumberType.VOICEMAIL:
        return 'VOICEMAIL';
      default:
        return 'UNKNOWN';
    }
  }

  /**
   * Gets information about a phone number.
   * @returns {IPhoneNumberInfo} An object containing phone number information.
   * @property {number} countryCode The phone's country code.
   * @property {number} countryCodeSource The phone's extension when compared to i18n.phonenumbers.CountryCodeSource.
   * @property {any} extension The phone's extension.
   * @property {boolean | null} italianLeadingZero The phone's italian leading zero.
   * @property {number} nationalNumber The phone's national number.
   * @property {string} numberType The result from getNumberType() when compared to i18n.phonenumbers.PhoneNumberType.
   * @property {boolean} possible The result from isPossibleNumber().
   * @property {string} rawInput The phone's raw input.
   * @property {string | undefined} regionCode The result from getRegionCodeForNumber().
   * @property {boolean} valid The result from isValidNumber().
   * @property {boolean} validForRegion The result from isValidNumberForRegion().
   */
  getPhoneNumberInfo(): IPhoneNumberInfo {
    return {
      countryCode: this.parsedPhoneNumber.getCountryCode(),
      countryCodeSource: this.parsedPhoneNumber.getCountryCodeSource(),
      extension: this.parsedPhoneNumber.getExtension(),
      italianLeadingZero: this.parsedPhoneNumber?.getItalianLeadingZero(),
      nationalNumber: this.parsedPhoneNumber.getNationalNumber(),
      numberType: this.getNumberType(),
      possible: this.phoneUtil.isPossibleNumber(this.parsedPhoneNumber),
      rawInput: this.parsedPhoneNumber?.getRawInput(),
      regionCode: this.phoneUtil.getRegionCodeForNumber(this.parsedPhoneNumber),
      valid: this.phoneUtil.isValidNumber(this.parsedPhoneNumber),
      validForRegion: this.phoneUtil.isValidNumberForRegion(
        this.parsedPhoneNumber,
        this.phoneUtil.getRegionCodeForNumber(this.parsedPhoneNumber),
      ),
    };
  }
}
