// The rationale for having a separate `CountryCode` type instead of just a `string`:
// https://github.com/catamphetamine/libphonenumber-js/issues/170#issuecomment-363156068
export type CountryCode =
  | 'AC'
  | 'AD'
  | 'AE'
  | 'AF'
  | 'AG'
  | 'AI'
  | 'AL'
  | 'AM'
  | 'AO'
  | 'AR'
  | 'AS'
  | 'AT'
  | 'AU'
  | 'AW'
  | 'AX'
  | 'AZ'
  | 'BA'
  | 'BB'
  | 'BD'
  | 'BE'
  | 'BF'
  | 'BG'
  | 'BH'
  | 'BI'
  | 'BJ'
  | 'BL'
  | 'BM'
  | 'BN'
  | 'BO'
  | 'BQ'
  | 'BR'
  | 'BS'
  | 'BT'
  | 'BW'
  | 'BY'
  | 'BZ'
  | 'CA'
  | 'CC'
  | 'CD'
  | 'CF'
  | 'CG'
  | 'CH'
  | 'CI'
  | 'CK'
  | 'CL'
  | 'CM'
  | 'CN'
  | 'CO'
  | 'CR'
  | 'CU'
  | 'CV'
  | 'CW'
  | 'CX'
  | 'CY'
  | 'CZ'
  | 'DE'
  | 'DJ'
  | 'DK'
  | 'DM'
  | 'DO'
  | 'DZ'
  | 'EC'
  | 'EE'
  | 'EG'
  | 'EH'
  | 'ER'
  | 'ES'
  | 'ET'
  | 'FI'
  | 'FJ'
  | 'FK'
  | 'FM'
  | 'FO'
  | 'FR'
  | 'GA'
  | 'GB'
  | 'GD'
  | 'GE'
  | 'GF'
  | 'GG'
  | 'GH'
  | 'GI'
  | 'GL'
  | 'GM'
  | 'GN'
  | 'GP'
  | 'GQ'
  | 'GR'
  | 'GT'
  | 'GU'
  | 'GW'
  | 'GY'
  | 'HK'
  | 'HN'
  | 'HR'
  | 'HT'
  | 'HU'
  | 'ID'
  | 'IE'
  | 'IL'
  | 'IM'
  | 'IN'
  | 'IO'
  | 'IQ'
  | 'IR'
  | 'IS'
  | 'IT'
  | 'JE'
  | 'JM'
  | 'JO'
  | 'JP'
  | 'KE'
  | 'KG'
  | 'KH'
  | 'KI'
  | 'KM'
  | 'KN'
  | 'KP'
  | 'KR'
  | 'KW'
  | 'KY'
  | 'KZ'
  | 'LA'
  | 'LB'
  | 'LC'
  | 'LI'
  | 'LK'
  | 'LR'
  | 'LS'
  | 'LT'
  | 'LU'
  | 'LV'
  | 'LY'
  | 'MA'
  | 'MC'
  | 'MD'
  | 'ME'
  | 'MF'
  | 'MG'
  | 'MH'
  | 'MK'
  | 'ML'
  | 'MM'
  | 'MN'
  | 'MO'
  | 'MP'
  | 'MQ'
  | 'MR'
  | 'MS'
  | 'MT'
  | 'MU'
  | 'MV'
  | 'MW'
  | 'MX'
  | 'MY'
  | 'MZ'
  | 'NA'
  | 'NC'
  | 'NE'
  | 'NF'
  | 'NG'
  | 'NI'
  | 'NL'
  | 'NO'
  | 'NP'
  | 'NR'
  | 'NU'
  | 'NZ'
  | 'OM'
  | 'PA'
  | 'PE'
  | 'PF'
  | 'PG'
  | 'PH'
  | 'PK'
  | 'PL'
  | 'PM'
  | 'PR'
  | 'PS'
  | 'PT'
  | 'PW'
  | 'PY'
  | 'QA'
  | 'RE'
  | 'RO'
  | 'RS'
  | 'RU'
  | 'RW'
  | 'SA'
  | 'SB'
  | 'SC'
  | 'SD'
  | 'SE'
  | 'SG'
  | 'SH'
  | 'SI'
  | 'SJ'
  | 'SK'
  | 'SL'
  | 'SM'
  | 'SN'
  | 'SO'
  | 'SR'
  | 'SS'
  | 'ST'
  | 'SV'
  | 'SX'
  | 'SY'
  | 'SZ'
  | 'TA'
  | 'TC'
  | 'TD'
  | 'TG'
  | 'TH'
  | 'TJ'
  | 'TK'
  | 'TL'
  | 'TM'
  | 'TN'
  | 'TO'
  | 'TR'
  | 'TT'
  | 'TV'
  | 'TW'
  | 'TZ'
  | 'UA'
  | 'UG'
  | 'US'
  | 'UY'
  | 'UZ'
  | 'VA'
  | 'VC'
  | 'VE'
  | 'VG'
  | 'VI'
  | 'VN'
  | 'VU'
  | 'WF'
  | 'WS'
  | 'XK'
  | 'YE'
  | 'YT'
  | 'ZA'
  | 'ZM'
  | 'ZW';

