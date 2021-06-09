export interface Exchange {
  id: string;
  name: string;
  color: string;
}

export enum ExchangeId {
  BITTREX = 'bittrex', BITFINEX = 'bitfinex'
}
