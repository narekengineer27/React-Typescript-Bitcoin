import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Button from 'Elements/Button';
import Modal from 'Elements/Modal';

const styles = require('./custom-modal.css');

interface ModalProps {
    isOpen?: boolean;
    loading?: boolean;
    width?: number;
    onConfirm?(): void;
    onCancel?(): void;
}

class CustomModal extends React.Component<ModalProps, {}> {

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
    const {children, isOpen, onConfirm, onCancel, handleSubmit, width} = this.props;
    return (
        <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width}>
            <form onSubmit={handleSubmit(onConfirm)}>
                {children}
            </form>
        </Modal>
    );
  }
}


const mapDispatchToProps = {
};

const form = reduxForm({
  form: 'market-maker-setup',
  enableReinitialize:true,
})(CustomModal);

const mapStateToProps = state => {
  return ({});
};

export default connect(mapStateToProps, mapDispatchToProps)(form);