// Seems like it doesn't work for some reason:
// https://gitlab.com/catamphetamine/libphonenumber-js/-/issues/94
//
// import metadata from './metadata.min.json'
// // Reads the list of ISO country codes from the JSON file.
// // https://github.com/catamphetamine/libphonenumber-js/issues/405#issuecomment-1447027961
// const getObjectKeys = Object.keys as <T>(object: T) => Array<keyof T>
// const CountryCodes = getObjectKeys(metadata.countries)
// // The `CountryCode` type is generated from the list of `CountryCodes`.
// // https://github.com/catamphetamine/libphonenumber-js/issues/405
// export type CountryCode = typeof CountryCodes[number];

export type CountryCallingCodes = {
  [countryCallingCode: string]: CountryCode[];
};

export type Countries = {
  // Metadata here is a compressed one,
  // so a country's data is just an array of some properties
  // instead of a JSON object of shape:
  // {
  //   phone_code: string,
  //   idd_prefix: string,
  //   national_number_pattern: string,
  //   types: object,
  //   examples: object,
  //   formats: object[]?,
  //   possible_lengths: number[],
  //   ...
  // }
  //
  // `in` operator docs:
  // https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types
  // `country in CountryCode` means "for each and every CountryCode".
  [country in CountryCode]?: any[];
};

export type MetadataJson = {
  country_calling_codes: CountryCallingCodes;
  countries: Countries;
};

export type Examples = {
  // `in` operator docs:
  // https://www.typescriptlang.org/docs/handbook/advanced-types.html#mapped-types
  // `country in CountryCode` means "for each and every CountryCode".
  [country in CountryCode]: NationalNumber;
};

export type NumberFormat = 'NATIONAL' | 'INTERNATIONAL' | 'E164' | 'RFC3966';
export type NumberType =
  | undefined
  | 'PREMIUM_RATE'
  | 'TOLL_FREE'
  | 'SHARED_COST'
  | 'VOIP'
  | 'PERSONAL_NUMBER'
  | 'PAGER'
  | 'UAN'
  | 'VOICEMAIL'
  | 'FIXED_LINE_OR_MOBILE'
  | 'FIXED_LINE'
  | 'MOBILE';

