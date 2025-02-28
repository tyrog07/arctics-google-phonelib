# @arctics/google-phonelib (beta)

<div align="center">

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/tyrog07/@arctics/google-phonelib/blob/HEAD/LICENSE)
[![npm latest package](https://img.shields.io/npm/v/@arctics/google-phonelib/latest.svg)](https://www.npmjs.com/package/@arctics/google-phonelib)
[![npm downloads](https://img.shields.io/npm/dm/@arctics/google-phonelib.svg)](https://www.npmjs.com/package/@arctics/google-phonelib)
[![Checks](https://github.com/tyrog07/arctics-google-phonelib/actions/workflows/test.yml/badge.svg)](https://github.com/tyrog07/arctics-google-phonelib/actions/workflows/test.yml)
[![Build](https://github.com/tyrog07/arctics-google-phonelib/actions/workflows/build.yml/badge.svg)](https://github.com/tyrog07/arctics-google-phonelib/actions/workflows/build.yml)
[![CI](https://github.com/tyrog07/arctics-google-phonelib/actions/workflows/CI.yml/badge.svg?branch=main)](https://github.com/tyrog07/arctics-google-phonelib/actions/workflows/CI.yml)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=@arctics/google-phonelib&query=$.install.pretty&label=install%20size)](https://packagephobia.now.sh/result?p=@arctics/google-phonelib)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@arctics/google-phonelib)](https://bundlephobia.com/package/@arctics/google-phonelib@latest)
[![Known Vulnerabilities](https://snyk.io/test/npm/@arctics/google-phonelib/badge.svg)](https://snyk.io/test/npm/@arctics/google-phonelib)

</div>

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [API](#api)
6. [Contributing](#contributing)
7. [License](#license)

## Introduction

This package simplifies phone number handling by wrapping Google's libphonenumber. While offering complete access to `i18n.phonenumbers.PhoneNumber` and `i18n.phonenumbers.PhoneNumberUtil` through getParsedPhoneNumber() and getPhoneNumberUtil(), it prioritizes ease of use. The constructor and `getPhoneNumberInfo()` provide a quick way to perform common tasks and access essential information. Designed to abstract frequently used features, this package welcomes user feedback and encourages feature requests.

## Features

- **Phone Number Parsing:**
  - Parses phone numbers from various formats into a structured `IPhoneNumber` object.
  - Supports parsing with or without keeping the raw input.
  - Handles lenient parsing, allowing for punctuation, whitespace, and leading text.
- **Phone Number Formatting:**
  - Formats parsed phone numbers into E.164, international, national, and RFC3966 formats.
  - Formats numbers in their original format.
- **Phone Number Information Retrieval:**
  - Retrieves detailed information about a phone number, including:
    - Country code.
    - National number.
    - Number type (mobile, fixed-line, etc.).
    - Validity checks (possible, valid, valid for region).
    - Raw Input.
    - Region Code.
    - Extension.
- **Phone Number Type Detection:**
  - Identifies the type of phone number (mobile, fixed-line, toll-free, etc.).
- **Validation:**
  - Checks if a number is valid, possible, and valid for a region.
- **TypeScript Support:**
  - Provides type definitions for enhanced development experience.

* **Future Features:**
  - `AsYouTypeFormatter` and `ShortNumberInfo` will be added in future releases.

## Installation

```bash
npm install @arctics/google-phonelib
```

or

```bash
yarn add @arctics/google-phonelib
```

## Usage

```javascript
import PhoneNumberHandler, { NumberFormat } from '@arctics/google-phonelib';

// Parsing and retrieving information
const handler = new PhoneNumberHandler('+12025550100', 'US');
const info = handler.getPhoneNumberInfo();

console.log(info.nationalNumber); // Output: 2025550100
console.log(info.countryCode); // Output: 1
console.log(info.numberType); // Output: FIXED_LINE_OR_MOBILE

// Formatting
const formattedNational = handler.format(PhoneNumberFormat.NATIONAL);
console.log(formattedNational); // Output: (202) 555-0100

const formattedE164 = handler.format(PhoneNumberFormat.E164);
console.log(formattedE164); // Output: +12025550100

//Original formatting
const originalFormat = handler.formatInOriginalFormat('US');
console.log(originalFormat);
```

## API

### `PhoneNumberHandler` Class

- Constructor:

  - `constructor(phoneNumber: string, regionCode: string, mode?: string)`

    - Creates a new `PhoneNumberHandler` instance.
    - `phoneNumber`: The phone number string to parse.
    - `regionCode`: The region code (e.g., 'US', 'GB').
    - `mode`: Parsing mode ('parse' or 'parseAndKeepRawInput'). Defaults to 'parseAndKeepRawInput'.

- Methods:

  - `getParsedPhoneNumber(): IPhoneNumber | null`
    - Returns the parsed `IPhoneNumber` object.
  - `getPhoneNumberUtil(): IPhoneNumberUtil`
    - Returns the PhoneNumberUtil instance.
  - `format(numberFormat: NumberFormat): string`
    - Formats the phone number according to the specified `NumberFormat` (E164, INTERNATIONAL, NATIONAL, RFC3966).
  - `formatInOriginalFormat(regionCallingFrom: string): string`
    - Formats the phone number in its original format.
  - `getPhoneNumberInfo(): IPhoneNumberInfo`
    - Returns an object containing detailed information about the phone number.

- `PhoneNumberFormat` Enum

  - E164
  - INTERNATIONAL
  - NATIONAL
  - RFC3966

- `Interfaces`

  - IPhoneNumber
  - IPhoneNumberInfo
  - IPhoneNumberUtil

  (Refer to the source code for detailed interface definitions.)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This package is licensed under [MIT License](https://github.com/tyrog07/arctics-google-phonelib/blob/HEAD/LICENSE).

The bundled [libphonenumber](https://github.com/googlei18n/libphonenumber/blob/master/LICENSE) library is licensed under Apache 2.0.
