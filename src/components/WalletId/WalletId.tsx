import * as React from "react";
import SectionHeader from "Partials/SectionHeader";
import WalletIdForm from "Components/WalletId/WalletIdForm";
import Rnd from 'react-rnd';

class WalletId extends React.Component<any> {

  render() {
    return (
      <div>
        <SectionHeader
          goBack="/subscribe"
          title="Please enter your Wallet ID">
        </SectionHeader>
        <Rnd
          style={{border: '1px solid red'}}
          dragAxis="x"
          dragGrid={[0, 0]}
          default={{
            x: 0,
            y: 0,
            width: 320,
            height: 200,
          }}
          enableResizing={{
            bottom: false,
            bottomLeft: false,
            bottomRight: false,
            left: false,
            right: true,
            top: false,
            topLeft: false,
            topRight: false,
          }}
        >whahahahhha
        </Rnd>
        <WalletIdForm/>
      </div>
    );
  }
}

export default WalletId;
