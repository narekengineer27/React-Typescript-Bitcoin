export interface Package {
  id?: number;
  package_name?: string;
  price?: string;
  description?: string;
  enabled?: number;
  test_days?: number;
  live_days?: number;
  type?: 'one-exchanges' | 'all-exchanges' | 'notifications' | 'education';
  emails?: number;
  sms?: number;
  is_feature?: number;
  created_at?: string;
  updated_at?: string;
  completed?: number;
  purchased?: number;
  failed?: number;
}
