import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { pulse, born } from './actions';

class Heartbeat extends React.Component<any, any> {

  constructor(props) {
    super(props);
    this.state = {
      timer: null,
    };
  }

  componentDidMount() {
    this.props.born();
    this.setState({
      timer: window.setInterval(this.props.pulse, 30000),
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.state.timer);
  }

  render() {
    if (!this.props.alive) {
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: location },
          }}
        />
      );
    }
    return (
      <div></div>
    );
  }
}

const mapStateToProps = state => ({
  alive: state.heartbeat.alive,
});

const mapDispatchToProps = {
  pulse,
  born,
};

export default connect(mapStateToProps, mapDispatchToProps)(Heartbeat);
