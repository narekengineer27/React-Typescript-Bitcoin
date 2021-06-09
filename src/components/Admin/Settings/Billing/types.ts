import { Status } from 'Models/Status';
import { Package } from 'Models/Package';

export const ADMIN_BILLING_PACKAGES = 'ADMIN_BILLING_PACKAGES';
export const ADMIN_BILLING_EDIT_PACKAGE_MODAL = 'ADMIN_BILLING_EDIT_PACKAGE_MODAL';

export type IState = {
  packages: {
    data: Package[],
    status: Status,
  },
  editPackageModal: {
    visible: boolean,
    pack: Package,
    status: Status,
  }
};
