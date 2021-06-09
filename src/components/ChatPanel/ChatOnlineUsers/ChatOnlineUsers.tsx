import * as React from 'react';
import Modal from 'Elements/Modal';

const styles = require('./ChatOnlineUsers.css');

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
    };
  }

  render() {
    const {isOpen, userData, onCancel, width} = this.props;
// console.log(this.props);
    return (
      <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width}>
        <div className={styles.closeBtn} onClick={onCancel}>&times;</div>
        <div className="row">
          <div className="col-sm-12 text-center">
            <img className={styles.logoimage} src="/public/assets/images/chat/xrAsset%201Normal.png" />
            <span className={'ml-2 ' + styles.title}><strong>XchangeRaters</strong></span>
          </div>
        </div>
        <div className={'row text-center mt-3 ' + styles.titleoutline}>
          <div className={'col-sm-6 p-2 ' + styles.smalltitle}>
            <h5 className="mb-0">ALPHABETICAL</h5>
          </div>
          <div className="col-sm-6 p-2">
            <h5 className="mb-0">ONLINE</h5>
          </div>
        </div>
        <div className={'row ' + styles.userlistcontent}>
          {
            userData.length > 0 ? (
              userData.map((m, index) => {
                return (
                  <div key={index} className="col-sm-6 p-3">
                    <img className={styles.userimage} src={m.state.userphoto} />
                    <span className={'ml-3 ' + styles.username}>{m.uuid}</span>
                    <div className={styles.onlineStatus}/>
                  </div>
                );
              })
            ) : (
              <div className="col-sm-12 p-3">
                <h4 className="text-center"><strong>There is no online users.</strong></h4>
              </div>
            )
          }
        </div>
      </Modal>
    );
  }
}
