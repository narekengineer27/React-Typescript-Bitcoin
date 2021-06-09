import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'Elements/Modal';
import { returntypeof } from 'Utils/type';
import TestModeScheduleForm, { Values } from './TestModeScheduleForm';

const styles = require('../PaidFeatures/paid-features.css');

class TestModeScheduleModal extends React.Component<Props, {}> {
  render() {
    let visible: any;
    let close: any;

    return (
      <Modal
        title="Test Mode"
        isOpen={visible}
        onCancel={close}
        noFooter
      >
        <div className={styles.testModeScheduleModalContent}>
          <TestModeScheduleForm
            onCancel={close}
            onSubmit={values => this.onModalConfirm(values)}
          />
        </div>
      </Modal>
    );
  }

  onModalConfirm(values: Values) {
  }
}

const mapStateToProps = rootState => {
};

const mapDispatchToProps = {};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(TestModeScheduleModal);
