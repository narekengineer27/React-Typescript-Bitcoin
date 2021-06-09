import { Status } from 'Models/Status';
import { BillingHistoryEntry } from 'Models/BillingHistoryEntry';

export const BILLING_HISTORY = 'BILLING_HISTORY';
export const BILLING_HISTORY_STATUS = 'BILLING_HISTORY_STATUS';

export type IState = {
  billingHistory: {
    data: BillingHistoryEntry[];
    status: Status;
  }
};