// "Tagged" types are used to introduce some degree of type safety when passing in arguments to the functions.
// https://medium.com/@ethanresnick/advanced-typescript-tagged-types-for-fewer-bugs-and-better-security-24db681d5721
//
// For example, if some function returns an `E164Number`, it can only be interpreted as
// either a `string` or an `E164Number` and it can't mistakenly be interpreted as
// a `NationalNumber` or an `Extension` or a `CarrierCode` or a `CountryCallingCode`.
//
// Example:
//
// import type { E164Number, CarrierCode } from 'libphonenumber-js'
// const number: E164Number = '+78005553535'
// const carrierCode: CarrierCode = number
//
// Shows an error:
// Type 'E164Number' is not assignable to type 'CarrierCode'.
//
// Originally, the `__tag` property was declared optional in order to allow passing
// a generic `string` in place of a `Tagged` type argument to functions that receive such arguments:
// that would allow ingesting generic `string` values from an outside source such as a database.
// Without that, those externally-obtained `string` values would have to be forcefully converted
// to the `Tagged` type via TypeScript `as` operator which is an anti-pattern.
//
// Later, it has been decided to make the `__tag` property non-optional and instead
// declare the arguments of those functions as `string | Tagged` rather than just `Tagged`:
// that would still allow ingesting generic `string` values from an outside source
// and would also make the `Tagged` type more "type safe".
//
type Tagged<A, T> = A & { __tag: T };

export type E164Number = Tagged<string, 'E164Number'>;
export type NationalNumber = Tagged<string, 'NationalNumber'>;
export type Extension = Tagged<string, 'Extension'>;
export type CarrierCode = Tagged<string, 'CarrierCode'>;
export type CountryCallingCode = Tagged<string, 'CountryCallingCode'>;

type FormatExtension = (
  formattedNumber: string,
  extension: Extension,
  metadata: MetadataJson,
) => string;

type FormatNumberOptionsWithoutIDD = {
  v2?: boolean;
  formatExtension?: FormatExtension;
};

type FormatNumberOptions = {
  v2?: boolean;
  fromCountry?: CountryCode;
  humanReadable?: boolean;
  nationalPrefix?: boolean;
  formatExtension?: FormatExtension;
};

// // https://stackoverflow.com/a/67026991
// type ArrayOfAtLeastOneCountryCode = [CountryCode, ...CountryCode[]];

export interface IPhoneNumber {
  setExt(ext: Extension): void;
  getPossibleCountries(): CountryCode[];
  isPossible(): boolean;
  isValid(): boolean;
  getType(): NumberType;
  format(format: NumberFormat, options?: FormatNumberOptions): string;
  formatNational(options?: FormatNumberOptionsWithoutIDD): string;
  formatInternational(options?: FormatNumberOptionsWithoutIDD): string;
  getURI(options?: FormatNumberOptionsWithoutIDD): string;
  isNonGeographic(): boolean;
  isEqual(phoneNumber: PhoneNumber): boolean;
  getCountryCode(): number;
  getNationalNumber(): number;
  getExtension(): string | undefined;
  getCountryCodeSource(): number;
  getRegionCode(): string | undefined;
  getItalianLeadingZero(): boolean | null;
  getRawInput(): string | undefined;
}

export interface NumberFound {
  number: PhoneNumber;
  startsAt: number;
  endsAt: number;
}

// Deprecated
export interface NumberFoundLegacy {
  country: CountryCode;
  phone: NationalNumber;
  ext?: Extension;
  startsAt: number;
  endsAt: number;
}

export class ParseError {
  message: string;
}

export interface NumberingPlan {
  leadingDigits(): string | undefined;
  possibleLengths(): number[];
  IDDPrefix(): string;
  defaultIDDPrefix(): string | undefined;
}

// The rationale for having a separate type for the result "enum" instead of just a `string`:
// https://github.com/catamphetamine/libphonenumber-js/issues/170#issuecomment-363156068
export type ValidatePhoneNumberLengthResult =
  | 'INVALID_COUNTRY'
  | 'NOT_A_NUMBER'
  | 'TOO_SHORT'
  | 'TOO_LONG'
  | 'INVALID_LENGTH';

