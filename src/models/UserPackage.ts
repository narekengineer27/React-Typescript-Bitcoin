import { ExchangePackage } from 'Models/ExchangePage';

export interface UserPackage {
  id?: number;
  user_id?: number;
  sms_max?: number;
  sms_used?: number;
  email_max?: number;
  email_used?: number;
  all_time_left?: number;
  all_expired?: boolean;
  all_live_enabled?: number;
  all_live_started?: string;
  all_live_valid_until?: string;
  exchanges?: ExchangePackage[];
  test_enabled?: number;
  test_started?: string;
  test_valid_until?: string;
  test_time_left?: number;
  test_expired?: boolean;
  exchanges_used?: number;
  enabled?: number;
  created_at?: string;
  updated_at?: string;
}
