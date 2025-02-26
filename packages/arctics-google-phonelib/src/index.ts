import {
  PhoneNumberUtil,
  PhoneNumberType,
  // CountryCodeSource,
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

export class PhoneNumberHandler {
  private phoneUtil: IPhoneNumberUtil;
  private parsedPhoneNumber: IPhoneNumber | null = null;

  constructor(phoneNumber: string, regionCode: string) {
    this.phoneUtil = PhoneNumberUtil;
    this.parsedPhoneNumber = this.phoneUtil.parseAndKeepRawInput(
      phoneNumber,
      regionCode,
    );
  }

  format(numberFormat: NumberFormat): string | null {
    if (this.parsedPhoneNumber) {
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
    } else {
      return null;
    }
  }

  private getNumberType(): string | null {
    if (this.parsedPhoneNumber) {
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
          return null;
      }
    } else {
      return null;
    }
  }

  /**
   * Gets information about a phone number.
   * @returns An object containing phone number information.
   */
  getPhoneNumberInfo(): IPhoneNumberInfo {
    return {
      countryCode: this.parsedPhoneNumber?.getCountryCode(),
      nationalNumber: this.parsedPhoneNumber?.getNationalNumber(),
      extension: this.parsedPhoneNumber?.getExtension(),
      countryCodeSource: this.parsedPhoneNumber?.getCountryCodeSource(),
      regionCode: this.parsedPhoneNumber
        ? this.phoneUtil.getRegionCodeForNumber(this.parsedPhoneNumber)
        : null,
      italianLeadingZero: this.parsedPhoneNumber?.getItalianLeadingZero(),
      rawInput: this.parsedPhoneNumber?.getRawInput(),
      possible: this.parsedPhoneNumber
        ? this.phoneUtil.isPossibleNumber(this.parsedPhoneNumber)
        : null,
      valid: this.parsedPhoneNumber
        ? this.phoneUtil.isValidNumber(this.parsedPhoneNumber)
        : null,
      validForRegion: this.parsedPhoneNumber
        ? this.phoneUtil.isValidNumberForRegion(
            this.parsedPhoneNumber,
            this.phoneUtil.getRegionCodeForNumber(this.parsedPhoneNumber),
          )
        : null,
      numberType: this.getNumberType(),
    };
  }
}
