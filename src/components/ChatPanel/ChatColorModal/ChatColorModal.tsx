import * as React from 'react';
import Button from 'Elements/Button';
import Modal from 'Elements/Modal';

const styles = require('./ChatColorModal.css');

interface ModalProps {
  isOpen?: boolean;
  loading?: boolean;
  width?: number;
  onConfirm?(): void;
  onCancel?(): void;
}

export default class ChatColorModal extends React.Component<ModalProps, {}> {

  public static defaultProps: ModalProps = {
    isOpen: false,
    loading: false,
    onConfirm: () => {
    },
    onCancel: () => {
    },
    width: 500,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      selectMode: ''
    };
    this.setColor = this.setColor.bind(this);
  }

  setColor(num) {
    switch (Number(num)) {
      case 8:
        localStorage.setItem('color', '#FF504F');
        break;
      case 2:
        localStorage.setItem('color', '#13E091');
        break;
      case 3:
        localStorage.setItem('color', '#F9BB4E');
        break;
      case 4:
        localStorage.setItem('color', '#5C7292');
        break;
      case 5:
        localStorage.setItem('color', '#8F9FB7');
        break;
      case 6:
        localStorage.setItem('color', '#60E1FF');
        break;
      case 7:
        localStorage.setItem('color', '#49C6FF');
        break;
      default:
        localStorage.setItem('color', '#4599FF');
    }

    this.setState({
      selectMode: num
    });
  }

  render() {
    const {isOpen, onConfirm, onCancel, width} = this.props;
    const { selectMode } = this.state;

    return (
      <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={700}>
        <div className={'mb-3 ' + styles.title}>
          <span>Choose your color</span>
        </div>
        <div className={'row ' + styles.content}>
          <div className="col-sm-3 mb-3 text-center">
            <div className={styles.button_outline + ' ' + (selectMode == '1' ? styles.button_outline_color1 : '')}>
              <button className={styles.chat_color_button + ' ' + styles.button1} onClick={() => this.setColor('1')}/>
            </div>
          </div>
          <div className="col-sm-3 mb-3 text-center">
            <div className={styles.button_outline + ' ' + (selectMode == '2' ? styles.button_outline_color2 : '')}>
              <button className={styles.chat_color_button + ' ' + styles.button2} onClick={() => this.setColor('2')}/>
            </div>
          </div>
          <div className="col-sm-3 mb-3 text-center">
            <div className={styles.button_outline + ' ' + (selectMode == '3' ? styles.button_outline_color3 : '')}>
              <button className={styles.chat_color_button + ' ' + styles.button3} onClick={() => this.setColor('3')}/>
            </div>
          </div>
          <div className="col-sm-3 mb-3 text-center">
            <div className={styles.button_outline + ' ' + (selectMode == '4' ? styles.button_outline_color4 : '')} onClick={() => this.setColor('4')}>
              <button className={styles.chat_color_button + ' ' + styles.button4}/>
            </div>
          </div>
          <div className="col-sm-3 mb-3 text-center">
            <div className={styles.button_outline + ' ' + (selectMode == '5' ? styles.button_outline_color5 : '')} onClick={() => this.setColor('5')}>
              <button className={styles.chat_color_button + ' ' + styles.button5}/>
            </div>
          </div>
          <div className="col-sm-3 mb-3 text-center">
            <div className={styles.button_outline + ' ' + (selectMode == '6' ? styles.button_outline_color6 : '')} onClick={() => this.setColor('6')}>
              <button className={styles.chat_color_button + ' ' + styles.button6}/>
            </div>
          </div>
          <div className="col-sm-3 mb-3 text-center">
            <div className={styles.button_outline + ' ' + (selectMode == '7' ? styles.button_outline_color7 : '')} onClick={() => this.setColor('7')}>
              <button className={styles.chat_color_button + ' ' + styles.button7}/>
            </div>
          </div>
          <div className="col-sm-3 mb-3 text-center">
            <div className={styles.button_outline + ' ' + (selectMode == '8' ? styles.button_outline_color8 : '')} onClick={() => this.setColor('8')}>
              <button className={styles.chat_color_button + ' ' + styles.button8}/>
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button className={styles.agreeBtn + ' small blue'} onClick={onConfirm}>I Agree</Button>
        </div>
      </Modal>
    );
  }
}
