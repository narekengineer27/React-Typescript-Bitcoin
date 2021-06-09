export interface Referral {
  id?: number;
  mentor_id?: number;
  mentee_id?: number;
  package_id?: number;
  billing_history_id?: number;
  total_price?: string;
  mentor_bonus_perc?: string;
  mentor_bonus_to_pay?: string;
  sent?: number;
  created_at?: string;
  updated_at?: string;
  mentee?: {
    name?: string;
  };
}
