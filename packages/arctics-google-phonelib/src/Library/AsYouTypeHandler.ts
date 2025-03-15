import { AsYouTypeFormatter } from '@arctics/google-phonelib-js';

/**
 * Class to handle phone number formatting as you type.
 *
 * This class utilizes the `AsYouTypeFormatter` from the Google's libphonenumber library
 * to provide real-time phone number formatting based on the specified region code.
 */
export class AsYouTypeHandler {
  private formatter;

  /**
   * Creates an instance of AsYouTypeHandler.
   * @param {string} regionCode - The region code for formatting the phone number.
   */
  constructor(regionCode: string) {
    this.formatter = new AsYouTypeFormatter(regionCode);
  }

  /**
   * Formats the phone number as you type.
   * @param {string} phoneNumber - The phone number to format.
   * @returns {string} - The formatted phone number.
   */
  public typeNumber(phoneNumber: string): string {
    return this.formatter.inputDigit(phoneNumber);
  }

  /**
   * Clears the input in the formatter.
   */
  public clearInput(): void {
    this.formatter.clear();
  }
}
