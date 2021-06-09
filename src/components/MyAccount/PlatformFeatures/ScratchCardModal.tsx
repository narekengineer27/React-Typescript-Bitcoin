import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'Elements/Modal';

import { closeScratchCardModal, submitScratchCardModal } from './actions';
import { returntypeof } from 'Utils/type';
import { IState } from './types';
import ScratchCardForm, { Values } from './ScratchCardForm';

const styles = require('./platform-features.css');

class ScratchCardModal extends React.Component<Props, {}> {
  render() {
    const {
      visible,
      closeScratchCardModal,
    } = this.props;

    return (
      <Modal
        title="Scratch card activation"
        isOpen={visible}
        onCancel={closeScratchCardModal}
        noFooter
      >
        <div className={styles.scratchCardModalContent}>
          Input code from the scratch card to activate this package:
          <ScratchCardForm onCancel={closeScratchCardModal} onSubmit={values => this.onModalConfirm(values)}/>
        </div>
      </Modal>
    );
  }

  onModalConfirm(values: Values) {
    this.props.submitScratchCardModal(values.code);
  }
}

const mapStateToProps = rootState => {
  const scratchCardModal = (rootState.platformFeatures as IState).scratchCardModal;
  return { ...scratchCardModal };
};

const mapDispatchToProps = {
  closeScratchCardModal,
  submitScratchCardModal,
};

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(ScratchCardModal);
