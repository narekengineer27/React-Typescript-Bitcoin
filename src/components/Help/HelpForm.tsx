import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm, formValueSelector } from 'redux-form';
import * as _ from 'lodash';
import { loadHelp } from './actions';
import TextField from 'Elements/TextField';

class HelpForm extends React.Component<any, {}> {
  debouncedLoadHelp = _.debounce(search => this.props.loadHelp(search), 300);

  render() {
    return (
      <form>
        <TextField className="medium" label="Search questions" name="search" tabIndex={1}/>
      </form>
    );
  }

  componentDidMount() {
    this.props.loadHelp();
  }

  componentWillUpdate(nextProps: any) {
    if (this.props.search !== nextProps.search) {
      this.debouncedLoadHelp(nextProps.search);
    }
  }
}

const selector = formValueSelector('help');

const mapStateToProps = state => ({
  search: selector(state, 'search'),
});

const mapDispatchToProps = {
  loadHelp,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({form: 'help'})(HelpForm));
