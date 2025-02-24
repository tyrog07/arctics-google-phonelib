// Get an instance of `PhoneNumberUtil`.

const googlePhoneNumberLib = require("./providers/libphonenumber.js");

const PhoneNumberType = googlePhoneNumberLib.PhoneNumberType;
const PhoneNumberFormat = googlePhoneNumberLib.PhoneNumberFormat;
const ValidationResult = googlePhoneNumberLib.PhoneNumberUtil.ValidationResult;
const AsYouTypeFormatter = googlePhoneNumberLib.AsYouTypeFormatter;
const ShortNumberInfo = googlePhoneNumberLib.ShortNumberInfo;
const PhoneNumberUtil = googlePhoneNumberLib.PhoneNumberUtil.getInstance();

// Parse number with country code and keep raw input.
const number = PhoneNumberUtil.parseAndKeepRawInput("202-456-1414", "US");

// Print the phone's country code.
console.log(number.getCountryCode());
// => 1

// Print the phone's national number.
console.log(number.getNationalNumber());

// Export for ES module usage
module.exports = {
  PhoneNumberUtil,
  PhoneNumberType,
  PhoneNumberFormat,
  ValidationResult,
  AsYouTypeFormatter,
  ShortNumberInfo,
};
