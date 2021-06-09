import * as React from 'react';
import { Tab, Tabs,  TabList, TabPanel } from 'react-tabs';
import { history } from 'Components/Routes';
import { connect } from 'react-redux';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';
import { Link } from 'react-router-dom';

const styles = require('./registerModal.css');

class RegisterModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        
    }

    render() {
        const { isOpen, onCancel, width } = this.props;
        return (
                <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width} transparent={5} noPadding={styles.noPadding}>
                    <div className={styles.content}>
                        <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                        <img src="/public/assets/images/register.png"/>
                        <div className={styles.text}>
                            <span>Thank you for registering</span>
                            <span>with XchangeRate</span>
                        </div>
                    </div>
                </Modal>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
