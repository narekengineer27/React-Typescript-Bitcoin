import * as React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Modal from 'Elements/Modal';
import { Redirect, Route } from 'react-router';
import { Status } from 'Models/Status';
import { isEmail, isProvided } from 'Utils/validators';
import Button from 'Elements/Button';
import TextField from 'Elements/TextField';
import { login, resetStatus } from '../actions';
import { FormErrors, FormProps, returntypeof } from 'Utils/type';
import GlobalMessage from 'Components/GlobalMessage';

const styles = require('./modal.css');

class LoginModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    onSubmit(values: Values) {
        this.props.login(values);
    }

    componentDidMount() {
        this.props.resetStatus();
    }

    render() {
        const {
            isOpen, 
            onCancel, 
            width,
            handleSubmit,
            status = new Status(),
            auth = false,
            location,
            twoFactorEnabled = false,
        } = this.props;
      
        if (auth) {
            window.location.reload();
        }
    
        if (twoFactorEnabled) {
            return (
                <Redirect to={{ pathname: '/two-factor', state: { from: location }, }}/>
            );
        }
        
        return (
            <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width} transparent={5} noPadding={styles.noPadding}>                    
                <div className={styles.content}>
                    <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                    <div className={styles.signin}>Sign In</div>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>                                                            
                        <div>
                            <TextField type="text" label="Email" name="email" autoComplete/>
                        </div>
                        <div>
                            <TextField type="password" label="Password" name="password" autoComplete/>
                        </div>
                        <Button className={styles.submitBtn + " medium blue"} submit={true} loading={status.loading}>Sign In</Button>
                    </form>
                    <div>
                        Not A member ? Sign Up
                        {/* <Link to="/signup">Sign Up</Link> */}
                    </div>
                </div>
                <Route component={GlobalMessage}/>
            </Modal>
        );
    }
}

type Values = { email: string; password: string; };

const validate = values => {
  const errors: FormErrors<Values> = {};

  if (!isProvided(values.email)) {
    errors.email = 'Please provide your e-mail.';
  } else if (!isEmail(values.email)) {
    errors.email = 'Please provide a valid e-mail address.';
  }

  if (!isProvided(values.password)) {
    errors.password = 'Please provide your password.';
  }

  return errors;
};

const mapStateToProps = (state, props: OwnProps) => ({
    user: state.login.user,
    status: state.login.status,
    auth: state.login.auth,
    twoFactorEnabled: state.login.twoFactorEnabled,
});

const mapDispatchToProps = {
    login,
    resetStatus,
};

interface OwnProps {
    location?: string;
}

const stateProps = returntypeof(mapStateToProps);
type Props = typeof stateProps & typeof mapDispatchToProps & FormProps & OwnProps;

const form = reduxForm({
    form: 'login',
    validate,
})(LoginModal);

export default connect(mapStateToProps, mapDispatchToProps)(form);
