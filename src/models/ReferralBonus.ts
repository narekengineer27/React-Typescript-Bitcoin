export interface ReferralBonusUnpaid {
  mentor_id?: number;
  total_mentor_bonus_to_pay?: string;
  last_unpaid_bonus_date?: string;
  mentor?: {
    id?: number;
    name?: string;
    email?: string;
    mentor_id?: number;
    wallet_id?: string;
    referral?: string;
  };
}

export interface ReferralBonusPaid {
  mentor_id?: number;
  total_mentor_bonus_paid?: string;
  last_paid_bonus_date?: string;
  mentor?: {
    id?: number;
    name?: string;
    email?: string;
    mentor_id?: number;
    wallet_id?: string;
    referral?: string;
  };
}
