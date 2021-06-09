export class User {
  _id?: number = 0;
  email?: string = '';
  password?: string = '';
  currency?: string;
  city?: string;
  name?: string;
  country?: string;
  walletId?: string;
  user_role?: string;
  exit_strategy_set?: boolean;
  is_dev?: number;
  referral?: string;
  user_photo?: string;
}
