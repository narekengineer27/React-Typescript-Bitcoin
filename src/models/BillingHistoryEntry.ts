
export interface BillingHistoryEntry {
  id?: number;
  user_id?: number;
  package_id?: number;
  payment_id?: any;
  description?: string;
  price_per_item?: string;
  quantity?: number;
  total_price?: string;
  completed?: number;
  scratch_card_used?: number;
  created_at?: string;
  updated_at?: string;
}
