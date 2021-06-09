import * as React from 'react';

const env = require('Root/env.json');
const ipnUrl = env.apiHost.replace(/\/$/, '') + '/coinpayment';

interface Props {
  merchant: string;
  name: string;
  currency?: string;
  amount: number;
  quantity?: number;
  customInfo: string;
  onReady: (form: CoinPaymentsForm) => void;
}

export default class CoinPaymentsForm extends React.Component<Props, {}> {
  private form: HTMLFormElement;

  render() {
    const { merchant, name, currency = 'BTC', amount, quantity, customInfo } = this.props;
    return (
      <form
        action="https://www.coinpayments.net/index.php"
        method="post"
        target="_blank"
        ref={r => this.form = r}
        className="d-none"
      >
        <input type="hidden" name="cmd" value="_pay"/>
        <input type="hidden" name="reset" value="1"/>
        <input type="hidden" name="merchant" value={merchant}/>
        <input type="hidden" name="item_name" value={name}/>
        <input type="hidden" name="currency" value={currency}/>
        <input type="hidden" name="quantity" value={quantity}/>
        <input type="hidden" name="amountf" value={amount}/>
        <input type="hidden" name="ipn_url" value={ipnUrl}/>
        <input type="hidden" name="want_shipping" value="0"/>
        <input type="hidden" name="allow_quantity" value="0"/>
        <input type="hidden" name="allow_extra" value="0"/>
        <input type="hidden" name="custom" value={customInfo}/>
        <input
          type="image"
          src="https://www.coinpayments.net/images/pub/CP-main-medium.png"
          alt="Buy Now with CoinPayments.net"
        />
      </form>
    );
  }

  componentDidMount() {
    this.props.onReady(this);
  }

  submit() {
    // Submit the form
    this.form.submit();
  }
}
