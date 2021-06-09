import { Status } from 'Models/Status';
import { PackageData } from 'Models/PackageData';
import { UserPackage } from 'Models/UserPackage';
import { Package } from 'Models/Package';

export const PLATFORM_FEATURES_PACKAGES = 'PLATFORM_FEATURES_PACKAGES';
export const PLATFORM_FEATURES_USER_PACKAGE = 'PLATFORM_FEATURES_USER_PACKAGE';
export const PLATFORM_FEATURES_PURCHASE_FEATURE = 'PLATFORM_FEATURES_PURCHASE_FEATURE';
export const PLATFORM_FEATURES_SCRATCH_CARD_MODAL = 'PLATFORM_FEATURES_SCRATCH_CARD_MODAL';
export const PLATFORM_FEATURES_ACTIVATE_LIVE_MODAL = 'PLATFORM_FEATURES_ACTIVATE_LIVE_MODAL';

export type IState = {
  packages: {
    data: PackageData;
    status: Status;
  };
  userPackage: {
    data: UserPackage;
    status: Status;
  };
  purchaseFeatureModal: {
    visible: boolean;
    pack?: Package;
    buy?: {
      quantity: number;
      exchange?: string;
    }
  };
  scratchCardModal: {
    visible: boolean;
  };
  activateLiveModal: {
    visible: boolean;
  };
};
