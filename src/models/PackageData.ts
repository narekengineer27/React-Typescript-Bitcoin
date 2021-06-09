import { Package } from 'Models/Package';

export interface PackageData {
  packages?: Package[];
  user_id?: string;
  merchant_id?: string;
}
