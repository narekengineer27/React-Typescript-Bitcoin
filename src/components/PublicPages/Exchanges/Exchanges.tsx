import * as React from 'react';
import PublicPageLayout from 'Partials/PublicPageLayout';
import Card from 'Components/PublicPages/Pricing/Card';
import { IState } from 'Components/PublicPages/Pricing/types';
import { loadPackages } from 'Components/PublicPages/Pricing/actions';
import { returntypeof } from 'Utils/type';
import { connect } from 'react-redux';
import Button from 'Elements/Button';
import HexaExchangeButton from 'Elements/HexaExchangeButton';
import MainFooter from 'Partials/MainFooter';
import Responsive from 'Partials/Responsive';
import Select from 'react-select';

const styles = require('./exchanges.css');

class Exchanges extends React.Component<Props, any> {

  constructor(props) {
    super();

    this.state = {
      selectMode: 'all'
    };

    this.changeSelectMode = this.changeSelectMode.bind(this);
  }

  componentWillMount() {
  }

  makeExchangesItem(data) {
    if(data.length > 0) {
      var returnData = [];
      var subItems = [];
      for(var i=0; i<data.length; i++) {
        if( i % 5 != 4) {
          subItems.push(data[i]);
        } else {
          subItems.push(data[i]);
          returnData.push(subItems);
          subItems = [];
        }
      }

      if(subItems.length > 0) {
        returnData.push(subItems);
      }
    }

    return returnData;
  }

  changeSelectMode(mode) {
    this.setState({
      selectMode: mode
    });
  }

  handleChange = (selectMode) => {
    this.setState({ selectMode: selectMode.value });
    console.log(`Option selected:`, selectMode);
  }

  render() {

    var exchangeItems = [
      {
        type: 'integrated',
      },
      {
        type: 'pending',
      },
      {
        type: 'notapplied',
      },
      {
        type: 'applied',
      },
      {
        type: 'voting',
      },
      {
        type: 'integrated',
      },
      {
        type: 'pending',
      },
      {
        type: 'notapplied',
      },
      {
        type: 'applied',
      },
      {
        type: 'voting',
      },
      {
        type: 'integrated',
      },
      {
        type: 'pending',
      },
      {
        type: 'notapplied',
      },
      {
        type: 'applied',
      },
      {
        type: 'voting',
      },
      {
        type: 'integrated',
      },
      {
        type: 'pending',
      },
      {
        type: 'notapplied',
      },
      {
        type: 'applied',
      },
      {
        type: 'voting',
      },
    ];

    var filteredData = [];

    if(this.state.selectMode == 'all') {
      filteredData = exchangeItems;
    } else {
      for(var i=0; i<exchangeItems.length; i++){
        if(exchangeItems[i].type == this.state.selectMode){
          filteredData.push(exchangeItems[i]);
        }
      }
    }

    var hexaExchangeItems = this.makeExchangesItem(filteredData);
    var options = [
      {value: 'all', label: 'All'},
      {value: 'integrated', label: 'Integrated'},
      {value: 'pending', label: 'Pending'},
      {value: 'applied', label: 'Applied'},
      {value: 'notapplied', label: 'Not Applied'},
      {value: 'voting', label: 'Voting'}
    ];

    const { selectMode } = this.state;
    return (
      <PublicPageLayout footerHidden>
        <img className={styles.RightImage} src="/public/assets/images/exchanges/rightHexa.png" />
        <img className={styles.LeftImage} src="/public/assets/images/exchanges/leftLines.png" />
        <div className={styles.content}>

          <div className={styles.topContent}>
            <span className={styles.title}>Supported Exchanges</span>
            <Button className={styles.loginBtn + ' medium blue'}>Login</Button>
            <Responsive name="desktop">
              <div className={styles.buttonsWrapper}>
                <Button className={(selectMode == 'all' ? styles.buttonSelected : styles.buttonSelect) + " medium orange"} onClick={() => this.changeSelectMode("all")}>All</Button>
                <Button className={(selectMode == 'integrated' ? styles.buttonSelected : styles.buttonSelect) + " medium orange"} onClick={() => this.changeSelectMode("integrated")}>INTEGRATED</Button>
                <Button className={(selectMode == 'pending' ? styles.buttonSelected : styles.buttonSelect) + " medium orange"} onClick={() => this.changeSelectMode("pending")}>Pending</Button>
                <Button className={(selectMode == 'applied' ? styles.buttonSelected : styles.buttonSelect) + " medium orange"} onClick={() => this.changeSelectMode("applied")}>Applied</Button>
                <Button className={(selectMode == 'notapplied' ? styles.buttonSelected : styles.buttonSelect) + " medium orange"} onClick={() => this.changeSelectMode("notapplied")}>Not Applied</Button>
                <Button className={(selectMode == 'voting' ? styles.buttonSelected : styles.buttonSelect) + " medium orange"} onClick={() => this.changeSelectMode("voting")}>Voting</Button>
              </div>
            </Responsive>
            <Responsive name="phone">
              <div className={styles.buttonsWrapper}>
                <Select className={styles.selectMode} options={options} name="timeSelect" value={selectMode} onChange={this.handleChange}/>
              </div>
            </Responsive>
          </div>

          {
            hexaExchangeItems.map((m, index) => {
              return (
                index % 2 == 0 ? (
                <div className={styles.oddRow}>
                  {
                    m.map((subItem, subIndex) => {
                      return (
                        <HexaExchangeButton type={subItem.type}/>
                      )
                    })
                  }
                </div>
                ) : (
                <div className={styles.evenRow}>
                  {
                    m.map((subItem, subIndex) => {
                      return (
                        <HexaExchangeButton type={subItem.type}/>
                      )
                    })
                  }
                </div>
                )
              )
            })
          }
          <Button className={styles.addNewExchangeBtn + ' medium orange'}>ADD YOUR EXCHANGE</Button>
        </div>
        <MainFooter/>
      </PublicPageLayout>
    )
  }
}

const mapStateToProps = rootState => {
  
};

const mapDispatchToProps = {
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Exchanges);
