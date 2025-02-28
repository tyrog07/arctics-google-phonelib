import {
  PhoneNumberUtil,
  PhoneNumberType,
  // ValidationResult,
  // AsYouTypeFormatter,
  // ShortNumberInfo,
} from '@arctics/google-phonelib-js';

import {
  IPhoneNumber,
  IPhoneNumberInfo,
  IPhoneNumberUtil,
  NumberFormat,
} from '../types';

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
   * @param {string} mode - The parsing mode: 'parse' or 'parseAndKeepRawInput'. Defaults to 'parseAndKeepRawInput'. (optional)
   */
  constructor(
    phoneNumber: string,
    regionCode: string,
    mode: string = 'parseAndKeepRawInput',
  ) {
    this.phoneUtil = PhoneNumberUtil;
    // this.parsedPhoneNumber = this.parseAndKeepRawInput(phoneNumber, regionCode);
    if (mode === 'parse') {
      this.parsedPhoneNumber = this.parse(phoneNumber, regionCode);
    } else if (mode === 'parseAndKeepRawInput') {
      this.parsedPhoneNumber = this.parseAndKeepRawInput(
        phoneNumber,
        regionCode,
      );
    } else {
      // Handle invalid mode (e.g., throw an error or default to parseAndKeepRawInput)
      console.error(
        `Invalid mode: ${mode}. Using 'parseAndKeepRawInput' as default.`,
      );
      this.parsedPhoneNumber = this.parseAndKeepRawInput(
        phoneNumber,
        regionCode,
      );
    }
  }

  /**
   * @return {IPhoneNumber} a phone number proto buffer filled with the parsed number.
   *
   * Ideal for executing all functions available by `i18n.phonenumbers.PhoneNumber`.
   */
  getParsedPhoneNumber = (): IPhoneNumber | null => {
    return this.parsedPhoneNumber;
  };

  /**
   * @return {PhoneNumberUtil} a phone number proto buffer filled with the parsed number.
   *
   * The method that offers the main utilities to work with phone numbers, such as formatting, parsing and validating.
   * Ideal for executing all functions available by `i18n.phonenumbers.PhoneNumberUtil`.
   */
  getPhoneNumberUtil = (): IPhoneNumberUtil => {
    return this.phoneUtil;
  };

  /**
   * Parses a string and returns it as a phone number in proto buffer format. The
   * method is quite lenient and looks for a number in the input text (raw input)
   * and does not check whether the string is definitely only a phone number. To
   * do this, it ignores punctuation and white-space, as well as any text before
   * the number (e.g. a leading "Tel: ") and trims the non-number bits.  It will
   * accept a number in any format (E164, national, international etc), assuming
   * it can be interpreted with the defaultRegion supplied. It also attempts to
   * convert any alpha characters into digits if it thinks this is a vanity number
   * of the type "1800 MICROSOFT".
   *
   * @param {?string} numberToParse number that we are attempting to parse. This
   *     can contain formatting such as +, ( and -, as well as a phone number
   *     extension. It can also be provided in RFC3966 format.
   * @param {?string} defaultRegion region that we are expecting the number to be
   *     from. This is only used if the number being parsed is not written in
   *     international format. The country_code for the number in this case would
   *     be stored as that of the default region supplied. If the number is
   *     guaranteed to start with a '+' followed by the country calling code, then
   *     'ZZ' or null can be supplied.
   * @return {IPhoneNumber} a phone number proto buffer filled
   *     with the parsed number.
   */
  private parse(numberToParse: string, defaultRegion: string): IPhoneNumber {
    return this.phoneUtil.parse(numberToParse, defaultRegion);
  }

  /**
   * Parses a string and returns it in proto buffer format. This method differs
   * from {@link #parse} in that it always populates the raw_input field of the
   * protocol buffer with numberToParse as well as the country_code_source field.
   *
   * @param {string} numberToParse number that we are attempting to parse. This
   *     can contain formatting such as +, ( and -, as well as a phone number
   *     extension.
   * @param {?string} defaultRegion region that we are expecting the number to be
   *     from. This is only used if the number being parsed is not written in
   *     international format. The country calling code for the number in this
   *     case would be stored as that of the default region supplied.
   * @return {IPhoneNumber} a phone number proto buffer filled
   *     with the parsed number.
   */
  private parseAndKeepRawInput(
    numberToParse: string,
    defaultRegion: string,
  ): IPhoneNumber {
    return this.phoneUtil.parseAndKeepRawInput(numberToParse, defaultRegion);
  }

  /**
   * Formats the parsed phone number according to the specified format.
   * @param {NumberFormat} numberFormat - The desired format (PhoneNumberFormat.E164, PhoneNumberFormat.INTERNATIONAL, PhoneNumberFormat.NATIONAL, PhoneNumberFormat.RFC3966).
   * @returns {string | null} The formatted phone number, or null if an error occurs.
   */
  format(numberFormat: NumberFormat | number): string {
    return this.phoneUtil.format(
      this.parsedPhoneNumber,
      numberFormat as number,
    );
  }

  /**
   * Formats a phone number using the original phone number format that the number
   * is parsed from. The original format is embedded in the country_code_source
   * field of the PhoneNumber object passed in. If such information is missing,
   * the number will be formatted into the NATIONAL format by default. When the
   * number contains a leading zero and this is unexpected for this country, or
   * we don't have a formatting pattern for the number, the method returns the
   * raw input when it is available.
   *
   * Note this method guarantees no digit will be inserted, removed or modified as
   * a result of formatting.
   *
   * @param {string} regionCallingFrom the region whose IDD needs to be prefixed
   *     if the original number has one.
   * @return {string} the formatted phone number in its original number format.
   */
  formatInOriginalFormat(regionCallingFrom: string): string {
    return this.phoneUtil.formatInOriginalFormat(
      this.parsedPhoneNumber,
      regionCallingFrom,
    );
  }

  /**
   * Formats a phone number for out-of-country dialing purposes. If no
   * regionCallingFrom is supplied, we format the number in its INTERNATIONAL
   * format. If the country calling code is the same as that of the region where
   * the number is from, then NATIONAL formatting will be applied.
   *
   * <p>If the number itself has a country calling code of zero or an otherwise
   * invalid country calling code, then we return the number with no formatting
   * applied.
   *
   * <p>Note this function takes care of the case for calling inside of NANPA and
   * between Russia and Kazakhstan (who share the same country calling code). In
   * those cases, no international prefix is used. For regions which have multiple
   * international prefixes, the number in its INTERNATIONAL format will be
   * returned instead.
   *
   * @param {string} regionCallingFrom the region where the call is being placed.
   * @return {string} the formatted phone number.
   */
  formatOutOfCountryCallingNumber(regionCallingFrom: string): string {
    return this.phoneUtil.formatOutOfCountryCallingNumber(
      this.parsedPhoneNumber,
      regionCallingFrom,
    );
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
   * @property {boolean} italianLeadingZero The phone's italian leading zero.
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
      italianLeadingZero:
        this.parsedPhoneNumber?.getItalianLeadingZeroOrDefault(),
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
