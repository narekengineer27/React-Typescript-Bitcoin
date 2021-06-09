import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { hideMessage, hideAllMessages } from './actions';
import { MessageType } from 'Components/GlobalMessage/types';

const styles = require('Components/GlobalMessage/global-message.css');

interface GlobalMessageProps extends RouteComponentProps<{}> {
  messages: { id: any; message: string; type: MessageType }[];
  hideMessage: (id: any) => void;
  hideAllMessages: () => void;
}

class GlobalMessage extends React.Component<GlobalMessageProps> {
  removeListener: () => void;

  componentWillMount() {
    this.removeListener = this.props.history.listen(() => {
      this.props.hideAllMessages();
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { messages } = this.props;

    if (messages.length === 0) {
      return null;
    }

    return (
      <div className={styles.list}>
        {messages.map((it, index) =>
          <div className={styles.base + ' ' + styles[it.type]} key={index}>
            <div className={styles.close}>
              <i className="fa fa-times-thin fa-2x" aria-hidden="true" onClick={() => this.onCloseClick(it.id)}/>
            </div>
            {it.message}
          </div>)}
      </div>

    );
  }

  onCloseClick(id: any) {
    this.props.hideMessage(id);
  }
}

const mapStateToProps = state => ({
  messages: state.globalMessage.messages,
});

const mapDispatchToProps = {
  hideMessage,
  hideAllMessages,
};

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMessage);
