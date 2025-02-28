const googlePhoneNumberLib = require('./providers/libphonenumber.js');

const PhoneNumberType = googlePhoneNumberLib.PhoneNumberType;
const PhoneNumberFormat = googlePhoneNumberLib.PhoneNumberFormat;
const CountryCodeSource = googlePhoneNumberLib.PhoneNumber.CountryCodeSource;
const ValidationResult = googlePhoneNumberLib.PhoneNumberUtil.ValidationResult;
const AsYouTypeFormatter = googlePhoneNumberLib.AsYouTypeFormatter;
const ShortNumberInfo = googlePhoneNumberLib.ShortNumberInfo.getInstance();
const PhoneNumberUtil = googlePhoneNumberLib.PhoneNumberUtil.getInstance();

// Export for ES module usage
module.exports = {
  PhoneNumberUtil,
  PhoneNumberType,
  CountryCodeSource,
  PhoneNumberFormat,
  ValidationResult,
  AsYouTypeFormatter,
  ShortNumberInfo,
};
