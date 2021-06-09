import { Status } from 'Models/Status';
import { ReferralBonusPaid, ReferralBonusUnpaid } from 'Models/ReferralBonus';
import { Meta } from 'Models/Meta';

export const ADMIN_REFERRAL_BONUSES_UNPAID = 'ADMIN_REFERRAL_BONUSES_UNPAID';
export const ADMIN_REFERRAL_BONUSES_PAID = 'ADMIN_REFERRAL_BONUSES_PAID';
export const ADMIN_REFERRAL_BONUSES_MARK_PAID = 'ADMIN_REFERRAL_BONUSES_MARK_PAID';

export type IState = {
  unpaid: {
    data: ReferralBonusUnpaid[],
    status: Status,
    meta: Meta,
  },
  paid: {
    data: ReferralBonusPaid[],
    status: Status,
    meta: Meta,
  },
  markPaid: {
    status: Status,
  }
};
