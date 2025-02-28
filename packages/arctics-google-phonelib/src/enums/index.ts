/* eslint-disable */
import { PhoneNumberFormat as PNF } from '@arctics/google-phonelib-js';

export enum NumberFormat {
  E164 = PNF.E164,
  INTERNATIONAL = PNF.INTERNATIONAL,
  NATIONAL = PNF.NATIONAL,
  RFC3966 = PNF.RFC3966,
}
