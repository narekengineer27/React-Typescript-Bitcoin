import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./hexa.css');
let cx = classNames.bind(styles);

interface ButtonProps {
  className?: string;
  style?: object;
  type?: string;
  color?: string;
  exchangeName?: string;
  isPopup?: boolean;
  isEye?: boolean;
  onClick?(): void;
}

class HexaExchangeButton extends React.Component<ButtonProps, any> {

  public static defaultProps: ButtonProps = {
    className: '',
    style: {},
    type: 'integrated',
    color: 'Black',
    exchangeName: '',
    isPopup: false,
    isEye: false,
    onClick: () => {
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      isopenedPopup: false
    }
  }

  popupMenu() {
    var isopenedPopup = !this.state.isopenedPopup;

    this.setState({
      isopenedPopup: isopenedPopup
    });
  }

  render() {
    const { className, onClick, style, type, color, isPopup } = this.props;
    return (
      type != "addBtn" ? (
        <div className={styles.buttonImage}>
          <div className={styles.buttonImageContent}>
            <img className={styles.imageBtn} src="/public/assets/images/exchanges/exchangeBtn.png"/>
            <div className={styles.topImageMark}>
              <img src={"/public/assets/images/exchanges/" + type + ".png"} onClick={this.popupMenu.bind(this)}/>
              {

                (isPopup && this.state.isopenedPopup) ? (
                  <div>
                    <div className={styles.topPopupPiece}></div>
                    <div className={styles.topPopupWrapper}>
                      <ul>
                        <li>Integrated</li>
                        <li>Applied</li>
                        <li>Not Applied</li>
                        <li>Pending</li>
                        <li>Voting</li>
                      </ul>
                    </div>
                  </div>
                  
                ) : ('')
              }
            </div>
            <span className={styles.exchangeName}>Name</span>
          </div>
          
        </div>
      ) : (
        <div className={styles.buttonImage}>
          <img className={styles.imageBtn} src="/public/assets/images/exchanges/addBtn.png"/>
        </div>
      )
    );
  }
}

export default HexaExchangeButton;
