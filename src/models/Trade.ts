export class Trade {
  id?: number = 0;
  placed_at?: Date;
  pair?: string = '';
  quantity?: number = 0;
  quantity_remaining?: number = 0;
  price_bought?: number = 0;
  cpp?: number = 0;
  gap?: number = 0;
  profit?: number = 0;
  suggestion?: string = '';
  suggestion_name?: string = '';
  status?: string = '';
  status_name?: string = '';
  shrink_differential?: number = 0;
  target_price?: number = 0;
  option_exit?: string = '';
  current_shrink_differential?: number;
  target_shrink_differential?: number;
  target_coin_id?: string;
  exchange_id?: string;
  exchange_account_id?: number;
  showMore?: boolean = false;
}
