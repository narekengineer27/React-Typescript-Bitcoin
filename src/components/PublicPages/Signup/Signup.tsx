import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import PanelLayout from 'Partials/PanelLayout';
import SignupForm from './SignupForm';
import PublicPageLayout from 'Partials/PublicPageLayout/PublicPageLayout';
import { fetchRoles } from 'Components/PublicPages/Signup/actions';
import { connect } from 'react-redux';

const styles = require('./signup.css');

interface SignupProps extends RouteComponentProps<{referral?: string}> {
  preSignupData: {},
  fetchRoles: ()=>{}
}

class Signup extends React.Component<any> {

  componentWillMount() {
    const { preSignupData, fetchRoles } = this.props;

    if(!preSignupData || !preSignupData.roles || !preSignupData.roles.data) {
        fetchRoles();
    }
  }

  render() {
    const footer = (
      <div className={'text-center ' + styles.paddedTopRow + ' ' + styles.paddedBottomRow}>
        You already have an account? <Link to="/login">Sign In</Link>
      </div>
    );

    const { preSignupData } = this.props;
    var title;
    if(preSignupData && preSignupData.roles && preSignupData.roles.data && preSignupData.roles.data.length) {
      if(this.props.match.params.referral) {
        preSignupData.roles.data.map((m, index) => {
          if(m.role_id == this.props.match.params.referral) {
            title = "Sign up as a " + m.role_name;
          }
        });
      } else {
        title = "Sign up as a Trader";
      }
    }

    return (
      <PublicPageLayout footerHidden>
        <div className={styles.imageButtonWrapper}>
            {
                preSignupData && preSignupData.roles && preSignupData.roles.data && preSignupData.roles.data.map((m, index) => {
                    var str = m.role_name.replace(/\s/g, '').toLowerCase();
                    return (
                      this.props.match.params.referral ? (
                        <div className={styles.imageButton + ' ' + ((this.props.match.params.referral == m.role_id) ? '': styles.unactive)}>
                            <Link to={"/signup/" + m.role_id}><img src={"/public/assets/images/" + str + "PreSignup.png"}/></Link>
                        </div>
                      ) : (
                        <div className={styles.imageButton + ' ' + ((4 == m.role_id) ? '': styles.unactive)}>
                            <Link to={"/signup/" + m.role_id}><img src={"/public/assets/images/" + str + "PreSignup.png"}/></Link>
                        </div>
                      )
                    )
                })
            }
        </div>
        <PanelLayout title={title} noBackground>
          <SignupForm referral={this.props.match.params.referral ? this.props.match.params.referral : 4}/>
        </PanelLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
