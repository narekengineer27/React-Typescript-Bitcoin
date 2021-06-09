import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'Elements/Modal';
import Button from 'Elements/Button';
// import SelectField from 'Elements/SelectField';
import { reduxForm } from 'redux-form';
import { roleList, roleChange } from './actions';
import SelectField from 'Elements/SelectField';

const styles = require('./rolechange.css');

class RoleChangeModal extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        this.props.roleList();
    }

    onSubmit(values: object) {
        var role_id = values['role'];
        var flag = 0;      
        if(role_id != undefined){
            flag = role_id;
        }
        var formdata = new FormData();
        formdata.append('role_id', role_id);
        this.props.roleChange(flag, formdata);
    }

    render() {
        const { handleSubmit, isOpen, onCancel, width, data } = this.props;
        var roleOptions = [];
        if(data) {
            data.map((m, index) => {
                roleOptions.push({
                    value: m.role_id,
                    label: m.role_name
                });
            });
        }

        return (
            <Modal isOpen={isOpen} noFooter={true} noHeader={true} onCancel={onCancel} width={width} transparent={5} noPadding={styles.noPadding}>
                <div className={styles.content}>
                    <img className={styles.closeBtn} src="/public/assets/images/dashboard/close.png" onClick={onCancel}/>
                    <img src="/public/assets/images/landing1/xrAsset.png"/>
                    <div className={styles.title}>Change Role</div>
                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                        <div className={styles.text}>
                            <span>Role</span>
                            <div className={styles.select}>
                                <SelectField
                                    options={roleOptions}
                                    name="role"
                                />
                            </div>
                        </div>
                        <Button className={styles.btn + " medium green"} submit>CHANGE</Button>
                        <Button className={styles.btn + " medium red"} onClick={onCancel}>CANCEL</Button>
                    </form>
                </div>
            </Modal>
        );
    }
}

const form = reduxForm({
    form: 'role-change',
    enableReinitialize:true,
    keepDirtyOnReinitialize: true
})(RoleChangeModal);

const mapStateToProps = (state, ownProps) => ({
    data: state.roleList.rolelist
});

const mapDispatchToProps = {
    roleList,
    roleChange
};

export default connect(mapStateToProps, mapDispatchToProps)(form);
