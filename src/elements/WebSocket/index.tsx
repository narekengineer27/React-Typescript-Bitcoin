import * as React from "react";
import { connect } from "react-redux";
import { onError } from './actions';

const env = require('Root/env.json');

class Websocket extends React.Component<any, any> {
  timer: any;
  attempts: number;

  constructor(props) {
    super(props);
    this.state = {
      ws: null,
    };
  }

  logging(logline: string) {
    if (this.props.debug === true) {
      console.log(logline);
    }
  }

  componentDidMount() {
    this.connect();
    this.startTimer();
  }

  componentDidUpdate(prevProps: any) {
    if (prevProps.url && this.props.url && prevProps.url !== this.props.url) {
      this.state.ws && this.state.ws.close();
      this.connect();
      this.startTimer();
    }
  }

  startTimer() {
    if (this.timer) {
      this.stopTimer();
    }

    this.attempts = 0;
    this.timer = setInterval(() => {
      const { ws } = this.state;
      // If the WebSocket has been connected.
      if (ws && ws.readyState === 1) {
      } else {
        const { onError, url } = this.props;
        if (this.attempts <= env.wsRetryTimes) {
          this.connect(this.attempts);
        } else {
          onError(url);
        }
      }
    }, env.wsRetryInterval);
  }

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      this.attempts = 0;
    }
  }

  connect(attempts: number = 1) {
    const { ws } = this.state;
    if (ws && ws.readyState === 1) {
      return;
    }
    this.attempts = attempts;
    try {
      const ws = new WebSocket(this.props.url, this.props.protocol);
      this.setState({ ws });
      this.setupWebsocket(ws);
    } catch (e) {
    }
  }

  setupWebsocket(ws = this.state.ws) {
    ws.onopen = () => {
      this.logging('Websocket connected');
    };

    ws.onmessage = (evt) => {
      this.props.onMessage(evt.data);
    };

    ws.onclose = () => {
      this.logging('connection closed');
    };

    ws.onerror = () => {
      this.logging('connection error');
    };
  }

  componentWillUnmount() {
    this.stopTimer();
    let ws = this.state.ws;
    ws && ws.readyStatus === 1 && ws.close();
  }

  render() {
    return (
      <div></div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

const mapDispatchToProps = {
  onError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Websocket);
