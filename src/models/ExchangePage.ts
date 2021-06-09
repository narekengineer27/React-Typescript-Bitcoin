export interface ExchangePackage {
  id?: number;
  user_id?: number;
  user_package_id?: number;
  exchange?: string;
  live_enabled?: number;
  live_started?: string;
  live_valid_until?: string;
  live_time_left?: number;
  live_expired?: boolean;
  active_days_eligible?: number;
  created_at?: string;
  updated_at?: string;
}