export interface IPhoneNumberUtil {
  parse(numberToParse: string, defaultRegion: string): IPhoneNumber;
  parseAndKeepRawInput(
    numberToParse: string,
    defaultRegion: string,
  ): IPhoneNumber;
  format(number: IPhoneNumber, numberFormat: NumberFormat): string;
  formatInOriginalFormat(number: IPhoneNumber, regionCode: string): string;
  formatOutOfCountryCallingNumber(
    number: string,
    callingFromRegion: string,
  ): string;
  getRegionCodeForNumber(number: IPhoneNumber): string | undefined;
  isValidNumber(number: IPhoneNumber): boolean;
  isValidNumberForRegion(
    number: IPhoneNumber,
    regionCode: string | undefined,
  ): boolean;
  isPossibleNumber(number: IPhoneNumber): boolean;
  getNumberType(number: IPhoneNumber): NumberType;
  getCountryCodeForRegion(regionCode: string): number;
  getSupportedRegions(): string[];
  getSupportedCallingCodes(): number[];
  getRegionCodeForCountryCode(countryCode: number): string | undefined;
  getCountryCodeSource(number: IPhoneNumber): number;
  isLeadingZeroPossible(countryCode: number): boolean;
  getNddPrefixForRegion(
    regionCode: string,
    stripNonDigits: boolean,
  ): string | undefined;
  getMetadataForRegion(regionCode: string): any; // Replace 'any' with a more specific type if available
  getMetadataForNonGeoRegion(countryCode: number): any; // Replace 'any' with a more specific type if available
  truncateTooLongNumber(number: IPhoneNumber): void;
  isMobileNumberPossible(countryCode: number): boolean;
  isFixedLineNumberPossible(countryCode: number): boolean;
  isTollFreeNumberPossible(countryCode: number): boolean;
  isPremiumRateNumberPossible(countryCode: number): boolean;
  isSharedCostNumberPossible(countryCode: number): boolean;
  isVoipNumberPossible(countryCode: number): boolean;
  isPersonalNumberPossible(countryCode: number): boolean;
  isPagerNumberPossible(countryCode: number): boolean;
  isUanNumberPossible(countryCode: number): boolean;
  isVoicemailNumberPossible(countryCode: number): boolean;
  isEmergencyNumberPossible(countryCode: number): boolean;
  isCarrierSpecificNumberPossible(countryCode: number): boolean;
  isShortNumberPossible(countryCode: number): boolean;
  isStandardRateNumberPossible(countryCode: number): boolean;
  isSameMobileNetworkNumberPossible(countryCode: number): boolean;
  getExampleNumber(regionCode: string): IPhoneNumber | null;
  getExampleNumberForType(
    regionCode: string,
    numberType: NumberType,
  ): IPhoneNumber | null;
  getInvalidExampleNumber(regionCode: string): IPhoneNumber | null;
  getInvalidExampleNumberForType(
    regionCode: string,
    numberType: NumberType,
  ): IPhoneNumber | null;
  getExampleNumberForNonGeoEntity(countryCode: number): IPhoneNumber | null;
  getExampleNumberForNonGeoEntityForType(
    countryCode: number,
    numberType: NumberType,
  ): IPhoneNumber | null;
  getInvalidExampleNumberForNonGeoEntity(
    countryCode: number,
  ): IPhoneNumber | null;
  getInvalidExampleNumberForNonGeoEntityForType(
    countryCode: number,
    numberType: NumberType,
  ): IPhoneNumber | null;
  getNationalSignificantNumber(number: IPhoneNumber): string;
  getNationalSignificantNumberForRegion(
    number: IPhoneNumber,
    regionCode: string,
  ): string;
}

export interface IPhoneNumberInfo {
  countryCode: number | undefined;
  countryCodeSource: number | undefined;
  extension: any;
  italianLeadingZero: boolean | null | undefined;
  nationalNumber: number | undefined;
  numberType: string | null;
  possible: boolean | null;
  rawInput: string | undefined;
  regionCode: string | null | undefined;
  valid: boolean | null;
  validForRegion: boolean | null;
}
