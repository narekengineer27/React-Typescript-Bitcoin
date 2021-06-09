import { Referral } from 'Models/Referral';

export interface ReferralsData {
  not_sent?: number;
  sent?: number;
  total?: number;
  has_wallet?: boolean | undefined;
  list?: Referral[];
}
