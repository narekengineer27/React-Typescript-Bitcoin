import * as React from 'react';
import PanelLayout from 'Partials/PanelLayout';
import PublicPageLayout from 'Partials/PublicPageLayout/PublicPageLayout';
import { connect } from 'react-redux';
import { fetchRoles } from './actions';
import { Link } from 'react-router-dom';

const styles = require('./signup.css');

class PreSignup extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { preSignupData, fetchRoles } = this.props;

        if(!preSignupData || !preSignupData.roles || !preSignupData.roles.data) {
            fetchRoles();
        }
    }

  render() {
      const { preSignupData } = this.props;
    return (
      <PublicPageLayout footerHidden>
        <div className={styles.preSignupWrapper}>
            <div className={styles.preSignupTitle}>
                <span>
                    Signing up as
                </span>
            </div>
            <div className={styles.imageButtonWrapper}>
            {
                preSignupData && preSignupData.roles && preSignupData.roles.data && preSignupData.roles.data.map((m, index) => {
                    var str = m.role_name.replace(/\s/g, '').toLowerCase();
                    return (
                        <div className={styles.imageButton}>
                            <Link to={"/signup/" + m.role_id}><img src={"/public/assets/images/" + str + "PreSignup.png"}/></Link>
                        </div>
                    )
                    
                })
            }
            </div>
        </div>
        {/* <PanelLayout title="Signing up as" colSize="col-md-10 col-lg-8">
          
        </PanelLayout> */}
      </PublicPageLayout>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
    preSignupData: state.signup.preSignup ? state.signup.preSignup : {}
});

const mapDispatchToProps = {
    fetchRoles
};

export default connect(mapStateToProps, mapDispatchToProps)(PreSignup);
