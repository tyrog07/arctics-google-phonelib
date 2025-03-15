import { AsYouTypeFormatter } from '@arctics/google-phonelib-js';

export class AsYouTypeHandler {
  private formatter;

  constructor(regionCode: string) {
    this.formatter = new AsYouTypeFormatter(regionCode);
  }

  public typeNumber(phoneNumber: string): string {
    return this.formatter.inputDigit(phoneNumber);
  }

  public clearInput(): void {
    this.formatter.clear();
  }
}
