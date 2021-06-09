import { Status } from 'Models/Status';
import { Package } from 'Models/Package';

export const PUBLIC_PRICING_PACKAGES = 'PUBLIC_PRICING_PACKAGES';

export type IState = {
  packages: {
    status: Status;
    data: Package[];
  };
};
