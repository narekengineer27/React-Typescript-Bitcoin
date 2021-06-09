import * as React from 'react';
import SectionHeader from 'Partials/SectionHeader';
import 'Styles/table.less';
import Button from 'Elements/Button';
import SettingsPanel from 'Partials/SettingsPanel';
import { RouteComponentProps } from 'react-router';
import PublicPageLayout from 'Partials/PublicPageLayout';
import SelectField from 'Elements/SelectField';
import TextField from 'Elements/TextField';
import SmallToggle from 'Elements/SmallToggle';

const styles = require('./setup-details.css');

const options = [
    {value: '1', label: 'Exchanges1'}
];

export class ExchangeItem extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      
    };
  }

  addExchangeItem() {

  }

  render() {
    const { id } = this.props;
    return (
        <div className={styles.itemContentWrapper}>
            <SelectField options={options} name={'exchange' + 1}/>
            <div className={styles.descWrapper1}>
                <span className={styles.toggleDesc}>Do you want Token Owners & Exchanges to be able to</span>
                <div className={styles.descToggle}>
                    <span>Yes</span>
                    <div className={styles.toggle}>
                        <SmallToggle checked={this.state.mode1} leftChecked={true}/>
                    </div>
                    <span>No</span>
                </div>
            </div>
            <div className={styles.inputsWrapper}>
                <div className={styles.textFieldWrapper1}>
                    <TextField label="API" name="api" border={true}/>
                </div>
                <div className={styles.textFieldWrapper2}>
                    <TextField label="Secret" name="secret" border={true}/>
                </div>
            </div>
            <div className={styles.descWrapper2}>
                <span className={styles.toggleDesc}>Wants to be seen by Token Owners or Exchanges</span>
                <div className={styles.descToggle}>
                    <span>Yes</span>
                    <div className={styles.toggle}>
                        <SmallToggle checked={this.state.mode2} leftChecked={true}/>
                    </div>
                    <span>No</span>
                </div>
            </div>
            <div className={styles.exchangePlusBtn} onClick={this.addExchangeItem.bind(this)}><span>+</span></div>
        </div>
    );
  }
}

export class ExchangeAddedItem extends React.Component<any, any> {

    constructor(props: any) {
      super(props);
      this.state = {
        
      };
    }

    removeExchangeItem(id: any){

    }
  
    render() {
      const { id } = this.props;
        return (
            <div className={styles.itemContentWrapper1}>
                <SelectField options={options} name={'exchange' + id}/>
                <div className={styles.descWrapper1}>
                    <span className={styles.toggleDesc}>Do you want Token Owners & Exchanges to be able to</span>
                    <div className={styles.descToggle}>
                        <span>Yes</span>
                        <div className={styles.toggle}>
                            <SmallToggle checked={this.state.mode1} leftChecked={true}/>
                        </div>
                        <span>No</span>
                    </div>
                </div>
                <div className={styles.inputsWrapper}>
                    <div className={styles.textFieldWrapper1}>
                        <TextField label="API" name="api" border={true}/>
                    </div>
                    <div className={styles.textFieldWrapper2}>
                        <TextField label="Secret" name="secret" border={true}/>
                    </div>
                </div>
                <div className={styles.descWrapper2}>
                    <span className={styles.toggleDesc}>Wants to be seen by Token Owners or Exchanges</span>
                    <div className={styles.descToggle}>
                        <span>Yes</span>
                        <div className={styles.toggle}>
                            <SmallToggle checked={this.state.mode2} leftChecked={true}/>
                        </div>
                        <span>No</span>
                    </div>
                </div>
                <div className={styles.exchangeMinusBtn} onClick={() => this.removeExchangeItem(id)}><span>-</span></div>
            </div>
        );
    }
}
  

