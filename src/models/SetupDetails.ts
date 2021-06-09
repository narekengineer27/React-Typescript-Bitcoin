import { ExchangeSetupDetails } from 'Models/ExchangeSetupDetails';
import { OfferSetupDetails } from 'Models/OfferSetupDetails';

export interface SetupDetails {
  exchanges: ExchangeSetupDetails[];
  offers: OfferSetupDetails[];
  base_coin: string;
  wallet_address: string;
  contract_address: string;
  ticker_symbol: string;
  make_offer_viewable: number;
  user_id: number;
  role_id: number;
  api_url: string;
}
