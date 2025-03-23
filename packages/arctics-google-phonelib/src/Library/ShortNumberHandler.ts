import {
  PhoneNumberUtil,
  ShortNumberInfo as ShortNumberUtil,
} from '@arctics/google-phonelib-js';

import { IPhoneNumber, IPhoneNumberUtil, ShortNumberInfo } from 'types';

export class ShortNumberHandler {
  private shortNumberInfo;

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
   * Entered phone number.
   * @private
   */
  private enteredNumber: string;

  /**
   * Region code for the number.
   * @private
   */
  private regionCode: string;

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
    this.shortNumberInfo = ShortNumberUtil;
    this.phoneUtil = PhoneNumberUtil;
    this.regionCode = regionCode;
    this.enteredNumber = phoneNumber;
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

  getBasicInfo(): ShortNumberInfo | any {
    return {
      isPossible: this.isPossibleShortNumber(),
      isValid: this.isValidShortNumber(),
      isEmergency: this.isEmergencyNumber(),
      isCarrierSpecific: this.isCarrierSpecific(),
      expectedCost: this.getExpectedCost(),
      exampleShortNumber: this.getExampleShortNumber(),
    };
  }

  private isPossibleShortNumber(): boolean {
    return this.shortNumberInfo.isPossibleShortNumber(
      this.parsedPhoneNumber,
      this.regionCode,
    );
  }

  private isValidShortNumber(): boolean {
    return this.shortNumberInfo.isValidShortNumber(
      this.parsedPhoneNumber,
      this.regionCode,
    );
  }

  private isEmergencyNumber(): boolean {
    return this.shortNumberInfo.isEmergencyNumber(
      this.enteredNumber,
      this.regionCode,
    );
  }

  private isCarrierSpecific(): boolean {
    return this.shortNumberInfo.isCarrierSpecific(
      this.parsedPhoneNumber,
      this.regionCode,
    );
  }

  private getExpectedCost(): any {
    return this.shortNumberInfo.getExpectedCost(
      this.parsedPhoneNumber,
      this.regionCode,
    );
  }

  private getExampleShortNumber(): string | null {
    return this.shortNumberInfo.getExampleShortNumber(this.regionCode);
  }

  getExpectedCostForRegion(regionCode: string, nationalNumber: string): any {
    return this.shortNumberInfo.getExpectedCostForRegion(
      regionCode,
      nationalNumber,
    );
  }

  getExampleShortNumberForCost(regionCode: string, cost: any): string | null {
    return this.shortNumberInfo.getExampleShortNumberForCost(regionCode, cost);
  }

  getCountriesForMobileShortCode(): string[] {
    return this.shortNumberInfo.getCountriesForMobileShortCode();
  }

  getCountriesForShortNumber(): string[] {
    return this.shortNumberInfo.getCountriesForShortNumber();
  }

  getCountriesForShortNumberContainingPrefix(prefix: string): string[] {
    return this.shortNumberInfo.getCountriesForShortNumberContainingPrefix(
      prefix,
    );
  }

  getCountriesForShortNumberFromRegionList(regionList: string[]): string[] {
    return this.shortNumberInfo.getCountriesForShortNumberFromRegionList(
      regionList,
    );
  }

  getCountriesForShortNumberFromRegionListContainingPrefix(
    regionList: string[],
    prefix: string,
  ): string[] {
    return this.shortNumberInfo.getCountriesForShortNumberFromRegionListContainingPrefix(
      regionList,
      prefix,
    );
  }

  getCountriesForShortNumberWithHint(hintRegionCode: string): string[] {
    return this.shortNumberInfo.getCountriesForShortNumberWithHint(
      hintRegionCode,
    );
  }

  getCountriesForShortNumberWithHintContainingPrefix(
    hintRegionCode: string,
    prefix: string,
  ): string[] {
    return this.shortNumberInfo.getCountriesForShortNumberWithHintContainingPrefix(
      hintRegionCode,
      prefix,
    );
  }

  getCountriesForSmsShortCode(): string[] {
    return this.shortNumberInfo.getCountriesForSmsShortCode();
  }

  getCountriesForSmsShortNumber(): string[] {
    return this.shortNumberInfo.getCountriesForSmsShortNumber();
  }

  getCountriesForSmsShortNumberContainingPrefix(prefix: string): string[] {
    return this.shortNumberInfo.getCountriesForSmsShortNumberContainingPrefix(
      prefix,
    );
  }

  getCountriesForSmsShortNumberFromRegionList(regionList: string[]): string[] {
    return this.shortNumberInfo.getCountriesForSmsShortNumberFromRegionList(
      regionList,
    );
  }

  getCountriesForSmsShortNumberFromRegionListContainingPrefix(
    regionList: string[],
    prefix: string,
  ): string[] {
    return this.shortNumberInfo.getCountriesForSmsShortNumberFromRegionListContainingPrefix(
      regionList,
      prefix,
    );
  }

  getCountriesForSmsShortNumberWithHint(hintRegionCode: string): string[] {
    return this.shortNumberInfo.getCountriesForSmsShortNumberWithHint(
      hintRegionCode,
    );
  }

  getCountriesForSmsShortNumberWithHintContainingPrefix(
    hintRegionCode: string,
    prefix: string,
  ): string[] {
    return this.shortNumberInfo.getCountriesForSmsShortNumberWithHintContainingPrefix(
      hintRegionCode,
      prefix,
    );
  }
}
