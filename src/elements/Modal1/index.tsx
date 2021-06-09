import * as React from 'react';
import Button from '../Button';
import NoScrollHelper from './NoScrollHelper';

const styles = require('./modal.css');

interface ModalProps {
  isOpen?: boolean;
  loading?: boolean;
  title?: string;
  isCloseable?: boolean;
  isConfirmable?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
  noHeader?: boolean;
  noHeaderBorder?: boolean;
  noFooter?: boolean;
  noFooterBorder?: boolean;
  width?: number;
  noPadding?: string;
  buttonStyle?: object;
  buttonClassName?: string;
  buttonLoading?: boolean;
  buttonDisabled?: boolean;
  leftNodeInFooter?: any;
  transparent?: number;
  onConfirm?(): void;

  onCancel?(): void;
}

class Modal extends React.Component<ModalProps> {

  public static defaultProps: ModalProps = {
    isOpen: false,
    loading: false,
    title: '',
    isCloseable: true,
    isConfirmable: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel',
    noHeader: false,
    noHeaderBorder: false,
    noFooter: false,
    noFooterBorder: false,
    noPadding: '',
    onConfirm: () => {
    },
    onCancel: () => {
    },
    width: 500,
    buttonStyle: {},
    buttonClassName: 'large blue',
    buttonLoading: false,
    buttonDisabled: false,
    leftNodeInFooter: null,
    transparent: 10,
  };

  render() {
    const {
      width, title, children, isOpen, isCloseable, isConfirmable, onConfirm, onCancel, buttonLoading, loading, buttonDisabled, noHeader, noHeaderBorder,
      noFooter, noFooterBorder, confirmButtonText, cancelButtonText, buttonStyle, buttonClassName, leftNodeInFooter, transparent, noPadding
    } = this.props;

    return isOpen ? (
      <div className={styles.wrapper} onClick={onCancel}>
        <div className={styles.container + ' ' + styles['width' + width] + ' ' + styles['transparent' + transparent] + ' ' + noPadding} onClick={ev => ev.stopPropagation()}>
          {!noHeader && <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            {isCloseable && <i className="fa fa-times-thin fa-3x" aria-hidden="true" onClick={onCancel}/>}
          </div>}
          <div>
            {loading ? (
              <div className={styles.loader + ' vertical-center'}>
                <i className={`fa fa-circle-o-notch fa-spin ${styles.icon}`}></i>
              </div>
            ) : children}
          </div>
          {!noFooter &&
          <div className={styles.footer + (noFooterBorder ? ' no-border' : '')}>
            <div className={styles.leftFooter}>
              {leftNodeInFooter || null}
            </div>
            <div>
              {isCloseable && <Button
                disabled={buttonDisabled}
                loading={buttonLoading}
                style={buttonStyle}
                fixedWidth
                className={styles.cancel} 
                onClick={onCancel}>{cancelButtonText}</Button>}
              {isConfirmable && <Button
                disabled={buttonDisabled}
                loading={buttonLoading}
                style={buttonStyle}
                fixedWidth
                className={buttonClassName}
                onClick={onConfirm}>{confirmButtonText}</Button>}
            </div>
          </div>
          }
        </div>
        <NoScrollHelper/>
      </div>
    ) : null;
  }
}

export default Modal;
